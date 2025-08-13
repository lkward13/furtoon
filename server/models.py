"""
Pydantic models for API requests and responses
"""
from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel, EmailStr

# User Authentication Models
class UserRegister(BaseModel):
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    email: str
    credits_remaining: int
    total_credits_purchased: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

# Credit and Purchase Models
class PurchaseRequest(BaseModel):
    tier: str  # "starter", "pro", "ultimate"

class PurchaseResponse(BaseModel):
    id: str
    tier: str
    amount: float
    credits_purchased: int
    status: str
    purchase_date: datetime
    
    class Config:
        from_attributes = True

class StripeCheckoutRequest(BaseModel):
    tier: str
    success_url: str
    cancel_url: str

class StripeCheckoutResponse(BaseModel):
    checkout_url: str
    session_id: str

# Generation Models
class GenerationRequest(BaseModel):
    style: str

class GenerationResponse(BaseModel):
    id: str
    style: str
    result_base64: Optional[str]
    created_at: datetime
    credits_used: int
    
    class Config:
        from_attributes = True

class GenerationHistory(BaseModel):
    id: str
    style: str
    original_filename: Optional[str]
    result_base64: Optional[str]
    created_at: datetime
    credits_used: int
    
    class Config:
        from_attributes = True

# Dashboard Models
class UserDashboard(BaseModel):
    user: UserResponse
    recent_generations: List[GenerationHistory]
    total_generations: int
    available_styles: List[str]
    user_tier: str

# Style Models
class StyleInfo(BaseModel):
    name: str
    category: str
    description: str
    example_image: str
    available_for_tier: List[str]

class StylesResponse(BaseModel):
    basic_styles: List[StyleInfo]
    all_styles: List[StyleInfo]
    user_available_styles: List[str]

# Error Models
class ErrorResponse(BaseModel):
    detail: str
    error_code: Optional[str] = None

# Success Models
class SuccessResponse(BaseModel):
    message: str
    data: Optional[dict] = None
