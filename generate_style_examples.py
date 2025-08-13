#!/usr/bin/env python3
"""
FurToon Style Example Generator

This script directly uses OpenAI's API to generate example images for all 25 artistic styles
using text prompts to create pet images in different artistic styles.
"""

import os
import base64
import time
import asyncio
from pathlib import Path
from dotenv import load_dotenv
from openai import AsyncOpenAI

# Load environment variables from the server directory
load_dotenv("server/.env")

# Configuration
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OUTPUT_DIR = Path("client/public/images")
DELAY_BETWEEN_REQUESTS = 2  # seconds to avoid overwhelming the API

if not OPENAI_API_KEY:
    print("❌ Error: OPENAI_API_KEY not found in .env file")
    exit(1)

# Initialize OpenAI client (same as your backend)
openai_client = AsyncOpenAI(api_key=OPENAI_API_KEY)

# Style definitions with optimized prompts for DALL-E 3
STYLES = [
    # Animation Styles
    {
        "name": "Pixar Animation",
        "filename": "pixar-animation-example.png",
        "prompt": "A cute golden retriever puppy in Pixar 3D animated style with large expressive eyes, smooth rounded features, vibrant colors, and signature Pixar lighting and charm"
    },
    {
        "name": "Disney Animation",
        "filename": "disney-animation-example.png",
        "prompt": "An adorable orange tabby cat as a Disney animated character with classic Disney features, magical sparkles, warm colors, and timeless Disney animation style"
    },
    {
        "name": "Studio Ghibli Animation",
        "filename": "studio-ghibli-animation-example.png",
        "prompt": "A fluffy white cat in Studio Ghibli animation style with soft hand-drawn features, gentle colors, natural lighting, and dreamy Miyazaki aesthetic"
    },
    {
        "name": "DreamWorks Animation Style",
        "filename": "dreamworks-animation-example.png",
        "prompt": "A German Shepherd dog as a DreamWorks 3D animated character with bold expressive features, dynamic pose, vibrant colors, and signature DreamWorks personality"
    },
    {
        "name": "Looney Tunes / Classic Cartoon",
        "filename": "looney-tunes-example.png",
        "prompt": "A beagle dog in classic Looney Tunes cartoon style with exaggerated features, bold black outlines, bright primary colors, and vintage cartoon style"
    },
    {
        "name": "Scooby-Doo Mystery Ink Style",
        "filename": "scooby-doo-example.png",
        "prompt": "A Great Dane dog in Scooby-Doo cartoon style with simple shapes, retro 70s colors, clean outlines, and classic Hanna-Barbera animation look"
    },
    {
        "name": "Rick & Morty / Adult Swim Style",
        "filename": "rick-morty-example.png",
        "prompt": "A corgi dog in Rick and Morty animation style with simple lines, muted colors, slightly crude but charming character design, and Adult Swim aesthetic"
    },
    {
        "name": "Simpsons Style",
        "filename": "simpsons-style-example.png",
        "prompt": "A black cat in The Simpsons cartoon style with yellow background, simple oval eyes, bold outlines, and iconic Springfield character design"
    },
    {
        "name": "1930s Vintage Animation (Steamboat Willie)",
        "filename": "1930s-animation-example.png",
        "prompt": "A playful dog in 1930s black and white animation style like Steamboat Willie with simple shapes, rubber hose animation, and vintage cartoon charm"
    },
    {
        "name": "Anime Portrait",
        "filename": "anime-portrait-example.png",
        "prompt": "A Shiba Inu dog as an anime character with large expressive eyes, detailed shading, vibrant colors, and classic Japanese animation style"
    },
    
    # Traditional & Fine Art
    {
        "name": "Watercolor Painting",
        "filename": "watercolor-painting-example.png",
        "prompt": "A beautiful Persian cat painted in watercolor style with soft flowing colors, gentle color bleeding, translucent layers, and organic watercolor texture on paper"
    },
    {
        "name": "Oil Painting",
        "filename": "oil-painting-example.png",
        "prompt": "A regal golden retriever as a classical oil painting with rich textures, deep colors, visible brushstrokes, and timeless Renaissance painting quality"
    },
    {
        "name": "Pencil Sketch",
        "filename": "pencil-sketch-example.png",
        "prompt": "A border collie dog drawn as a detailed pencil sketch with realistic shading, cross-hatching, graphite textures, and artistic sketching techniques on paper"
    },
    {
        "name": "Charcoal Drawing",
        "filename": "charcoal-drawing-example.png",
        "prompt": "A Maine Coon cat as a dramatic charcoal drawing with bold black and white contrasts, soft blending, smudging effects, and artistic charcoal texture"
    },
    {
        "name": "Pastel Chalk Portrait",
        "filename": "pastel-chalk-example.png",
        "prompt": "A Siamese cat painted with soft pastel chalks using gentle colors, smooth blending, dreamy atmosphere, and characteristic pastel art softness"
    },
    {
        "name": "Ink & Wash",
        "filename": "ink-wash-example.png",
        "prompt": "A sitting dog in traditional East Asian ink and wash painting style with flowing black ink, minimal colors, brush strokes, and zen-like simplicity"
    },
    {
        "name": "Gouache Painting",
        "filename": "gouache-painting-example.png",
        "prompt": "A colorful parrot painted in gouache style with opaque matte colors, smooth coverage, vibrant pigments, and distinctive gouache painting finish"
    },
    {
        "name": "Impressionist Painting (Monet-style)",
        "filename": "impressionist-painting-example.png",
        "prompt": "A French Bulldog in an impressionist painting style with loose brushstrokes, light-focused colors, outdoor lighting effects, and Monet-inspired technique"
    },
    
    # Modern Digital Styles
    {
        "name": "Comic Book Art",
        "filename": "comic-book-art-example.png",
        "prompt": "A superhero cat in comic book art style with bold outlines, dynamic shading, vibrant colors, halftone effects, and action-packed comic style"
    },
    {
        "name": "Vector Art / Flat Illustration",
        "filename": "vector-art-example.png",
        "prompt": "A modern flat illustration of a husky dog with clean lines, geometric shapes, flat colors, minimal shading, and contemporary graphic design style"
    },
    {
        "name": "Pixel Art (8-bit / 16-bit)",
        "filename": "pixel-art-example.png",
        "prompt": "A cute pixelated cat in retro 8-bit pixel art style with blocky pixels, limited color palette, video game aesthetic, and nostalgic gaming style"
    },
    {
        "name": "3D Sculpt / Claymation Look",
        "filename": "3d-sculpt-example.png",
        "prompt": "A dachshund dog as a 3D clay sculpture with textured surface, dimensional depth, sculpted details, and handmade claymation appearance"
    },
    
    # Fantasy & Sci-Fi
    {
        "name": "Fantasy Art",
        "filename": "fantasy-art-example.png",
        "prompt": "A majestic wolf in epic fantasy art style with magical elements, mystical lighting, rich details, fantasy creature vibes, and enchanted atmosphere"
    },
    {
        "name": "Cyberpunk City",
        "filename": "cyberpunk-city-example.png",
        "prompt": "A cybernetic cat in cyberpunk style with neon lights, futuristic elements, urban sci-fi setting, electric colors, and high-tech atmosphere"
    },
    {
        "name": "Renaissance Portrait",
        "filename": "renaissance-portrait-example.png",
        "prompt": "An elegant spaniel dog as a classical Renaissance portrait with rich oil painting textures, masterful chiaroscuro lighting, detailed realism, and timeless Renaissance artistry"
    }
]

