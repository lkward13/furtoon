"""
FurToon API Server with Authentication and Credit System
"""
import os
import base64
import io
import stripe
from datetime import datetime
from typing import List
from dotenv import load_dotenv
from fastapi import FastAPI, File, UploadFile, Form, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from openai import AsyncOpenAI
from PIL import Image

# Import our custom modules
from database import get_db, create_tables, User, Purchase, Generation, PRICING_TIERS, get_user_available_styles, check_style_access
from auth import hash_password, verify_password, create_jwt_token, get_current_user, check_user_credits, deduct_user_credits, get_user_tier
from models import (
    UserRegister, UserLogin, TokenResponse, UserResponse, 
    PurchaseRequest, StripeCheckoutRequest, StripeCheckoutResponse,
    GenerationResponse, UserDashboard, GenerationHistory,
    ErrorResponse, SuccessResponse
)

# Load environment variables
load_dotenv()

# Configuration
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
STRIPE_SECRET_KEY = os.getenv("STRIPE_SECRET_KEY")
STRIPE_PUBLISHABLE_KEY = os.getenv("STRIPE_PUBLISHABLE_KEY")
CLIENT_URL = os.getenv("CLIENT_URL", "http://localhost:5173")

# Validate required environment variables
if not OPENAI_API_KEY:
    print("FATAL ERROR: OPENAI_API_KEY not found in .env file.")
    exit(1)

if not STRIPE_SECRET_KEY:
    print("WARNING: STRIPE_SECRET_KEY not found. Payment features will be disabled.")

# Initialize services
app = FastAPI(title="FurToon API", version="2.0.0")
openai_client = AsyncOpenAI(api_key=OPENAI_API_KEY)

if STRIPE_SECRET_KEY:
    stripe.api_key = STRIPE_SECRET_KEY

# CORS Middleware - Specific allowed origins
allowed_origins = [
    "https://furtoon.vercel.app",
    "https://furtoon-m1ir8ggqb-luke-wards-projects.vercel.app",
    "https://furtoon-3mmf6fl9x-luke-wards-projects.vercel.app",
    "https://www.furtoonai.com",
    "http://localhost:5173",  # For local development
]

# Add CLIENT_URL if it exists and is not already in the list
if CLIENT_URL and CLIENT_URL not in allowed_origins:
    allowed_origins.append(CLIENT_URL)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Style Prompt Mapping (same as before)
