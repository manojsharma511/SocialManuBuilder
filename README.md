# SocialManu 📱

A modern, Instagram-style social media application built with React, TypeScript, Tailwind CSS, and Supabase.

![SocialManu](https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=600&fit=crop&crop=center&auto=format&q=80)

## ✨ Features

### 🔐 Authentication

- Email/password login with Supabase Auth
- No email verification required
- Persistent sessions
- Multiple account support

### 👤 User Profiles

- Customizable username, avatar, and bio
- Public/private profile toggle
- Profile statistics (posts, followers, following)

### 🤝 Social Features

- Follow/unfollow system
- Real-time follower counts
- Privacy controls for private accounts

### 📷 Media Sharing

- Photo and video uploads via Supabase Storage
- Caption support
- Feed from followed users
- Like, comment, and share functionality

### 💬 Interactions

- Like/unlike posts with real-time counts
- Comment system
- Bookmark posts
- Share via Web Share API or copy link

### 🔍 Discovery

- Explore page for trending content
- User search functionality
- Public post discovery

### 💬 Messaging (Coming Soon)

- Real-time 1-on-1 chat
- Message history
- Online status

### 🛠 Admin Panel (Coming Soon)

- User management
- Content moderation
- Analytics dashboard
- App-wide controls

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- Supabase account

### 1. Clone & Install

```bash
git clone <your-repo>
cd socialmanu
npm install
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your credentials
3. Copy `.env.example` to `.env` and add your credentials:

```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Database Schema

1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase-schema.sql`
4. Run the SQL to create all tables and policies

### 4. Storage Setup

The schema automatically creates a 'posts' storage bucket. Verify it exists in Storage > Settings.

### 5. Run the Application

```bash
npm run dev
```

Visit `http://localhost:5173` to see your app!

## 🏗 Project Structure

```
src/
├── components/
���   ├── ui/                 # Shadcn/ui components
│   ├── AppLayout.tsx       # Main app layout
│   ├── AppHeader.tsx       # Top navigation
│   ├── MobileNav.tsx       # Bottom navigation
│   ├── PostCard.tsx        # Social media post component
│   └── ProtectedRoute.tsx  # Auth guard
├── hooks/
│   ├── use-auth.tsx        # Authentication context
│   ├── use-mobile.tsx      # Mobile detection
│   └── use-toast.ts        # Toast notifications
├── lib/
│   ├── supabase.ts         # Supabase client & types
│   └── utils.ts            # Utility functions
├── pages/
│   ├── Login.tsx           # Login page
│   ├── Register.tsx        # Registration page
│   ├── Home.tsx            # Main feed
│   ├── Profile.tsx         # User profile
│   ├── Explore.tsx         # Discovery page
│   ├── Create.tsx          # Post creation
│   ├── Messages.tsx        # Chat interface
│   └── Activity.tsx        # Notifications
└── App.tsx                 # Main app component
```

## 🎨 Design System

### Colors

- **Primary**: Purple to Pink gradient (`#9333ea` to `#e91e63`)
- **Background**: Pure white/black for light/dark modes
- **Text**: High contrast for accessibility
- **Borders**: Subtle grays matching Instagram's aesthetic

### Typography

- **Headers**: Bold, gradient text for branding
- **Body**: Clean, readable sans-serif
- **Captions**: Muted colors for secondary text

### Components

- **Cards**: Clean borders, subtle shadows
- **Buttons**: Gradient primary, outline secondary
- **Navigation**: Icon-based, mobile-first
- **Forms**: Modern inputs with focus states

## 🗄 Database Schema

### Core Tables

- `profiles` - User profile information
- `posts` - Media posts with captions
- `follows` - User follow relationships
- `likes` - Post like interactions
- `comments` - Post comments
- `messages` - Direct messages
- `bookmarks` - Saved posts
- `views` - Post view analytics
- `admin_users` - Admin access control

### Security

- Row Level Security (RLS) enabled on all tables
- User can only access their own data
- Public data (profiles, posts) readable by all
- Admin-only access for sensitive operations

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run test         # Run tests
npm run typecheck    # TypeScript validation
npm run format.fix   # Format code with Prettier
```

### Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Shadcn/ui
- **Backend**: Supabase (Database, Auth, Storage, Realtime)
- **State**: React Query for server state
- **Routing**: React Router 6
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy with zero configuration

### Environment Variables for Production

```bash
VITE_SUPABASE_URL=your-production-supabase-url
VITE_SUPABASE_ANON_KEY=your-production-anon-key
```

### Supabase Production Setup

1. Ensure your database is properly configured
2. Set up proper RLS policies
3. Configure storage bucket policies
4. Set up any necessary triggers

## 📱 Features Roadmap

### Phase 1 (Current)

- ✅ Authentication system
- ✅ Basic post creation and viewing
- ✅ Profile management
- ✅ Follow system
- ✅ Like/bookmark functionality

### Phase 2 (Next)

- 🔄 Real-time messaging
- 🔄 Advanced post creation (filters, multiple images)
- 🔄 Comment system with replies
- 🔄 Search and explore functionality
- 🔄 Push notifications

### Phase 3 (Future)

- 📋 Stories/Reels support
- 📋 Advanced analytics
- 📋 Content reporting system
- 📋 Advanced admin panel
- 📋 API for third-party integrations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Verify your Supabase configuration
3. Ensure all environment variables are set correctly
4. Check the browser console for error messages

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) for the amazing backend-as-a-service
- [Shadcn/ui](https://ui.shadcn.com) for the beautiful component library
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [Lucide](https://lucide.dev) for the consistent icon set

---

Built with ❤️ by the SocialManu team
