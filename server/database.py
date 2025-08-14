"""
Database configuration and models for FurToon
"""
import os
import uuid
from datetime import datetime
from sqlalchemy import create_engine, Column, String, Integer, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Database configuration - use persistent volume on Railway
# Create data directory if using persistent volume
if os.path.exists("/app/data"):
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./data/furtoon.db")
    os.makedirs("./data", exist_ok=True)
else:
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./furtoon.db")

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Database Models

class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    credits_remaining = Column(Integer, default=0)
    total_credits_purchased = Column(Integer, default=0)
    stripe_customer_id = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    purchases = relationship("Purchase", back_populates="user")
    generations = relationship("Generation", back_populates="user")

class Purchase(Base):
    __tablename__ = "purchases"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    stripe_session_id = Column(String, nullable=True)
    stripe_payment_intent_id = Column(String, nullable=True)
    amount = Column(Float, nullable=False)  # Amount in dollars (e.g., 9.99)
    tier = Column(String, nullable=False)  # "starter", "pro", "ultimate"
    credits_purchased = Column(Integer, nullable=False)
    purchase_date = Column(DateTime, default=datetime.utcnow)
    status = Column(String, default="completed")  # "pending", "completed", "failed"
    
    # Relationships
    user = relationship("User", back_populates="purchases")

class Generation(Base):
    __tablename__ = "generations"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    style = Column(String, nullable=False)
    original_filename = Column(String, nullable=True)
    result_url = Column(String, nullable=True)  # Could be base64 or file path
    result_base64 = Column(String, nullable=True)  # Store base64 directly
    created_at = Column(DateTime, default=datetime.utcnow)
    credits_used = Column(Integer, default=1)
    
    # Relationships
    user = relationship("User", back_populates="generations")

# Basic styles for starter pack (10 styles)
BASIC_STYLES = [
    "Pixar Animation",
    "Disney Animation", 
    "Watercolor Painting",
    "Oil Painting",
    "Pencil Sketch",
    "Comic Book Art",
    "Studio Ghibli Animation",
    "Anime Portrait",
    "Fantasy Art",
    "Vector Art / Flat Illustration"
]

# All available styles (25 styles)
ALL_STYLES = [
    # ✅ BASIC STYLES (Available for Starter Pack) - 10 styles
    "Pixar Animation",
    "Disney Animation",
    "Watercolor Painting",
    "Oil Painting",
    "Pencil Sketch",
    "Comic Book Art",
    "Studio Ghibli Animation",
    "Anime Portrait",
    "Fantasy Art",
    "Vector Art / Flat Illustration",
    
    # 🔒 PREMIUM STYLES (Pro/Ultimate Only) - 15 styles
    "DreamWorks Animation Style",
    "Looney Tunes / Classic Cartoon",
    "Scooby-Doo Mystery Ink Style",
    "Rick & Morty / Adult Swim Style",
    "Simpsons Style",
    "1930s Vintage Animation (Steamboat Willie)",
    "Charcoal Drawing",
    "Pastel Chalk Portrait",
    "Ink & Wash",
    "Gouache Painting",
    "Impressionist Painting (Monet-style)",
    "Pixel Art (8-bit / 16-bit)",
    "3D Sculpt / Claymation Look",
    "Cyberpunk City",
    "Renaissance Portrait"
]

# Pricing tiers
PRICING_TIERS = {
    "starter": {
        "price": 9.99,
        "credits": 10,
        "styles": BASIC_STYLES,
        "name": "Starter Pack"
    },
    "pro": {
        "price": 14.99,
        "credits": 20,
        "styles": ALL_STYLES,
        "name": "Pro Pack"
    },
    "ultimate": {
        "price": 19.99,
        "credits": 50,
        "styles": ALL_STYLES,
        "name": "Ultimate Pack",
        "features": ["style_mixing", "high_res", "priority_processing"]
    }
}

# Database helper functions
def get_db():
    """Get database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_tables():
    """Create all database tables"""
    Base.metadata.create_all(bind=engine)

def get_user_available_styles(user_tier: str) -> list:
    """Get available styles for a user based on their tier"""
    if user_tier in ["pro", "ultimate"]:
        return ALL_STYLES
    else:
        return BASIC_STYLES

def check_style_access(style: str, user_tier: str) -> bool:
    """Check if user has access to a specific style"""
    available_styles = get_user_available_styles(user_tier)
    return style in available_styles
