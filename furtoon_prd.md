
# FurToon - Product Requirements Document (PRD)

## 1. Overview

**Product Name**: FurToon  
**Objective**: Provide pet owners with personalized, high-quality, AI-generated portraits of their pets in various artistic styles, such as Pixar-style, watercolor, or fantasy.

---

## 2. User Stories

- As a **pet owner**, I want to upload a photo of my pet and choose an artistic style so I can receive a personalized portrait.
- As a **user**, I want to preview the generated image before finalizing the purchase to ensure satisfaction.
- As a **customer**, I want options to download the digital image or order a physical print for home delivery.

---

## 3. Functional Requirements

- **Image Upload**: Users can upload pet photos in JPEG, PNG formats.
- **Style Selection**: Provide a selection of artistic styles (Pixar, watercolor, fantasy, etc.).
- **AI Integration**: Utilize OpenAI's `gpt-image-1` model for image generation.
- **Preview Feature**: Allow users to preview AI-generated images before checkout.
- **Download and Print Options**: Digital download + optional print-on-demand integration.
- **User Accounts**: Users can register/login to track orders and save portraits.

---

## 4. Non-Functional Requirements

- **Performance**: Generate and deliver images in under 2 minutes.
- **Scalability**: Support scaling as user base and API calls grow.
- **Security**: Secure uploads, user data, and payment information.
- **Compliance**: Adhere to OpenAI terms and data privacy regulations (GDPR/CCPA).

---

## 5. Technical Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **AI Integration**: OpenAI gpt-image-1 (via `v1/images/generations`)
- **Payments**: Stripe
- **Storage**: AWS S3 or Cloudinary

---

## 6. OpenAI Image API (gpt-image-1)

### API Endpoint:
`POST https://api.openai.com/v1/images/generations`

### Sample Request:

```bash
curl https://api.openai.com/v1/images/generations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "model": "gpt-image-1",
    "prompt": "A Pixar-style portrait of a golden retriever wearing a superhero cape",
    "n": 1,
    "size": "1024x1024",
    "response_format": "url"
  }'
```

### Key Parameters:
- `model`: "gpt-image-1"
- `prompt`: Text describing the image
- `n`: Number of images
- `size`: e.g., "1024x1024"
- `response_format`: "url" or "b64_json"

---

## 7. User Interface Design

- **Homepage**: Feature value prop, samples, testimonials.
- **Upload Page**: Image upload, style selector, prompt input.
- **Preview Page**: Show generated image + edit/regenerate option.
- **Checkout Page**: Stripe checkout + download/print options.
- **User Dashboard**: Order history and download center.

---

## 8. Marketing and Advertising

- **Social Media**: Before/after video Reels for Instagram, TikTok.
- **Influencers**: Partner with dog/cat accounts for shoutouts.
- **Pinterest**: Pet gift guides and custom portrait boards.
- **SEO**: Optimize for keywords like "Pixar pet portrait", "custom dog art".
- **Email Marketing**: Cart abandonment emails, seasonal promos.

---

## 9. Monetization

- **One-Time Purchase**: $15–$25 for digital download.
- **Print Upsell**: $30–$60 for physical prints.
- **Subscription Model**: $9/month for new styles.

---

## 10. Future Features

- Style quiz: “Which style suits your pet?”
- Animated AI clips for social sharing.
- Gift cards & occasion-based bundles.
- Upload multiple pets per order.