STYLE_PROMPTS = {
    # Animation Styles
    "Pixar Animation": "Create in Pixar 3D animated style with large expressive eyes, smooth rounded features, vibrant colors, and signature Pixar lighting and charm",
    "Disney Animation": "Create in classic Disney animated style with warm colors, magical feel, expressive character design, and that timeless Disney charm",
    "Studio Ghibli Animation": "Create in Studio Ghibli style with soft, hand-drawn animation aesthetic, natural colors, whimsical details, and that dreamy Miyazaki feel",
    "DreamWorks Animation Style": "Create in DreamWorks animation style with bold character design, dynamic expressions, vibrant colors, and playful energy",
    "Looney Tunes / Classic Cartoon": "Create in classic Looney Tunes cartoon style with exaggerated features, bold outlines, bright colors, and that zany cartoon energy",
    "Scooby-Doo Mystery Ink Style": "Create in Scooby-Doo animation style with that classic Hanna-Barbera look, simple shapes, and retro cartoon aesthetic",
    "Rick & Morty / Adult Swim Style": "Create in Rick and Morty animation style with distinctive character design, bold lines, and that unique Adult Swim aesthetic",
    "Simpsons Style": "Create in The Simpsons animation style with yellow color palette, simple rounded shapes, and that iconic cartoon look",
    "1930s Vintage Animation (Steamboat Willie)": "Create in 1930s vintage animation style like Steamboat Willie with black and white, rubber hose animation, and classic cartoon charm",
    "Comic Book Art": "Create in comic book art style with bold lines, vibrant colors, dramatic shading, and that classic superhero comic aesthetic",
    "Anime Portrait": "Create in anime art style with large expressive eyes, detailed features, vibrant colors, and that distinctive Japanese animation look",
    
    # Traditional & Fine Art
    "Watercolor Painting": "Create as a watercolor painting with soft flowing colors, gentle color bleeding, translucent layers, and that delicate artistic watercolor texture",
    "Oil Painting": "Create as an oil painting with rich textured brushstrokes, deep vibrant colors, classical painting technique, and that timeless fine art aesthetic",
    "Pencil Sketch": "Create as a detailed pencil sketch with realistic graphite shading, fine line work, artistic sketching technique, and classic drawing style",
    "Charcoal Drawing": "Create as a charcoal drawing with dramatic black and white contrasts, bold strokes, artistic shading, and that classic charcoal art texture",
    "Pastel Chalk Portrait": "Create as a pastel chalk portrait with soft chalky textures, gentle color blending, artistic pastel technique, and that delicate pastel art feel",
    "Ink & Wash": "Create in ink and wash painting style with flowing black ink lines, watercolor washes, traditional Asian art technique, and elegant simplicity",
    "Gouache Painting": "Create as a gouache painting with opaque watercolor technique, vibrant matte colors, smooth coverage, and that distinctive gouache art style",
    "Impressionist Painting (Monet-style)": "Create in impressionist painting style with loose visible brushstrokes, soft natural lighting, vibrant color harmony, and that classic impressionist art technique",
    
    # Modern Digital Styles  
    "Vector Art / Flat Illustration": "Create in vector art style with clean geometric shapes, flat colors, simple design, and that modern digital illustration aesthetic",
    "Pixel Art (8-bit / 16-bit)": "Create in pixel art style with blocky 8-bit or 16-bit video game aesthetics, limited color palette, and retro gaming charm",
    "3D Sculpt / Claymation Look": "Create in 3D sculpted style with clay-like textures, dimensional form, tactile appearance, and that handcrafted claymation feel",
    
    # Fantasy & Sci-Fi
    "Cyberpunk City": "Create in cyberpunk style with neon lights, futuristic elements, urban sci-fi setting, electric colors, and high-tech atmosphere",
    "Fantasy Art": "Create in fantasy art style with magical elements, mystical atmosphere, rich fantasy colors, and that epic fantasy artwork aesthetic",
    "Renaissance Portrait": "Create as a classical Renaissance portrait with rich oil painting textures, masterful chiaroscuro lighting, detailed realism, and that timeless Renaissance artistry"
}

# Initialize database on startup
@app.on_event("startup")
async def startup_event():
    create_tables()
    print("Database tables created successfully")

# Basic endpoints
@app.get("/api/test")
async def test_endpoint():
    return {"message": "FurToon API v2.0 is running with authentication!"}

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow(),
        "features": {
            "authentication": True,
            "payments": STRIPE_SECRET_KEY is not None,
            "image_generation": True
        }
    }

