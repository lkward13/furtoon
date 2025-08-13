"""
Authentication utilities for FurToon
"""
import os
import jwt
from datetime import datetime, timedelta
from passlib.context import CryptContext
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from database import get_db, User
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configuration
JWT_SECRET = os.getenv("JWT_SECRET")
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24 * 7  # 7 days

if not JWT_SECRET:
    raise ValueError("JWT_SECRET environment variable is required")

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT Bearer token authentication
security = HTTPBearer()

def hash_password(password: str) -> str:
    """Hash a password using bcrypt"""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    return pwd_context.verify(plain_password, hashed_password)

def create_jwt_token(user_id: str, email: str) -> str:
    """Create a JWT token for a user"""
    payload = {
        "user_id": user_id,
        "email": email,
        "exp": datetime.utcnow() + timedelta(hours=JWT_EXPIRATION_HOURS),
        "iat": datetime.utcnow()
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def verify_jwt_token(token: str) -> dict:
    """Verify and decode a JWT token"""
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired"
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    """Get current authenticated user from JWT token"""
    try:
        token = credentials.credentials
        payload = verify_jwt_token(token)
        user_id = payload.get("user_id")
        
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token payload"
            )
        
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found"
            )
        
        return user
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication failed"
        )

def check_user_credits(user: User, credits_needed: int = 1) -> bool:
    """Check if user has enough credits (admin users have unlimited credits)"""
    # Admin users (999999 credits) have unlimited access
    if user.credits_remaining >= 999999:
        return True
    return user.credits_remaining >= credits_needed

def deduct_user_credits(db: Session, user: User, credits_used: int = 1) -> bool:
    """Deduct credits from user account (admin users don't lose credits)"""
    # Admin users (999999 credits) don't lose credits
    if user.credits_remaining >= 999999:
        return True
    
    if user.credits_remaining >= credits_used:
        user.credits_remaining -= credits_used
        db.commit()
        return True
    return False

def get_user_tier(user: User) -> str:
    """Determine user's tier based on their purchase history"""
    # Admin users get ultimate tier (all features)
    if user.credits_remaining >= 999999:
        return "ultimate"
    
    # For now, we'll determine tier based on total credits purchased
    # This could be enhanced to track actual tier purchases
    if user.total_credits_purchased >= 50:
        return "ultimate"
    elif user.total_credits_purchased >= 20:
        return "pro"
    else:
        return "starter"
