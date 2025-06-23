# 🚀 SocialManu Setup Guide

This guide will walk you through setting up SocialManu from scratch, including database configuration, environment setup, and deployment.

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** installed ([Download here](https://nodejs.org/))
- **Git** installed ([Download here](https://git-scm.com/))
- **Supabase Account** (free tier available at [supabase.com](https://supabase.com))
- **Code Editor** (VS Code recommended)

## 🎯 Step-by-Step Setup

### 1. Repository Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/socialmanu.git
cd socialmanu

# Install dependencies
npm install

# Verify installation
npm run typecheck
```

### 2. Supabase Project Creation

1. **Create New Project**

   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Choose organization and enter project details
   - Select region closest to your users
   - Set a strong database password

2. **Get Project Credentials**
   - Navigate to Settings > API
   - Copy your Project URL and anon public key
   - These will be used in your environment variables

### 3. Environment Configuration

```bash
# Copy the environment template
cp .env.example .env

# Edit .env file with your credentials
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Important**: Never commit your actual `.env` file to version control!

### 4. Database Schema Setup

#### Option A: SQL Editor (Recommended)

1. Open Supabase Dashboard
2. Go to SQL Editor
3. Copy the entire contents of `supabase-schema.sql`
4. Paste and run the SQL

#### Option B: Using the provided setup page

1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:5173/setup`
3. Follow the guided setup process

### 5. Storage Configuration

The schema automatically creates storage buckets, but verify they exist:

1. Go to Storage in Supabase Dashboard
2. Ensure these buckets exist:

   - `posts` (for user uploads)
   - `avatars` (for profile pictures)
   - `stories` (for story content)

3. Set bucket policies for public access:

```sql
-- Allow public access to view posts
CREATE POLICY "Public access for posts bucket" ON storage.objects
FOR SELECT USING (bucket_id = 'posts');

-- Allow authenticated users to upload
CREATE POLICY "Allow authenticated uploads" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'posts' AND
  auth.role() = 'authenticated'
);
```

### 6. Authentication Configuration

1. **Email Auth Setup**

   - Go to Authentication > Settings
   - Ensure "Enable email confirmations" is **OFF** for development
   - Set "Site URL" to `http://localhost:5173`

2. **Default User Creation**
   - The app includes a default user: `manojkumarsharma511@gmail.com`
   - Password: `Manoj@123`
   - This user is created automatically when the app starts

### 7. Development Server

```bash
# Start the development server
npm run dev

# Open in browser
open http://localhost:5173
```

### 8. Verify Installation

1. **Homepage**: Should load without errors
2. **Login**: Use default credentials to test authentication
3. **Database**: Check if tables are created in Supabase
4. **Storage**: Verify buckets exist and are accessible

## 🔧 Advanced Configuration

### Row Level Security (RLS) Policies

The schema includes comprehensive RLS policies. Key policies include:

```sql
-- Users can view public profiles
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
FOR SELECT USING (NOT is_private OR auth.uid() = id);

-- Users can only edit their own profile
CREATE POLICY "Users can update own profile" ON profiles
FOR UPDATE USING (auth.uid() = id);

-- Users can view posts from followed accounts
CREATE POLICY "Users can view posts from followed accounts" ON posts
FOR SELECT USING (
  user_id = auth.uid() OR
  user_id IN (
    SELECT followed_id FROM follows
    WHERE follower_id = auth.uid()
  )
);
```

### Custom Functions

The schema includes several PostgreSQL functions:

- `create_profile_for_user()`: Automatically creates profiles for new users
- `update_follower_counts()`: Maintains accurate follower statistics
- `handle_post_likes()`: Manages post like interactions

### Real-time Subscriptions

Enable real-time features in your Supabase project:

1. Go to Settings > API
2. Enable Realtime for these tables:
   - `messages`
   - `likes`
   - `comments`
   - `follows`

## 🎨 Customization

### Branding

Update brand colors in `src/index.css`:

```css
:root {
  --primary: 262 83% 58%; /* Purple */
  --secondary: 346 77% 49%; /* Pink */
  --accent: 217 91% 60%; /* Blue */
}
```

### Mock Data

Customize the user base in `src/data/mockData.ts`:

- Add more users to `mockUsers` array
- Modify posts in `mockPosts` array
- Update conversation data

### AI Assistant

Enhance AI responses in `src/lib/aiService.ts`:

- Add new response templates
- Modify conversation starters
- Update context recognition

## 🚀 Production Deployment

### Vercel Deployment

1. **Prepare for Production**

```bash
# Build the project
npm run build

# Test the build
npm run preview
```

2. **Deploy to Vercel**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Add environment variables in Vercel dashboard
```

3. **Supabase Production Setup**
   - Update Site URL in Supabase Auth settings
   - Add production domain to allowed origins
   - Review and tighten RLS policies if needed

### Environment Variables for Production

```bash
VITE_SUPABASE_URL=https://your-production-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-production-anon-key
```

### Performance Optimization

1. **Image Optimization**

   - Use Supabase image transformations
   - Implement lazy loading for posts
   - Add proper alt tags for accessibility

2. **Bundle Optimization**
   - Code splitting is already configured
   - Tree shaking removes unused code
   - Compression is handled by Vercel

## 🛠 Development Tools

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-typescript.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

### Git Hooks

Set up pre-commit hooks for code quality:

```bash
# Install husky
npm install --save-dev husky

# Add pre-commit hook
npx husky add .husky/pre-commit "npm run typecheck && npm run format.fix"
```

## 📊 Monitoring and Analytics

### Supabase Analytics

- Monitor database performance in Supabase Dashboard
- Track API usage and quotas
- Set up alerts for high usage

### Error Tracking

Consider adding error tracking:

```bash
npm install @sentry/react
```

### Performance Monitoring

Use React DevTools and browser performance tools to monitor:

- Component render times
- Memory usage
- Network requests
- Core Web Vitals

## 🆘 Common Issues

### Build Errors

```bash
# TypeScript errors
npm run typecheck

# Module resolution errors
rm -rf node_modules package-lock.json
npm install
```

### Database Connection Issues

```bash
# Test Supabase connection
curl "https://your-project.supabase.co/rest/v1/" \
  -H "apikey: your-anon-key"
```

### Authentication Issues

- Check if RLS policies are too restrictive
- Verify email confirmation settings
- Ensure site URL is configured correctly

### Performance Issues

- Check bundle size: `npm run build -- --analyze`
- Profile React components with DevTools
- Monitor network requests in browser

## 🔄 Updates and Maintenance

### Keeping Dependencies Updated

```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Update major versions carefully
npm install package@latest
```

### Database Migrations

When updating the schema:

1. Create migration files in `migrations/` folder
2. Test migrations on a staging database
3. Apply migrations to production during low-traffic periods

### Backup Strategy

- Supabase automatically backs up your database
- Consider exporting critical data regularly
- Test restore procedures

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [React Query Guide](https://tanstack.com/query/latest)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Best Practices](https://typescript-eslint.io/docs/)

---

**Need help?** Create an issue in the GitHub repository or check the troubleshooting section in the main README.