# Authentication Endpoints
@app.post("/api/auth/register", response_model=TokenResponse)
async def register_user(user_data: UserRegister, db: Session = Depends(get_db)):
    """Register a new user"""
    # Check if email already exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    hashed_password = hash_password(user_data.password)
    new_user = User(
        email=user_data.email,
        password_hash=hashed_password
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Create JWT token
    access_token = create_jwt_token(new_user.id, new_user.email)
    
    return TokenResponse(
        access_token=access_token,
        user=UserResponse.from_orm(new_user)
    )

@app.post("/api/auth/login", response_model=TokenResponse)
async def login_user(user_data: UserLogin, db: Session = Depends(get_db)):
    """Login an existing user"""
    user = db.query(User).filter(User.email == user_data.email).first()
    
    if not user or not verify_password(user_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    # Create JWT token
    access_token = create_jwt_token(user.id, user.email)
    
    return TokenResponse(
        access_token=access_token,
        user=UserResponse.from_orm(user)
    )

@app.get("/api/auth/me", response_model=UserResponse)
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    """Get current user information"""
    return UserResponse.from_orm(current_user)

# Payment Endpoints
@app.post("/api/payments/create-checkout", response_model=StripeCheckoutResponse)
async def create_stripe_checkout(
    request: StripeCheckoutRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a Stripe checkout session"""
    if not STRIPE_SECRET_KEY:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Payment system not configured"
        )
    
    if request.tier not in PRICING_TIERS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid pricing tier"
        )
    
    tier_info = PRICING_TIERS[request.tier]
    
    try:
        # Create Stripe checkout session
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': tier_info['name'],
                        'description': f"{tier_info['credits']} credits for FurToon AI art generation"
                    },
                    'unit_amount': int(tier_info['price'] * 100),  # Convert to cents
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url=request.success_url,
            cancel_url=request.cancel_url,
            client_reference_id=current_user.id,
            metadata={
                'user_id': current_user.id,
                'tier': request.tier,
                'credits': tier_info['credits']
            }
        )
        
        # Create pending purchase record
        purchase = Purchase(
            user_id=current_user.id,
            stripe_session_id=checkout_session.id,
            amount=tier_info['price'],
            tier=request.tier,
            credits_purchased=tier_info['credits'],
            status="pending"
        )
        
        db.add(purchase)
        db.commit()
        
        return StripeCheckoutResponse(
            checkout_url=checkout_session.url,
            session_id=checkout_session.id
        )
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create checkout session: {str(e)}"
        )

@app.post("/api/payments/webhook")
async def stripe_webhook(request: dict, db: Session = Depends(get_db)):
    """Handle Stripe webhook events"""
    # This would need proper webhook signature verification in production
    # For now, we'll handle the basic payment success event
    
    if request.get('type') == 'checkout.session.completed':
        session = request['data']['object']
        user_id = session['metadata']['user_id']
        tier = session['metadata']['tier']
        credits = int(session['metadata']['credits'])
        
        # Find the user and purchase
        user = db.query(User).filter(User.id == user_id).first()
        purchase = db.query(Purchase).filter(
            Purchase.stripe_session_id == session['id']
        ).first()
        
        if user and purchase:
            # Update purchase status
            purchase.status = "completed"
            purchase.stripe_payment_intent_id = session.get('payment_intent')
            
            # Add credits to user
            user.credits_remaining += credits
            user.total_credits_purchased += credits
            
            db.commit()
    
    return {"status": "success"}

# Image Generation Endpoints
@app.post("/api/images/generate", response_model=GenerationResponse)
async def generate_styled_image(
    style: str = Form(...),
    imageFile: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Generate a styled image (requires authentication and credits)"""
    print(f"Authenticated request from user {current_user.email}: style='{style}', filename='{imageFile.filename}'")
    
    # Check if user has credits
    if not check_user_credits(current_user, 1):
        raise HTTPException(
            status_code=status.HTTP_402_PAYMENT_REQUIRED,
            detail="Insufficient credits. Please purchase more credits to continue."
        )
    
    # Check if user has access to this style (skip check for custom prompts)
    user_tier = get_user_tier(current_user)
    
    # If it's a predefined style, check access
    from database import BASIC_STYLES, ALL_STYLES
    if style in [s for styles_list in [BASIC_STYLES, ALL_STYLES] for s in styles_list]:
        if not check_style_access(style, user_tier):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Style '{style}' is not available for your tier. Please upgrade to access all styles."
            )
    # If it's a custom prompt, check if user has custom scene access
    else:
        if user_tier == "starter":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Custom scenes are only available for Pro and Ultimate users. Please upgrade to access this feature."
            )
    
    # Validate file type
    if not imageFile.content_type in ["image/png", "image/jpeg"]:
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload PNG or JPG.")
    
    try:
        # Process image (same as before)
        image_bytes = await imageFile.read()
        img = Image.open(io.BytesIO(image_bytes))
        img.thumbnail((1024, 1024))
        
        output_buffer = io.BytesIO()
        img.save(output_buffer, format="PNG")
        output_buffer.seek(0)
        
        # Use detailed style prompt
        if style in STYLE_PROMPTS:
            edit_prompt = f"{STYLE_PROMPTS[style]} based on the reference image. Maintain the subject and composition while applying this artistic style."
        else:
            edit_prompt = f"A {style}-style portrait based on the reference image. Maintain the subject and composition."
        
        # Call OpenAI API
        print(f"Calling OpenAI images.edit with style: {style}")
        image_data_tuple = ("image.png", output_buffer.getvalue(), "image/png")
        
        response = await openai_client.images.edit(
            model="gpt-image-1",
            image=image_data_tuple,
            prompt=edit_prompt,
            n=1,
        )
        
        image_base64 = response.data[0].b64_json
        
        if not image_base64:
            raise HTTPException(status_code=500, detail="Failed to generate image: OpenAI did not return image data.")
        
        # Deduct credits
        if not deduct_user_credits(db, current_user, 1):
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to deduct credits"
            )
        
        # Save generation record
        generation = Generation(
            user_id=current_user.id,
            style=style,
            original_filename=imageFile.filename,
            result_base64=image_base64,
            credits_used=1
        )
        
        db.add(generation)
        db.commit()
        db.refresh(generation)
        
        print(f"Image generated successfully. User {current_user.email} has {current_user.credits_remaining} credits remaining.")
        
        return GenerationResponse(
            id=generation.id,
            style=generation.style,
            result_base64=image_base64,
            created_at=generation.created_at,
            credits_used=generation.credits_used
        )
    
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error during image generation: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to generate image: {str(e)}")

