# SocialManu 📱

A comprehensive Instagram-style social media application featuring AI-powered chat assistance, built with React 18, TypeScript, Tailwind CSS, and Supabase.

![SocialManu](https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=600&fit=crop&crop=center&auto=format&q=80)

## ✨ Key Features

### 🤖 AI-Powered Social Media Assistant

- **Smart AI Chat Bot**: Get personalized advice for content creation, growth strategies, and social media optimization
- **Content Ideas**: AI suggests post ideas, captions, and trending topics
- **Hashtag Recommendations**: Contextual hashtag suggestions for better reach
- **Growth Analytics**: Professional tips for increasing followers and engagement
- **24/7 Availability**: Always-on AI assistant for instant help

### 💬 Enhanced Messaging System

- **Dual Chat Interface**: Seamlessly switch between AI assistant and friend conversations
- **Rich Messaging**: Message reactions, typing indicators, read receipts
- **Smart Organization**: Separate tabs for AI, friends, and all conversations
- **Real-time Features**: Live typing indicators and message status
- **Quick Replies**: Context-aware quick response suggestions

### 🔐 Complete Authentication System

- **Supabase Authentication**: Secure email/password login
- **Default User Access**: Quick login with `manojkumarsharma511@gmail.com` / `Manoj@123`
- **Persistent Sessions**: Stay logged in across browser sessions
- **Profile Management**: Customizable usernames, avatars, and bios

### 📱 Instagram-Style Features

- **Stories & Posts**: Share photos, videos with captions and location tags
- **Reels**: Full-screen vertical video experience like TikTok/Instagram
- **Explore Page**: Discover trending content and suggested users
- **Social Interactions**: Like, comment, share, bookmark posts
- **Follow System**: Build your network with follower/following relationships

### 🎨 Modern UI/UX

- **Mobile-First Design**: Optimized for all screen sizes
- **Dark/Light Mode**: Automatic theme switching
- **Instagram-Inspired**: Familiar purple-to-pink gradient branding
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Layout**: Works perfectly on desktop and mobile

## 🚀 Quick Start Guide

### Prerequisites

- **Node.js** 18 or higher
- **npm/yarn/pnpm** package manager
- **Supabase Account** (free tier available)

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/yourusername/socialmanu.git
cd socialmanu

# Install dependencies
npm install
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your Supabase credentials
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Supabase Database Setup

