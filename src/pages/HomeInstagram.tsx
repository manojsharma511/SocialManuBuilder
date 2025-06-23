import { useState, useEffect } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  Play,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  allUsers,
  allPosts,
  mockStories,
  mockReels,
  mockFollowing,
} from "@/data/mockData";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: any;
  onLike: (postId: string) => void;
  onBookmark: (postId: string) => void;
}

function PostCard({ post, onLike, onBookmark }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    onLike(post.id);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark(post.id);
  };

  return (
    <Card className="border-0 border-b border-gray-100 dark:border-gray-800 rounded-none">
      <CardContent className="p-0">
        {/* Header */}
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8 ring-2 ring-gradient-to-r from-purple-500 to-pink-500">
              <AvatarImage src={post.user?.avatar} />
              <AvatarFallback>
                {post.user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1">
                <p className="font-semibold text-sm">{post.user?.username}</p>
                {post.user?.isVerified && (
                  <Badge
                    variant="secondary"
                    className="w-4 h-4 p-0 bg-blue-500"
                  >
                    ✓
                  </Badge>
                )}
              </div>
              {post.location && (
                <p className="text-xs text-muted-foreground">{post.location}</p>
              )}
            </div>
          </div>
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <MoreHorizontal size={16} />
          </Button>
        </div>

        {/* Media */}
        <div className="relative">
          {post.mediaType === "video" ? (
            <div className="relative">
              <video
                src={post.mediaUrl}
                className="w-full aspect-square object-cover"
                controls
                playsInline
              />
              <div className="absolute top-2 right-2">
                <Badge className="bg-black/50 text-white">
                  <Play size={12} className="mr-1" />
                  Video
                </Badge>
              </div>
            </div>
          ) : (
            <img
              src={post.mediaUrl}
              alt={post.caption}
              className="w-full aspect-square object-cover"
              loading="lazy"
            />
          )}
        </div>

        {/* Actions */}
        <div className="p-3 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8"
                onClick={handleLike}
              >
                <Heart
                  size={20}
                  className={cn(
                    "transition-colors",
                    isLiked && "fill-red-500 text-red-500",
                  )}
                />
              </Button>
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <MessageCircle size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <Send size={20} />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8"
              onClick={handleBookmark}
            >
              <Bookmark
                size={20}
                className={cn(
                  "transition-colors",
                  isBookmarked && "fill-current",
                )}
              />
            </Button>
          </div>

          {/* Likes */}
          <p className="font-semibold text-sm">
            {likesCount.toLocaleString()} likes
          </p>

          {/* Caption */}
          <div className="space-y-1">
            <p className="text-sm">
              <span className="font-semibold">{post.user?.username}</span>{" "}
              {post.caption}
            </p>
          </div>

          {/* Comments */}
          {post.comments > 0 && (
            <button className="text-sm text-muted-foreground">
              View all {post.comments} comments
            </button>
          )}

          {/* Timestamp */}
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            {post.timestamp}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function StoriesRow({ stories }: { stories: any[] }) {
  return (
    <div className="p-4 border-b border-gray-100 dark:border-gray-800">
      <ScrollArea>
        <div className="flex gap-4 pb-2">
          {/* Your Story */}
          <div className="flex flex-col items-center gap-1 min-w-0">
            <div className="relative">
              <Avatar className="w-16 h-16 ring-2 ring-gray-300">
                <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format" />
                <AvatarFallback>M</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white text-xs font-bold">+</span>
              </div>
            </div>
            <span className="text-xs text-center truncate w-16">
              Your story
            </span>
          </div>

          {/* Other Stories */}
          {stories.map((story) => (
            <div
              key={story.id}
              className="flex flex-col items-center gap-1 min-w-0"
            >
              <Avatar
                className={cn(
                  "w-16 h-16 ring-2",
                  story.isViewed
                    ? "ring-gray-300"
                    : "ring-gradient-to-r from-purple-500 to-pink-500",
                )}
              >
                <AvatarImage src={story.user.avatar} />
                <AvatarFallback>
                  {story.user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-center truncate w-16">
                {story.user.username}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export default function HomeInstagram() {
  const [posts, setPosts] = useState(allPosts.slice(0, 20));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Get feed posts from followed users + recommended
  const feedPosts = posts.filter(
    (post) => mockFollowing.includes(post.userId) || Math.random() > 0.7,
  );

  const handleLike = (postId: string) => {
    console.log("Liked post:", postId);
  };

  const handleBookmark = (postId: string) => {
    console.log("Bookmarked post:", postId);
  };

  const loadMorePosts = () => {
    if (loading || !hasMore) return;
    setLoading(true);

    // Simulate loading more posts
    setTimeout(() => {
      const currentLength = posts.length;
      const newPosts = allPosts.slice(currentLength, currentLength + 10);
      setPosts([...posts, ...newPosts]);
      setLoading(false);

      if (currentLength + 10 >= allPosts.length) {
        setHasMore(false);
      }
    }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        loadMorePosts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <AppLayout>
      <div className="max-w-md mx-auto bg-white dark:bg-black min-h-screen">
        {/* Stories Section */}
        <StoriesRow stories={mockStories} />

        {/* Posts Feed */}
        <div className="space-y-0">
          {feedPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={handleLike}
              onBookmark={handleBookmark}
            />
          ))}
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="p-6 text-center">
            <div className="animate-spin h-8 w-8 border-b-2 border-purple-600 rounded-full mx-auto"></div>
            <p className="text-sm text-muted-foreground mt-2">
              Loading more posts...
            </p>
          </div>
        )}

        {/* End of feed */}
        {!hasMore && (
          <div className="p-6 text-center">
            <p className="text-sm text-muted-foreground">
              You're all caught up!
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Follow more accounts to see more posts in your feed.
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
