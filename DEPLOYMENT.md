# 🚀 SocialManu Deployment Guide

This guide covers deploying SocialManu to various platforms with production-ready configurations.

## 🎯 Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] Completed local development setup
- [ ] Tested all features locally
- [ ] Set up production Supabase project
- [ ] Prepared environment variables
- [ ] Optimized build for production

## 🌟 Recommended: Vercel Deployment

Vercel offers the best experience for React applications with zero-config deployments.

### 1. Prepare Your Repository

```bash
# Ensure your code is pushed to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Deploy to Vercel

#### Option A: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables
5. Deploy

#### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### 3. Environment Variables

Add these in Vercel Dashboard > Settings > Environment Variables:

```bash
VITE_SUPABASE_URL=https://your-production-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-production-anon-key
```

### 4. Custom Domain (Optional)

1. Go to Vercel Dashboard > Settings > Domains
2. Add your custom domain
3. Configure DNS settings as shown
4. SSL certificate is automatically provided

## 🔷 Alternative: Netlify Deployment

### 1. Build Settings

Create `netlify.toml` in project root:

```toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 2. Deploy Process

#### Option A: Git Integration

1. Connect GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables

#### Option B: Manual Upload

```bash
# Build the project
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

## 🐳 Docker Deployment

### 1. Create Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 2. Create nginx.conf

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass https://your-supabase-url.supabase.co;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 3. Build and Run

```bash
# Build Docker image
docker build -t socialmanu .

# Run container
docker run -p 3000:80 \
  -e VITE_SUPABASE_URL=your-url \
  -e VITE_SUPABASE_ANON_KEY=your-key \
  socialmanu
```

## ☁️ AWS Deployment

### 1. AWS Amplify

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Initialize project
amplify init

# Add hosting
amplify add hosting

# Deploy
amplify publish
```

### 2. AWS S3 + CloudFront

```bash
# Build the project
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

## 🔧 Production Supabase Configuration

### 1. Production Project Setup

1. Create a new Supabase project for production
2. Import your schema from `supabase-schema.sql`
3. Configure authentication settings
4. Set up storage buckets and policies

### 2. Authentication Settings

```sql
-- Update site URL in Supabase Dashboard
-- Authentication > Settings > Site URL
-- Set to your production domain
```

### 3. Storage Bucket Policies

```sql
-- Ensure storage policies allow production access
CREATE POLICY "Production bucket access" ON storage.objects
FOR ALL USING (bucket_id = 'posts');
```

### 4. Database Optimization

```sql
-- Add indexes for better performance
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_follows_follower_id ON follows(follower_id);
CREATE INDEX idx_likes_post_id ON likes(post_id);
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
```

## 🔐 Security Configuration

### 1. Environment Variables

**Never expose these in client-side code:**

- Database passwords
- JWT secrets
- API keys (except Supabase anon key)

### 2. Content Security Policy

Add CSP headers in your hosting platform:

```
Content-Security-Policy: default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline' fonts.googleapis.com;
  font-src 'self' fonts.gstatic.com;
  img-src 'self' data: https:;
  connect-src 'self' https://*.supabase.co;
```

### 3. CORS Configuration

Ensure Supabase allows your production domain:

1. Go to Settings > API
2. Add your domain to CORS origins

## 📊 Performance Optimization

### 1. Build Optimization

```json
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          supabase: ['@supabase/supabase-js'],
          ui: ['@radix-ui/react-avatar', '@radix-ui/react-dialog']
        }
      }
    }
  }
})
```

### 2. Image Optimization

```typescript
// Use Supabase image transformations
const getOptimizedImageUrl = (url: string, width = 400) => {
  return `${url}?width=${width}&quality=80&format=webp`;
};
```

### 3. Caching Strategy

```typescript
// Service worker for caching (optional)
// Add to public/sw.js for offline functionality
```

## 🔍 Monitoring and Analytics

### 1. Error Tracking

```bash
# Add Sentry for error tracking
npm install @sentry/react @sentry/tracing

# Configure in main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production"
});
```

### 2. Performance Monitoring

```typescript
// Add to main.tsx
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

### 3. Analytics

```typescript
// Add Google Analytics 4
// Install gtag
npm install gtag

// Configure in main.tsx
import { gtag } from 'gtag';

gtag('config', 'GA_MEASUREMENT_ID');
```

## 🔄 Continuous Deployment

### 1. GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test

      - name: Build
        run: npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: "--prod"
```

### 2. Automated Testing

```bash
# Add to CI pipeline
npm run typecheck
npm run test
npm run build
```

## 🆘 Troubleshooting Production Issues

### 1. Common Deployment Errors

**Build Failures:**

```bash
# Check build locally
npm run build

# Fix TypeScript errors
npm run typecheck
```

**Environment Variable Issues:**

- Ensure all required variables are set
- Check variable names match exactly
- Verify Supabase project URL and key

**Routing Issues:**

- Configure SPA fallback (`index.html`)
- Check Vercel redirects in `vercel.json`

### 2. Performance Issues

**Slow Initial Load:**

- Enable gzip compression
- Implement code splitting
- Optimize images

**Database Performance:**

- Add database indexes
- Monitor query performance in Supabase
- Optimize RLS policies

### 3. Production Debugging

```typescript
// Add production-safe logging
const isDev = import.meta.env.DEV;

const logger = {
  log: (...args: any[]) => {
    if (isDev) console.log(...args);
  },
  error: (...args: any[]) => {
    console.error(...args);
    // Send to error tracking service
  },
};
```

## 📚 Post-Deployment Tasks

### 1. Domain and SSL Setup

- Configure custom domain
- Verify SSL certificate
- Set up redirects (www to non-www)

### 2. SEO Optimization

- Add meta tags for social sharing
- Configure robots.txt
- Submit sitemap to search engines

### 3. User Onboarding

- Test user registration flow
- Verify email delivery
- Check mobile responsiveness

### 4. Backup Strategy

- Set up database backups
- Document recovery procedures
- Test restore process

---

## 🎉 Deployment Complete!

Your SocialManu application is now live in production. Make sure to:

1. Monitor application performance
2. Set up alerts for errors
3. Plan for scaling as user base grows
4. Keep dependencies updated
5. Regular security audits

**Next Steps:**

- Share your application with users
- Gather feedback and iterate
- Plan new features and improvements
- Monitor usage analytics

Happy deploying! 🚀