1. **Create a Supabase Project**: Go to [supabase.com](https://supabase.com) and create a new project
2. **Get Your Credentials**: Go to Settings > API to find your URL and anon key
3. **Run Database Schema**:
   - Open Supabase SQL Editor
   - Copy and paste the contents of `supabase-schema.sql`
   - Execute the SQL to create all tables and policies

### 4. Launch the Application

```bash
# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### 5. Default Login Credentials

For immediate access, use these default credentials:

- **Email**: `manojkumarsharma511@gmail.com`
- **Password**: `Manoj@123`

## 🏗 Project Architecture

```
src/
├── components/
│   ├── ui/                    # Shadcn/ui component library
│   ├── AppLayout.tsx          # Main application wrapper
│   ├── AppHeader.tsx          # Top navigation header
│   ├── MobileNav.tsx          # Bottom mobile navigation
│   ├── PostCard.tsx           # Instagram-style post component
│   ├── ChatInterface.tsx      # Enhanced chat interface
│   └── ProtectedRoute.tsx     # Authentication guard
├── data/
│   └── mockData.ts            # 50+ realistic users and content
├── hooks/
│   ├── use-auth.tsx           # Authentication context & state
│   ├── use-mobile.tsx         # Mobile device detection
│   └── use-toast.ts           # Toast notification system
├── lib/
│   ├── supabase.ts            # Supabase client configuration
│   ├── aiService.ts           # AI chat service implementation
│   └── utils.ts               # Utility functions
├── pages/
│   ├── Login.tsx              # Authentication page
│   ├── Register.tsx           # User registration
│   ├── HomeInstagram.tsx      # Main feed with stories
│   ├── ProfileInstagram.tsx   # User profile page
│   ├── ExploreInstagram.tsx   # Content discovery
│   ├── Reels.tsx             # Vertical video feed
│   ├── MessagesInstagram.tsx  # Enhanced messaging system
│   ├── Activity.tsx          # Notifications center
│   └── EmergencyRegister.tsx  # Backup registration
└── App.tsx                    # Main routing and providers
```

## 🤖 AI Assistant Features

### Conversation Topics

- **Content Creation**: "Give me post ideas for my feed"
- **Growth Strategy**: "How can I grow my followers?"
- **Hashtag Optimization**: "Suggest hashtags for my content"
- **Analytics Insights**: "Analyze my posting strategy"
- **Caption Writing**: "Help me write a caption"
- **Trend Analysis**: "Latest social media trends"
- **Collaboration**: "Find collaboration opportunities"

### Smart Responses

The AI assistant provides contextual advice for:

- Post ideas based on trending topics
- Hashtag strategies for better reach
- Content optimization tips
- Engagement growth techniques
- Platform-specific best practices
- Audience building strategies

## 📊 Mock Data System

### Realistic Content

- **50+ Diverse Users**: Complete profiles with realistic avatars and bios
- **100+ Posts**: High-quality images with engaging captions
- **30 Reels**: Video content with trending audio
- **20 Stories**: Time-sensitive content from users
- **Social Network**: Realistic follower/following relationships

### Engagement Simulation

- Dynamic like counts and comments
- Verified user badges for popular accounts
- Realistic posting timestamps
- Geographic location tags
- Authentic user interactions

## 🎨 Design System

### Color Palette

```css
/* Primary Gradient */
--gradient-primary: linear-gradient(135deg, #9333ea 0%, #e91e63 100%);

/* Theme Colors */
--purple-500: #9333ea;
--pink-500: #e91e63;
--blue-500: #3b82f6;
--green-500: #10b981;

/* Neutral Palette */
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-800: #1f2937;
--gray-900: #111827;
```

### Typography

- **Primary Font**: Inter (clean, modern sans-serif)
- **Headers**: Bold weights with gradient text effects
- **Body Text**: Regular weight with high contrast
- **Captions**: Lighter weights with muted colors

### Component Patterns

- **Cards**: Subtle borders with hover elevation
- **Buttons**: Gradient primary, outline secondary styles
- **Inputs**: Modern focus states with smooth transitions
- **Navigation**: Icon-first design with clear labels

## 🗄 Database Schema

### Core Tables

#### Users & Authentication

```sql
profiles            -- User profile information
admin_users         -- Admin access control
```

#### Social Features

```sql
posts              -- Media posts with captions
follows            -- User follow relationships
likes              -- Post like interactions
comments           -- Post comments with replies
bookmarks          -- Saved posts
views              -- Post view analytics
```

#### Messaging System

```sql
messages           -- Direct messages between users
conversations      -- Chat metadata and participants
```

### Security Features

- **Row Level Security (RLS)**: Enabled on all sensitive tables
- **User Isolation**: Users can only access their own private data
- **Public Data**: Profiles and posts readable by authenticated users
- **Admin Controls**: Special permissions for content moderation

### Storage Buckets

- **posts**: User-uploaded images and videos
- **avatars**: Profile pictures
- **stories**: Temporary story content

## 🛠 Development Guide

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run test         # Run test suite
npm run typecheck    # TypeScript validation
npm run format.fix   # Format code with Prettier
```

### Tech Stack

**Frontend Framework**

- React 18 with TypeScript
- Vite for build tooling
- React Router for navigation

**Styling & UI**

- Tailwind CSS for utility-first styling
- Shadcn/ui for component library
- Framer Motion for animations
- Lucide React for icons

**Backend Services**

- Supabase for database and authentication
- Supabase Storage for media files
- Supabase Realtime for live features

**State Management**

- React Query for server state
- React Context for global state
- React Hook Form for form handling

## 🚀 Deployment Guide

### Vercel Deployment (Recommended)

1. **Connect Repository**

   ```bash
   # Push your code to GitHub
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy automatically

3. **Environment Variables**
   ```bash
   VITE_SUPABASE_URL=your-production-url
   VITE_SUPABASE_ANON_KEY=your-production-key
   ```

### Alternative Deployment Options

- **Netlify**: Similar to Vercel with automatic deployments
- **Railway**: Full-stack deployment with database hosting
- **Heroku**: Traditional PaaS with build packs

## 📱 Features Comparison

| Feature               | Status      | Description                      |
| --------------------- | ----------- | -------------------------------- |
| 🔐 Authentication     | ✅ Complete | Email/password with Supabase     |
| 👤 User Profiles      | ✅ Complete | Customizable profiles with stats |
| 📷 Photo/Video Posts  | ✅ Complete | Full media sharing with captions |
| 🤝 Social Features    | ✅ Complete | Follow, like, comment, share     |
| 📱 Stories & Reels    | ✅ Complete | Instagram-style content formats  |
| 💬 Enhanced Messaging | ✅ Complete | Rich chat with AI assistant      |
| 🤖 AI Assistant       | ✅ Complete | Smart social media guidance      |
| 🔍 Explore & Search   | ✅ Complete | Content discovery features       |
| 📊 Analytics          | 🔄 Planned  | Advanced insights and metrics    |
| 🛡️ Content Moderation | 🔄 Planned  | Automated content filtering      |
| 🔔 Push Notifications | 🔄 Planned  | Real-time mobile notifications   |

## 🎯 User Personas

### Content Creators

- Use AI assistant for content ideas and optimization
- Share high-quality posts with strategic hashtags
- Build authentic audience through consistent posting

### Social Media Managers

- Leverage AI for client strategy recommendations
- Monitor trends and engagement analytics
- Manage multiple accounts and campaigns

### Casual Users

- Connect with friends through enhanced messaging
- Discover interesting content via explore page
- Share personal moments with stories and posts

### Business Accounts

- Get professional advice from AI assistant
- Track performance metrics and growth
- Engage with customers through direct messaging

## 🤝 Contributing

We welcome contributions from the community! Here's how to get started:

### Development Setup

```bash
# Fork and clone the repository
git clone https://github.com/yourusername/socialmanu.git
cd socialmanu

# Create a feature branch
git checkout -b feature/amazing-feature

# Make your changes and commit
git commit -m "Add amazing feature"

# Push and create a pull request
git push origin feature/amazing-feature
```

### Contribution Guidelines

- Follow TypeScript best practices
- Maintain existing code style with Prettier
- Add tests for new features
- Update documentation as needed
- Ensure all builds pass before submitting

## 🆘 Troubleshooting

### Common Issues

**Build Errors**

```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript compilation
npm run typecheck
```

**Supabase Connection Issues**

```bash
# Verify environment variables
echo $VITE_SUPABASE_URL
echo $VITE_SUPABASE_ANON_KEY

# Check Supabase project status
# Visit your Supabase dashboard
```

**Authentication Problems**

- Ensure RLS policies are properly configured
- Check that user profiles are created automatically
- Verify email domain restrictions in Supabase Auth

### Support Channels

- **GitHub Issues**: Report bugs and feature requests
- **Documentation**: Check inline code comments
- **Community**: Join our Discord server (link in repo)

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

### Open Source Libraries

- [Supabase](https://supabase.com) - Backend-as-a-Service platform
- [Shadcn/ui](https://ui.shadcn.com) - Beautiful React components
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [Framer Motion](https://framer.com/motion) - Animation library
- [Lucide](https://lucide.dev) - Icon library
- [React Query](https://tanstack.com/query) - Data fetching library

### Design Inspiration

- Instagram's mobile interface design
- TikTok's vertical video experience
- Twitter's engagement patterns
- Discord's messaging system

### Community

- Contributors and beta testers
- Design feedback from the community
- Open source maintainers

---

## 🚀 Getting Started Now

1. **Clone this repository**
2. **Set up your Supabase project**
3. **Configure environment variables**
4. **Run the development server**
5. **Start building your social media presence!**

Built with ❤️ for the future of social media

---

**Ready to revolutionize social media?** [Get Started →](https://socialmanu.vercel.app)
