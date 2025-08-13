# FurToon Style Example Generation Prompts

## Animation Styles

### 1. Pixar Animation
**Prompt**: "Transform this pet into a Pixar 3D animated character with large expressive eyes, smooth rounded features, vibrant colors, and that signature Pixar lighting and charm"

### 2. Disney Animation  
**Prompt**: "Create a Disney animated character version with classic Disney features, magical sparkles, warm colors, and the timeless Disney animation style"

### 3. Studio Ghibli Animation
**Prompt**: "Transform into a Studio Ghibli character with soft hand-drawn animation style, gentle colors, natural lighting, and that dreamy Miyazaki aesthetic"

### 4. DreamWorks Animation Style
**Prompt**: "Create a DreamWorks 3D animated character with bold expressive features, dynamic pose, vibrant colors, and that signature DreamWorks personality"

### 5. Looney Tunes / Classic Cartoon
**Prompt**: "Transform into a classic Looney Tunes cartoon character with exaggerated features, bold black outlines, bright primary colors, and vintage cartoon style"

### 6. Scooby-Doo Mystery Ink Style
**Prompt**: "Create in Scooby-Doo cartoon style with simple shapes, retro 70s colors, clean outlines, and that classic Hanna-Barbera animation look"

### 7. Rick & Morty / Adult Swim Style
**Prompt**: "Transform into Rick and Morty animation style with simple lines, muted colors, slightly crude but charming character design, and Adult Swim aesthetic"

### 8. Simpsons Style
**Prompt**: "Create in The Simpsons cartoon style with yellow skin, simple oval eyes, bold outlines, and that iconic Springfield character design"

### 9. 1930s Vintage Animation (Steamboat Willie)
**Prompt**: "Transform into 1930s black and white animation style like Steamboat Willie with simple shapes, rubber hose animation, and vintage cartoon charm"

### 10. Anime Portrait
**Prompt**: "Create an anime character with large expressive eyes, detailed shading, vibrant hair colors, and classic Japanese animation style"

## Traditional & Fine Art Styles

### 11. Watercolor Painting
**Prompt**: "Paint in watercolor style with soft flowing colors, gentle color bleeding, translucent layers, and organic watercolor texture on paper"

### 12. Oil Painting
**Prompt**: "Create as a classical oil painting with rich textures, deep colors, visible brushstrokes, and that timeless Renaissance painting quality"

### 13. Pencil Sketch
**Prompt**: "Draw as a detailed pencil sketch with realistic shading, cross-hatching, graphite textures, and artistic sketching techniques on paper"

### 14. Charcoal Drawing
**Prompt**: "Create a dramatic charcoal drawing with bold black and white contrasts, soft blending, smudging effects, and artistic charcoal texture"

### 15. Pastel Chalk Portrait
**Prompt**: "Paint with soft pastel chalks using gentle colors, smooth blending, dreamy atmosphere, and that characteristic pastel art softness"

### 16. Ink & Wash
**Prompt**: "Create in traditional East Asian ink and wash painting style with flowing black ink, minimal colors, brush strokes, and zen-like simplicity"

### 17. Gouache Painting
**Prompt**: "Paint in gouache style with opaque matte colors, smooth coverage, vibrant pigments, and that distinctive gouache painting finish"

### 18. Impressionist Painting (Monet-style)
**Prompt**: "Create in impressionist painting style with loose brushstrokes, light-focused colors, outdoor lighting effects, and Monet-inspired technique"

## Modern Digital Styles

### 19. Comic Book Art
**Prompt**: "Transform into comic book superhero art with bold outlines, dynamic shading, vibrant colors, halftone effects, and action-packed comic style"

### 20. Vector Art / Flat Illustration
**Prompt**: "Create as modern vector illustration with flat colors, geometric shapes, clean lines, minimal shading, and contemporary graphic design style"

### 21. Pixel Art (8-bit / 16-bit)
**Prompt**: "Transform into retro pixel art with blocky pixels, limited color palette, 8-bit video game aesthetic, and nostalgic gaming style"

### 22. 3D Sculpt / Claymation Look
**Prompt**: "Create as 3D clay sculpture with textured surface, dimensional depth, sculpted details, and that handmade claymation appearance"

## Fantasy & Sci-Fi Styles

### 23. Fantasy Art
**Prompt**: "Transform into epic fantasy art with magical elements, mystical lighting, rich details, fantasy creatures vibes, and enchanted atmosphere"

### 24. Cyberpunk City
**Prompt**: "Create in cyberpunk style with neon lights, futuristic elements, urban sci-fi setting, electric colors, and high-tech atmosphere"

## File Naming Convention
- Format: `{style-name}-example.png`
- Examples: `pixar-animation-example.png`, `watercolor-painting-example.png`
- Target size: 320x240px (4:3 aspect ratio for card consistency)

## Generation Workflow
1. Use same source pet photo for ALL styles
2. Generate each style using the prompts above
3. Download each image
4. Rename according to naming convention
5. Place in `/client/public/images/` directory
6. Update StylesPage.jsx with new image paths