# User Dashboard Endpoints
@app.get("/api/user/dashboard", response_model=UserDashboard)
async def get_user_dashboard(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user dashboard data"""
    # Get recent generations
    recent_generations = db.query(Generation).filter(
        Generation.user_id == current_user.id
    ).order_by(Generation.created_at.desc()).limit(10).all()
    
    # Get total generations count
    total_generations = db.query(Generation).filter(
        Generation.user_id == current_user.id
    ).count()
    
    # Get user tier and available styles
    user_tier = get_user_tier(current_user)
    available_styles = get_user_available_styles(user_tier)
    
    return UserDashboard(
        user=UserResponse.from_orm(current_user),
        recent_generations=[GenerationHistory.from_orm(g) for g in recent_generations],
        total_generations=total_generations,
        available_styles=available_styles,
        user_tier=user_tier
    )

@app.get("/api/user/generations", response_model=List[GenerationHistory])
async def get_user_generations(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    limit: int = 50,
    offset: int = 0
):
    """Get user's generation history"""
    generations = db.query(Generation).filter(
        Generation.user_id == current_user.id
    ).order_by(Generation.created_at.desc()).offset(offset).limit(limit).all()
    
    # Manual serialization to ensure result_base64 is included
    result = []
    for g in generations:
        result.append(GenerationHistory(
            id=g.id,
            style=g.style,
            original_filename=g.original_filename,
            result_base64=g.result_base64,
            created_at=g.created_at,
            credits_used=g.credits_used
        ))
    
    return result

# Utility Endpoints
@app.get("/api/styles/available")
async def get_available_styles(current_user: User = Depends(get_current_user)):
    """Get styles available to the current user"""
    user_tier = get_user_tier(current_user)
    available_styles = get_user_available_styles(user_tier)
    
    return {
        "user_tier": user_tier,
        "available_styles": available_styles,
        "total_styles": len(available_styles)
    }

@app.get("/api/pricing/tiers")
async def get_pricing_tiers():
    """Get all pricing tier information"""
    return PRICING_TIERS

# Admin endpoints
@app.post("/api/admin/update-credits")
async def admin_update_credits(
    user_email: str = Form(...),
    new_credits: int = Form(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Admin endpoint to update any user's credits
    Only accessible by admin accounts (lkward13@gmail.com)
    """
    # Check if current user is admin
    if current_user.email != "lkward13@gmail.com":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied. Admin privileges required."
        )
    
    # Find the target user
    target_user = db.query(User).filter(User.email == user_email).first()
    if not target_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with email {user_email} not found"
        )
    
    # Update credits
    old_credits = target_user.credits_remaining
    target_user.credits_remaining = new_credits
    
    # If giving unlimited credits (999999), also set high total_credits_purchased
    if new_credits >= 999999:
        target_user.total_credits_purchased = 999999
    
    db.commit()
    
    return {
        "success": True,
        "message": f"Updated {user_email} credits from {old_credits} to {new_credits}",
        "user_email": user_email,
        "old_credits": old_credits,
        "new_credits": new_credits
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5001)
