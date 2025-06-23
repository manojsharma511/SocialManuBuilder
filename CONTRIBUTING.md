# Contributing to SocialManu 🤝

Thank you for your interest in contributing to SocialManu! This guide will help you get started with contributing to our Instagram-style social media platform.

## 🌟 How to Contribute

### Reporting Issues

- Use GitHub Issues to report bugs
- Include detailed steps to reproduce
- Provide screenshots for UI issues
- Check existing issues before creating new ones

### Suggesting Features

- Open a feature request issue
- Describe the problem you're solving
- Explain your proposed solution
- Consider the impact on existing users

### Code Contributions

- Fork the repository
- Create a feature branch
- Make your changes
- Submit a pull request

## 🚀 Getting Started

### Development Setup

1. **Fork and Clone**

```bash
git clone https://github.com/yourusername/socialmanu.git
cd socialmanu
npm install
```

2. **Environment Setup**

```bash
cp .env.example .env
# Add your Supabase credentials
```

3. **Start Development Server**

```bash
npm run dev
```

### Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Route components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and services
├── data/               # Mock data and types
└── styles/             # Global styles
```

## 🎯 Development Guidelines

### Code Style

We use TypeScript, Prettier, and ESLint to maintain code quality:

```bash
# Format code
npm run format.fix

# Type checking
npm run typecheck

# Run tests
npm run test
```

### Component Guidelines

1. **Functional Components**

```typescript
// Use functional components with hooks
const MyComponent: React.FC<Props> = ({ prop1, prop2 }) => {
  const [state, setState] = useState();

  return <div>{/* component JSX */}</div>;
};
```

2. **TypeScript Types**

```typescript
// Define clear interfaces
interface UserProfile {
  id: string;
  username: string;
  avatar?: string;
}
```

3. **Component Structure**

```typescript
// Import order: React, libraries, local
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
```

### Styling Guidelines

1. **Tailwind CSS**

```tsx
// Use Tailwind utility classes
<div className="flex items-center gap-4 p-4 rounded-lg bg-white shadow-sm">
```

2. **Responsive Design**

```tsx
// Mobile-first approach
<div className="text-sm md:text-base lg:text-lg">
```

3. **Dark Mode Support**

```tsx
// Include dark mode variants
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
```

### State Management

1. **Local State**

```typescript
// Use useState for component state
const [isLoading, setIsLoading] = useState(false);
```

2. **Global State**

```typescript
// Use Context for global state
const { user, signOut } = useAuth();
```

3. **Server State**

```typescript
// Use React Query for server state
const { data, isLoading, error } = useQuery({
  queryKey: ["posts"],
  queryFn: fetchPosts,
});
```

## 🎨 Design Guidelines

### UI Components

1. **Use Shadcn/ui Components**

```typescript
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
```

2. **Instagram-Inspired Design**

- Purple to pink gradient branding
- Clean, minimal interface
- Mobile-first responsive design

3. **Accessibility**

```tsx
// Include proper ARIA labels
<button aria-label="Like post" onClick={handleLike}>
  <Heart className="w-5 h-5" />
</button>
```

### Color Palette

```css
/* Use design system colors */
--primary: #9333ea; /* Purple */
--secondary: #e91e63; /* Pink */
--accent: #3b82f6; /* Blue */
--success: #10b981; /* Green */
--warning: #f59e0b; /* Yellow */
--error: #ef4444; /* Red */
```

## 🔧 Feature Development

### Adding New Features

1. **Create Feature Branch**

```bash
git checkout -b feature/user-stories
```

2. **Follow Component Structure**

```
src/
├── components/
│   └── UserStories/
│       ├── StoryCard.tsx
│       ├── StoryViewer.tsx
│       └── index.ts
├── hooks/
│   └── use-stories.tsx
└── pages/
    └── Stories.tsx
```

3. **Add Tests**

```typescript
// Create component tests
describe("StoryCard", () => {
  it("renders story information", () => {
    // Test implementation
  });
});
```

### Database Changes

1. **Schema Migrations**

```sql
-- Create migration file
-- migrations/add_stories_table.sql
CREATE TABLE stories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  -- other fields
);
```

2. **Update Types**

```typescript
// lib/database.types.ts
export interface Story {
  id: string;
  user_id: string;
  created_at: string;
}
```

### AI Assistant Enhancements

1. **Add New Response Templates**

```typescript
// lib/aiService.ts
private responseTemplates = {
  stories: [
    "Here are some story ideas that engage your audience...",
    "Try these story formats for better engagement..."
  ]
};
```

2. **Context Recognition**

```typescript
// Add new context detection
if (message.includes("story") || message.includes("stories")) {
  return this.getRandomResponse("stories");
}
```

## 🧪 Testing

### Component Testing

```typescript
// Use React Testing Library
import { render, screen } from '@testing-library/react';
import { PostCard } from './PostCard';

test('displays post content', () => {
  render(<PostCard post={mockPost} />);
  expect(screen.getByText(mockPost.caption)).toBeInTheDocument();
});
```

### Integration Testing

```typescript
// Test user flows
test("user can create and view post", async () => {
  // Test implementation
});
```

### Manual Testing Checklist

- [ ] Mobile responsiveness
- [ ] Dark/light mode switching
- [ ] Authentication flow
- [ ] Post creation and viewing
- [ ] Social interactions (like, comment)
- [ ] AI chat functionality

## 📝 Pull Request Process

### Before Submitting

1. **Code Quality**

```bash
npm run typecheck    # TypeScript validation
npm run test        # Run tests
npm run format.fix  # Format code
```

2. **Manual Testing**

- Test your changes locally
- Verify mobile responsiveness
- Check both light and dark modes

### PR Description Template

```markdown
## What this PR does

Brief description of changes

## Type of change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Tested locally
- [ ] Added/updated tests
- [ ] Verified mobile responsive
- [ ] Checked accessibility

## Screenshots

Include screenshots for UI changes

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Tests pass
- [ ] Documentation updated
```

### Review Process

1. **Automated Checks**

   - TypeScript compilation
   - Test execution
   - Code formatting

2. **Manual Review**

   - Code quality and style
   - Feature functionality
   - Design consistency

3. **Approval and Merge**
   - Requires one approval
   - All checks must pass
   - Squash and merge preferred

## 🏷️ Release Process

### Version Numbering

We follow [Semantic Versioning](https://semver.org/):

- **Major** (1.0.0): Breaking changes
- **Minor** (0.1.0): New features
- **Patch** (0.0.1): Bug fixes

### Release Checklist

- [ ] Update version in package.json
- [ ] Update CHANGELOG.md
- [ ] Create release notes
- [ ] Tag release in Git
- [ ] Deploy to production

## 🎖️ Recognition

### Contributors

All contributors are recognized in:

- README.md contributors section
- Release notes
- Annual contributor highlights

### Types of Contributions

- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation
- 🎨 Design improvements
- 🧪 Testing
- 🔧 Infrastructure
- 💡 Ideas and suggestions

## 📞 Getting Help

### Community Support

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and ideas
- **Discord**: Real-time community chat (coming soon)

### Development Questions

- Check existing documentation
- Search closed issues
- Ask in GitHub Discussions
- Join our community chat

## 🙏 Thank You

Every contribution, no matter how small, helps make SocialManu better for everyone. We appreciate your time and effort in improving this project!

---

**Ready to contribute?** Check out our [good first issues](https://github.com/socialmanu/socialmanu/labels/good%20first%20issue) to get started!