def ensure_output_directory():
    """Create output directory if it doesn't exist"""
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    print(f"✅ Output directory ready: {OUTPUT_DIR}")

async def generate_style_image(style):
    """Generate a single style example using OpenAI's DALL-E 3"""
    print(f"\n🎨 Generating: {style['name']}")
    
    try:
        # Call OpenAI's image generation API directly (same as your backend)
        response = await openai_client.images.generate(
            model="dall-e-3",
            prompt=style['prompt'],
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
            output_path = OUTPUT_DIR / style['filename']
            
            with open(output_path, 'wb') as f:
                f.write(image_data)
            
            print(f"✅ Saved: {style['filename']}")
            return True
        else:
            print(f"❌ No image data in response for {style['name']}")
            return False
            
    except Exception as e:
        print(f"❌ Error generating {style['name']}: {e}")
        return False

async def main():
    """Main execution function"""
    print("🎨 FurToon Style Example Generator")
    print("🐾 Generating example pet images for all 25 artistic styles using OpenAI...")
    print("=" * 70)
    
    ensure_output_directory()
    
    # Generate all styles
    successful = 0
    failed = 0
    
    print(f"\n🚀 Starting generation of {len(STYLES)} style examples...")
    
    for i, style in enumerate(STYLES, 1):
        print(f"\n[{i}/{len(STYLES)}]", end=" ")
        
        if await generate_style_image(style):
            successful += 1
        else:
            failed += 1
        
        # Add delay between requests to respect rate limits
        if i < len(STYLES):
            print(f"⏱️  Waiting {DELAY_BETWEEN_REQUESTS}s before next generation...")
            await asyncio.sleep(DELAY_BETWEEN_REQUESTS)
    
    # Summary
    print("\n" + "=" * 70)
    print("📊 Generation Complete!")
    print(f"✅ Successful: {successful}")
    print(f"❌ Failed: {failed}")
    print(f"📁 Images saved to: {OUTPUT_DIR}")
    
    if successful > 0:
        print(f"\n🎉 Visit http://localhost:5173/styles to see your new style gallery!")

if __name__ == "__main__":
    asyncio.run(main())