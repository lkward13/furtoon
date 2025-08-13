# FurToon Build Plan – Full Website (PhotoAI-Style)

## 1. Brand & Style System

**Name:** Keep “FurToon” for now (easy to swap later).  
**Tone:** Playful, warm, trustworthy, modern.

### Palette
- **Primary:** `#6366F1` (indigo-500) → hover `#4F46E5` (indigo-600)
- **Accent:** `#F59E0B` (amber-500)
- **Success:** `#10B981`
- **Surface:** `#FFFFFF` (cards), page bg `#F8FAFC` (slate-50)
- **Text:** `#0F172A` (slate-900), secondary `#475569` (slate-600)
- **Soft gradient:** `bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500`

### Tailwind Tokens
- Rounded: `rounded-2xl`
- Shadows: `shadow-lg` (hover: `shadow-xl`)
- Borders: subtle `border-slate-200`
- Motion: `transition-all duration-200`
- Typography: keep your current font; use `tracking-tight` for headlines

### Components
- `Container` (max-w-7xl px-4 md:px-6)
- `PrimaryButton`, `SecondaryButton`
- `Card` (white bg, rounded-2xl, border, shadow)
- `SectionTitle` (eyebrow + h2 + subcopy)
- `Logo` with gradient text fill

---

## 2. Pages & Sections

### **A) Home (`/`)**
Goal: Convert quickly, show social proof, demo styles visually, and funnel users to create or purchase.

1. **Header (sticky, light)**
   - Logo (gradient text)
   - Links: *Create*, *Pricing*, *Login/Register* (primary button)

2. **Hero**
   - H1: “AI Pet Portraits”
   - Sub: “Transform your pet photo into stunning artwork.”
   - Primary CTA → `/create`
   - Trust logos row (“Loved by 10k+ pet parents”)
   - Hero visual: stacked style cards

3. **Style Gallery**
   - 25 styles, 160×128 hi-DPI thumbnails
   - Click → preselect style on `/create`

4. **How it Works**
   - Upload → Pick style → Download
   - Icons + 1-line explanations

5. **Before / After carousel**
   - 6–8 examples, dogs & cats

6. **Testimonials**
   - 3–6 cards, star ratings, pet photos

7. **Pricing teaser**
   - 3 cards + “See full pricing” → `/pricing`

8. **Email capture**
   - Offer 20% off for first order

9. **FAQ**
   - 6 expandable Q&As

10. **Footer**
    - Links: Create, Pricing, FAQ, Privacy, Terms, Contact
    - Social icons, © year

---

### **B) Create (`/create`)**
- Refactor existing upload page into a `Create` page
- Replace gradient tiles with style thumbnails
- Preselect style if `?style=` param exists

---

### **C) Pricing (`/pricing`)**
- 3 tiers:
  - **Basic – $9.99**: 6 styles, 8 outputs, 1 pet
  - **Custom – $14.99**: 1 custom prompt + 12 outputs
  - **Artist – $29.99**: 2 pets, 20 outputs, print-ready
- “Most popular” badge on Custom
- CTA → Stripe Checkout

---

### **D) Success & Cancel**
- `/success`: Thanks, download link, “Generate another”
- `/cancel`: Retry option

---

## 3. Copywriting

**Hero**
- **H1:** AI Pet Portraits
- **Sub:** Turn your pet’s photo into wall-worthy art in seconds.
- **CTA:** Create your portrait

**3-step**
1. Upload: well-lit photo
2. Choose: 25+ styles
3. Download: high-res PNG

**Trust strip**
- Loved by 10,000+ pet parents. Private by default. Auto-delete in 24h.

**Pricing**
- No subscriptions. Pay once.
- Fast delivery (<1 min)
- Friendly refunds

**Email capture**
- Get 20% off your first portrait.  
  Join our list for new styles & seasonal drops.

**FAQ**
- Which photos work best?
- Is my photo private?
- Can I print it?
- How many pets?
- Refunds?

---

## 4. Styles (25 total)

**Current 9** + these additions:

Painterly/Art:
- Pastel Sketch
- Charcoal Drawing
- Ink Wash
- Renaissance Oil
- Pop-Art Pop
- Neon Glow
- Low-Poly
- 3D Plush Toy

Illustrative:
- Storybook
- Chibi Cute
- Minimal Line Art
- Children’s Book
- Retro Poster
- Kawaii Sticker
- Paper-Cut Collage

