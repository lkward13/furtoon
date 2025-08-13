# FurToon Deployment Guide

## 🚀 Quick Production Deployment

### Option 1: Vercel + Railway (Recommended - Free Tier)

**Frontend (Vercel)**
1. Push code to GitHub
2. Connect Vercel to your GitHub repo
3. Deploy frontend automatically
4. Point `www.furtoonai.com` to Vercel

**Backend (Railway)**
1. Connect Railway to your GitHub repo
2. Deploy the `/server` folder
3. Add environment variables in Railway dashboard

### Option 2: Netlify + Render (Alternative Free)

**Frontend (Netlify)**
1. Connect Netlify to your GitHub repo
2. Build command: `cd client && npm run build`
3. Publish directory: `client/dist`

**Backend (Render)**
1. Connect Render to your GitHub repo
2. Deploy as Web Service
3. Root directory: `server`
4. Build command: `pip install -r requirements.txt`
5. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

## 🔧 Environment Variables

Create `server/.env` with these values:

```bash
# OpenAI API Key
OPENAI_API_KEY=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

# Database
DATABASE_URL=sqlite:///./furtoon.db

# JWT Secret (generate a secure 32+ character string)
JWT_SECRET=FurToon2024SuperSecretJWTKeyForAuthenticationSystemMinimum32Characters

# Stripe API Keys
STRIPE_PUBLISHABLE_KEY=pk_live_51RH9tiALxbV4mCksWkoGNY6QRdSwNpzN0Wd72svCCYwuuus0gzglL6040PPTWlUJplkkDVzQIIOooxI4Wj1opLBB00VwtZUJPD
STRIPE_SECRET_KEY=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
STRIPE_WEBHOOK_SECRET=whsec_FRdnrMGV2rnIVtzUxokP1WlwBPuAJlnY

# Frontend URL (update with your production domain)
CLIENT_URL=https://www.furtoonai.com
```

## 📋 Domain Setup

1. **In Namecheap Dashboard:**
   - Go to Domain List → Manage
   - Advanced DNS → Add Record
   - Type: CNAME, Host: www, Value: your-vercel-app.vercel.app

2. **In Vercel Dashboard:**
   - Go to your project → Settings → Domains
   - Add Domain: www.furtoonai.com
   - Follow verification steps

## 🔄 Frontend Configuration

Update `client/src/contexts/AuthContext.jsx`:
```javascript
const API_BASE_URL = 'https://your-railway-app.up.railway.app/api';
```

## ✅ Checklist Before Going Live

- [ ] Environment variables set on hosting platform
- [ ] Database created and tables initialized
- [ ] Frontend API URL updated to production backend
- [ ] Domain pointed to Vercel
- [ ] SSL certificate working (automatic with Vercel)
- [ ] Admin account created: lkward13@gmail.com
- [ ] Test user accounts working
- [ ] Stripe payments configured for live mode
- [ ] All 25 style examples generated

## 💰 Cost Breakdown

**Monthly Costs:**
- Domain: $1/month (Namecheap)
- Vercel: $0 (Free tier)
- Railway: $0-5/month (Free tier, then $5)
- **Total: $1-6/month**

## 🚨 Production Tips

1. **Database**: SQLite works for MVP but consider PostgreSQL for scaling
2. **Monitoring**: Add logging for errors and usage
3. **Backups**: Railway provides automatic backups
4. **Performance**: Monitor OpenAI API usage costs
5. **Security**: Use HTTPS everywhere (automatic with Vercel)

Your app will be live at `https://www.furtoonai.com` 🎨✨
