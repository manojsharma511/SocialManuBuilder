import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Settings,
  Grid,
  Bookmark,
  Heart,
  MessageCircle,
  UserPlus,
  Users,
  Camera,
  Play,
  MoreHorizontal,
  Share,
  LogOut,
} from "lucide-react";
import {
  allPosts,
  allUsers,
  mockFollowing,
  mockFollowers,
} from "@/data/mockData";
import { cn } from "@/lib/utils";

function StatsGrid({ user }: { user: any }) {
  return (
    <div className="grid grid-cols-3 gap-4 py-4">
      <div className="text-center">
        <div className="font-bold text-lg">{user.posts}</div>
        <div className="text-sm text-muted-foreground">Posts</div>
      </div>
      <div className="text-center">
        <div className="font-bold text-lg">
          {user.followers.toLocaleString()}
        </div>
        <div className="text-sm text-muted-foreground">Followers</div>
      </div>
      <div className="text-center">
        <div className="font-bold text-lg">{user.following}</div>
        <div className="text-sm text-muted-foreground">Following</div>
      </div>
    </div>
  );
}

function PostsGrid({ posts }: { posts: any[] }) {
  return (
    <div className="grid grid-cols-3 gap-1">
      {posts.map((post, index) => (
        <div key={post.id} className="relative aspect-square">
          <img
            src={post.mediaUrl}
            alt={post.caption}
            className="w-full h-full object-cover"
          />

          {/* Video indicator */}
          {post.mediaType === "video" && (
            <div className="absolute top-2 right-2">
              <Play size={16} className="text-white drop-shadow-lg" />
            </div>
          )}

          {/* Multiple photos indicator */}
          {index % 7 === 0 && (
            <div className="absolute top-2 right-2">
              <div className="w-6 h-6 bg-black/50 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">⋯</span>
              </div>
            </div>
          )}

          {/* Hover overlay with stats */}
          <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
            <div className="flex items-center gap-6 text-white">
              <div className="flex items-center gap-1">
                <Heart size={20} className="fill-white" />
                <span className="font-semibold">
                  {post.likes > 1000
                    ? `${(post.likes / 1000).toFixed(1)}K`
                    : post.likes}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle size={20} className="fill-white" />
                <span className="font-semibold">{post.comments}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function HighlightsRow() {
  const highlights = [
    {
      id: 1,
      title: "Travel",
      image:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=100&h=100&fit=crop&auto=format",
    },
    {
      id: 2,
      title: "Food",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop&auto=format",
    },
    {
      id: 3,
      title: "Work",
      image:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=100&h=100&fit=crop&auto=format",
    },
    {
      id: 4,
      title: "Friends",
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&fit=crop&auto=format",
    },
    {
      id: 5,
      title: "Fitness",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&auto=format",
    },
  ];

  return (
    <div className="px-4 py-2">
      <div className="flex gap-4 overflow-x-auto pb-2">
        {highlights.map((highlight) => (
          <div
            key={highlight.id}
            className="flex flex-col items-center min-w-0"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-0.5">
              <img
                src={highlight.image}
                alt={highlight.title}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <span className="text-xs mt-1 text-center truncate w-16">
              {highlight.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FollowersModal({
  isOpen,
  onClose,
  users,
  title,
}: {
  isOpen: boolean;
  onClose: () => void;
  users: any[];
  title: string;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-96 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">{title}</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </div>
        <div className="overflow-y-auto max-h-80">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 border-b last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1">
                    <p className="font-semibold text-sm">{user.username}</p>
                    {user.isVerified && (
                      <Badge
                        variant="secondary"
                        className="w-3 h-3 p-0 bg-blue-500"
                      >
                        ✓
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{user.name}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                {title === "Following" ? "Following" : "Follow"}
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default function ProfileInstagram() {
  const [activeTab, setActiveTab] = useState("posts");
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  // Default user data
  const currentUser = {
    id: "default-user",
    username: "manojkumarsharma511",
    name: "Manoj Kumar Sharma",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format",
    bio: "📱 App Developer | 🎯 Tech Enthusiast | 🌟 Creator\n💻 Building amazing experiences\n🌍 Mumbai, India",
    followers: 1250,
    following: 350,
    posts: 45,
    isVerified: true,
    isPrivate: false,
    website: "https://socialmanu.com",
  };

  // Get user's posts
  const userPosts = allPosts
    .filter((post) => post.userId === "default-user" || Math.random() > 0.6)
    .slice(0, 20);

  const bookmarkedPosts = allPosts
    .filter(() => Math.random() > 0.8)
    .slice(0, 12);

  const followerUsers = allUsers.filter((user) =>
    mockFollowers.includes(user.id),
  );

  const followingUsers = allUsers.filter((user) =>
    mockFollowing.includes(user.id),
  );

  const handleSignOut = () => {
    localStorage.removeItem("defaultUser");
    window.location.href = "/login";
  };

  return (
    <AppLayout>
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">{currentUser.username}</h1>
            {currentUser.isVerified && (
              <Badge variant="secondary" className="w-5 h-5 p-0 bg-blue-500">
                ✓
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Share size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings size={20} />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleSignOut}>
              <LogOut size={20} />
            </Button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="p-4">
          <div className="flex items-start gap-4 mb-4">
            <Avatar className="w-20 h-20 ring-2 ring-gradient-to-r from-purple-500 to-pink-500">
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback className="text-2xl">
                {currentUser.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="font-semibold text-lg">{currentUser.name}</h2>
              </div>

              <div className="flex gap-4 text-sm mb-2">
                <button
                  onClick={() => setShowFollowers(true)}
                  className="hover:underline"
                >
                  <span className="font-semibold">
                    {currentUser.followers.toLocaleString()}
                  </span>{" "}
                  followers
                </button>
                <button
                  onClick={() => setShowFollowing(true)}
                  className="hover:underline"
                >
                  <span className="font-semibold">{currentUser.following}</span>{" "}
                  following
                </button>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Edit Profile
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Share Profile
                </Button>
                <Button variant="outline" size="icon">
                  <UserPlus size={16} />
                </Button>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-1 mb-4">
            <p className="text-sm whitespace-pre-line">{currentUser.bio}</p>
            {currentUser.website && (
              <a
                href={currentUser.website}
                className="text-sm text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {currentUser.website}
              </a>
            )}
          </div>

          {/* Stats */}
          <StatsGrid user={currentUser} />
        </div>

        {/* Highlights */}
        <HighlightsRow />

        {/* Tabs */}
        <div className="border-t border-gray-100 dark:border-gray-800">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 rounded-none border-0 bg-transparent h-12">
              <TabsTrigger
                value="posts"
                className="data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:bg-transparent rounded-none"
              >
                <Grid size={16} className="mr-1" />
                Posts
              </TabsTrigger>
              <TabsTrigger
                value="saved"
                className="data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:bg-transparent rounded-none"
              >
                <Bookmark size={16} className="mr-1" />
                Saved
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="mt-0">
              {userPosts.length > 0 ? (
                <PostsGrid posts={userPosts} />
              ) : (
                <div className="text-center py-12">
                  <Camera
                    size={48}
                    className="mx-auto mb-4 text-muted-foreground"
                  />
                  <h3 className="text-lg font-semibold mb-2">Share Photos</h3>
                  <p className="text-muted-foreground mb-4">
                    When you share photos, they will appear on your profile.
                  </p>
                  <Button>Share your first photo</Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="saved" className="mt-0">
              {bookmarkedPosts.length > 0 ? (
                <PostsGrid posts={bookmarkedPosts} />
              ) : (
                <div className="text-center py-12">
                  <Bookmark
                    size={48}
                    className="mx-auto mb-4 text-muted-foreground"
                  />
                  <h3 className="text-lg font-semibold mb-2">Save Posts</h3>
                  <p className="text-muted-foreground">
                    Save posts you want to see again. No one is notified, and
                    only you can see what you've saved.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Modals */}
        <FollowersModal
          isOpen={showFollowers}
          onClose={() => setShowFollowers(false)}
          users={followerUsers}
          title="Followers"
        />

        <FollowersModal
          isOpen={showFollowing}
          onClose={() => setShowFollowing(false)}
          users={followingUsers}
          title="Following"
        />
      </div>
    </AppLayout>
  );
}
