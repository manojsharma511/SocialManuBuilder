import { useState, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Post, supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: Post & {
    profiles: {
      username: string;
      avatar_url?: string;
    };
    likes_count?: number;
    comments_count?: number;
    is_liked?: boolean;
    is_bookmarked?: boolean;
  };
}

export function PostCard({ post }: PostCardProps) {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(post.is_liked || false);
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);
  const [isBookmarked, setIsBookmarked] = useState(post.is_bookmarked || false);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (!user || loading) return;
    setLoading(true);

    try {
      if (isLiked) {
        await supabase
          .from("likes")
          .delete()
          .eq("user_id", user.id)
          .eq("post_id", post.id);
        setIsLiked(false);
        setLikesCount((prev) => prev - 1);
      } else {
        await supabase
          .from("likes")
          .insert({ user_id: user.id, post_id: post.id });
        setIsLiked(true);
        setLikesCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }

    setLoading(false);
  };

  const handleBookmark = async () => {
    if (!user || loading) return;
    setLoading(true);

    try {
      if (isBookmarked) {
        await supabase
          .from("bookmarks")
          .delete()
          .eq("user_id", user.id)
          .eq("post_id", post.id);
        setIsBookmarked(false);
      } else {
        await supabase
          .from("bookmarks")
          .insert({ user_id: user.id, post_id: post.id });
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }

    setLoading(false);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check out this post by @${post.profiles.username}`,
          text: post.caption || "Check out this post on SocialManu!",
          url: window.location.origin + `/post/${post.id}`,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(
        window.location.origin + `/post/${post.id}`,
      );
    }
  };

  return (
    <Card className="border-0 border-b border-gray-200 dark:border-gray-800 rounded-none">
      <CardContent className="p-0">
        {/* Header */}
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={post.profiles.avatar_url} />
              <AvatarFallback>
                {post.profiles.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">@{post.profiles.username}</p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(post.created_at), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <MoreHorizontal size={16} />
          </Button>
        </div>

        {/* Media */}
        <div className="relative">
          {post.type === "image" ? (
            <img
              src={post.media_url}
              alt={post.caption || "Post"}
              className="w-full aspect-square object-cover"
            />
          ) : (
            <video
              src={post.media_url}
              controls
              className="w-full aspect-square object-cover"
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
                disabled={loading}
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
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8"
                onClick={handleShare}
              >
                <Send size={20} />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8"
              onClick={handleBookmark}
              disabled={loading}
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

          {/* Likes count */}
          {likesCount > 0 && (
            <p className="font-semibold text-sm">
              {likesCount} {likesCount === 1 ? "like" : "likes"}
            </p>
          )}

          {/* Caption */}
          {post.caption && (
            <div className="space-y-1">
              <p className="text-sm">
                <span className="font-semibold">@{post.profiles.username}</span>{" "}
                {post.caption}
              </p>
            </div>
          )}

          {/* Comments */}
          {post.comments_count && post.comments_count > 0 && (
            <button className="text-sm text-muted-foreground">
              View all {post.comments_count} comments
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
