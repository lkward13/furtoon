import os
import base64
import io
from dotenv import load_dotenv
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from openai import AsyncOpenAI
from pymongo import MongoClient
from PIL import Image
import certifi # Import certifi
import uvicorn # Although typically run from CLI, importing can be useful

# Load environment variables from .env file
load_dotenv()

# --- Configuration --- 
MONGO_URI = os.getenv("MONGO_URI")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
CLIENT_URL = "http://localhost:5173" # Or your frontend port

# --- Error Handling --- 
if not MONGO_URI:
    print("WARNING: MONGO_URI not found in .env file. Continuing without database.")
if not OPENAI_API_KEY:
    print("FATAL ERROR: OPENAI_API_KEY not found in .env file.")
    exit(1)

# --- Initialize App and Clients --- 
app = FastAPI(title="FurToon API")

# --- CORS Middleware --- 
app.add_middleware(
    CORSMiddleware,
    allow_origins=[CLIENT_URL], # Allow frontend origin
    allow_credentials=True,
    allow_methods=["*"], # Allow all methods
    allow_headers=["*"] # Allow all headers
)

# --- OpenAI Client --- 
openai_client = AsyncOpenAI(api_key=OPENAI_API_KEY)

# --- Style Prompt Mapping ---
# These prompts match the ones used to generate our example images
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

# --- MongoDB Connection --- 
db = None
if MONGO_URI:
    try:
        # Get the path to the CA bundle from certifi
        ca_path = certifi.where()
        print(f"Using CA bundle from: {ca_path}")
        # Connect using the CA bundle path
        mongo_client = MongoClient(MONGO_URI, tlsCAFile=ca_path)
        # Ping to confirm connection
        mongo_client.admin.command('ping')
        db = mongo_client.furtoonDB # Or your database name
        print("MongoDB connected successfully.")
    except Exception as e:
        print(f"WARNING: MongoDB connection error: {e}. Continuing without database.")
else:
    print("Skipping MongoDB connection; no MONGO_URI provided.")

# --- API Endpoints --- 

@app.get("/api/test")
async def test_endpoint():
    return {"message": "Python backend is running!"}

@app.post("/api/images/generate")
async def generate_styled_image(style: str = Form(...), imageFile: UploadFile = File(...)):
    """
    Receives an uploaded image file and a style, resizes the image,
    calls OpenAI images.edit, and returns the base64 encoded result.
    """
    print(f"Received request: style='{style}', filename='{imageFile.filename}'")

    if not imageFile.content_type in ["image/png", "image/jpeg"]:
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload PNG or JPG.")

    try:
        # --- Read and Resize Image using Pillow --- 
        image_bytes = await imageFile.read()
        img = Image.open(io.BytesIO(image_bytes))

        # Resize (e.g., fit within 1024x1024, preserve aspect ratio)
        # Note: OpenAI edit endpoint requires square PNGs for masks, 
        # but for image input alone, it might be more flexible. 
        # Resizing to fit *within* 1024x1024 is safer than forcing square.
        img.thumbnail((1024, 1024))
        
        # Save resized image to a BytesIO object as PNG
        output_buffer = io.BytesIO()
        img.save(output_buffer, format="PNG")
        output_buffer.seek(0) # Reset buffer position to the beginning
        print("Image resized and converted to PNG buffer.")

        # Use the detailed style prompt if available, otherwise fall back to a generic prompt
        if style in STYLE_PROMPTS:
            edit_prompt = f"{STYLE_PROMPTS[style]} based on the reference image. Maintain the subject and composition while applying this artistic style."
        else:
            # Fall back for custom scenes or unknown styles
            edit_prompt = f"A {style}-style portrait based on the reference image. Maintain the subject and composition."

        # --- Call OpenAI API --- 
        print(f"Calling OpenAI images.edit with style: {style}")
        
        # Pass image data as a tuple: (filename, file_bytes, mimetype)
        image_data_tuple = ("image.png", output_buffer.getvalue(), "image/png")
        
        response = await openai_client.images.edit(
            model="gpt-image-1",
            image=image_data_tuple, # Pass the tuple
            prompt=edit_prompt,
            n=1,
        )
        # ---------------------

        imageBase64 = response.data[0].b64_json

        if not imageBase64:
            print("Error: No b64_json found in OpenAI response")
            raise HTTPException(status_code=500, detail="Failed to generate image: OpenAI did not return image data.")

        print("Image generated successfully by OpenAI.")
        return {"imageBase64": imageBase64}

    except Exception as e:
        print(f"Error during image generation/editing process: {e}")
        # Try to provide a more specific error if it's an OpenAI API error
        # This requires checking the structure of potential OpenAI exceptions
        error_detail = str(e)
        raise HTTPException(status_code=500, detail=f"Failed to generate image: {error_detail}")

# --- Run Server (for local development) --- 
# It's usually better to run uvicorn from the command line:
# uvicorn server.main:app --reload --host 0.0.0.0 --port 5001
# But this allows running with `python server/main.py` if needed.
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5001) 