Cinematic/Photo:
- Studio Portrait
- Soft Film Grain
- Pastel Film
- Golden Hour
- Bokeh Garden
- Snow Day
- Vintage Polaroid
- Retro 90s Cam

---

## 5. Folder Structure

```
/client
  /src
    /components
      Button.tsx
      Card.tsx
      Container.tsx
      Header.tsx
      Footer.tsx
      EmailCapture.tsx
      StyleTile.tsx
      TestimonialCard.tsx
      PriceCard.tsx
    /pages
      Home.tsx
      Create.tsx
      Pricing.tsx
      Success.tsx
      Cancel.tsx
    /lib
      styles.ts
      api.ts
    /assets/styles/  // thumbnails
    main.tsx
    App.tsx
  index.html
  tailwind.config.js

/server
  app.ts
  /routes
    images.ts
    payments.ts
    webhooks.ts
    subscribe.ts
  /lib
    stripe.ts
    db.ts
  prisma/schema.prisma
```

---

## 6. Thumbnails

- Use full-size source, scale via CSS  
- Or export 320×256 (2×) and use `srcset`

Example component:

```jsx
<div className="w-[160px] h-[128px] overflow-hidden rounded-md">
  <img
    src={img.src}
    srcSet={`${img.src2x} 2x`}
    alt={name}
    className="w-full h-full object-cover"
    loading="lazy"
  />
</div>
```

---

## 7. Email Capture

**Frontend:** `EmailCapture.tsx`  
**Backend:** `/api/subscribe` → store in DB or CSV

---

## 8. Stripe Checkout Integration

**Setup:**
- Create 3 Prices in Stripe dashboard
- Store `price_XXXX` IDs in `.env`

**Server route:**
- `/api/pay/checkout`
- `/api/pay/webhook` (listen to `checkout.session.completed`)

---

## 9. Prisma Models (Optional)

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  credits   Int      @default(0)
  orders    Order[]
  createdAt DateTime @default(now())
}

model Order {
  id        String   @id @default(cuid())
  stripeId  String   @unique
  priceId   String
  amount    Int
  status    String
  userId    String?
  user      User?    @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
}

model Subscriber {
  id        String   @id @default(cuid())
  email     String   @unique
  createdAt DateTime @default(now())
}
```

---

## 10. Routes & Navigation

- `/` Home
- `/create`
- `/pricing`
- `/success`
- `/cancel`
- `/legal/privacy`, `/legal/terms`

---

## 11. SEO & Speed

- Custom `<title>` and meta descriptions
- OG image: grid of styles
- Lazy-load images
- Add `sitemap.xml`, `robots.txt`

---

## 12. Analytics

- Plausible, Umami, or GA
- Favicon, manifest
- 404 page

---

## 13. Cursor Task List

1. Tailwind theme update (colors, components)
2. Header/Footer components + routes
3. Home sections (Hero, Styles grid, Steps, Before/After, Testimonials, Pricing teaser, Email capture, FAQ)
4. Pricing page
5. Create page: replace tiles
6. Email capture API
7. Stripe checkout + webhook
8. Success/Cancel pages
9. Asset pipeline for thumbnails
10. QA & deploy

---

## 14. Pricing Card Example

```jsx
function PriceCard({name, price, features, popular, onClick}) {
  return (
    <div className={`relative rounded-2xl border ${popular ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-slate-200'} bg-white p-6 shadow-lg`}>
      {popular && (
        <span className="absolute -top-3 right-4 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white shadow">Most popular</span>
      )}
      <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
      <div className="mt-2 text-3xl font-bold tracking-tight text-slate-900">${price}<span className="text-base font-medium text-slate-500"> / one-time</span></div>
      <ul className="mt-4 space-y-2 text-sm text-slate-600">
        {features.map(f => <li key={f} className="flex items-start gap-2"><span>✔</span>{f}</li>)}
      </ul>
      <button onClick={onClick} className="mt-6 w-full rounded-xl bg-indigo-600 py-3 text-white font-medium hover:bg-indigo-700 transition">Continue to checkout</button>
    </div>
  );
}
```

---

## 15. Security & Privacy

- Limit upload size (10MB)
- MIME check
- Serve generated images securely
- CORS allow only `CLIENT_URL`
- Verify Stripe signatures on webhook
