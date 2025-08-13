#!/usr/bin/env python3
"""
Regenerate the Impressionist style example with a safer prompt
"""

import os
import base64
import asyncio
from pathlib import Path
from dotenv import load_dotenv
from openai import AsyncOpenAI

# Load environment variables from the server directory
load_dotenv("server/.env")

# Configuration
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OUTPUT_DIR = Path("client/public/images")

if not OPENAI_API_KEY:
    print("❌ Error: OPENAI_API_KEY not found in .env file")
    exit(1)

# Initialize OpenAI client
openai_client = AsyncOpenAI(api_key=OPENAI_API_KEY)

# Updated Impressionist style with safer prompt
IMPRESSIONIST_STYLE = {
    "name": "Impressionist Painting",
    "filename": "impressionist-painting-example.png",
    "prompt": "A French Bulldog painted in impressionist art style with loose visible brushstrokes, soft natural lighting, outdoor garden setting, and painted plein air technique with vibrant colors"
}

async def regenerate_impressionist():
    """Regenerate the Impressionist style example"""
    print("🎨 Regenerating: Impressionist Painting")
    print("🔄 Using safer prompt to avoid content policy issues...")
    
    try:
        # Call OpenAI's image generation API
        response = await openai_client.images.generate(
            model="dall-e-3",
            prompt=IMPRESSIONIST_STYLE['prompt'],
            size="1024x1024",
            quality="standard",
            response_format="b64_json",
            n=1,
        )
        
        # Extract base64 image data
        image_base64 = response.data[0].b64_json
        
        if image_base64:
            # Decode and save the image
            image_data = base64.b64decode(image_base64)
            output_path = OUTPUT_DIR / IMPRESSIONIST_STYLE['filename']
            
            with open(output_path, 'wb') as f:
                f.write(image_data)
            
            print(f"✅ Successfully saved: {IMPRESSIONIST_STYLE['filename']}")
            print(f"📁 Location: {output_path}")
            return True
        else:
            print(f"❌ No image data in response")
            return False
            
    except Exception as e:
        print(f"❌ Error generating Impressionist style: {e}")
        return False

async def main():
    print("🎨 FurToon Impressionist Style Regenerator")
    print("=" * 50)
    
    # Ensure output directory exists
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    success = await regenerate_impressionist()
    
    if success:
        print("\n🎉 Impressionist style successfully regenerated!")
        print("Now you have all 25 style examples complete!")
    else:
        print("\n❌ Failed to regenerate Impressionist style.")

if __name__ == "__main__":
    asyncio.run(main())
