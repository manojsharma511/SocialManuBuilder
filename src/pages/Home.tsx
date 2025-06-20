import { useEffect, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { PostCard } from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/use-auth";
import { RefreshCw } from "lucide-react";

export default function Home() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPosts = async () => {
    try {
      // Get posts from followed users and own posts
      const { data: followedUsers } = await supabase
        .from("follows")
        .select("following_id")
        .eq("follower_id", user?.id);

      const followedIds = followedUsers?.map((f) => f.following_id) || [];
      const userIds = user ? [...followedIds, user.id] : followedIds;

      if (userIds.length === 0) {
        setPosts([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("posts")
        .select(
          `
          *,
          profiles:user_id (username, avatar_url),
          likes_count:likes(count),
          comments_count:comments(count),
          is_liked:likes!inner(user_id),
          is_bookmarked:bookmarks!inner(user_id)
        `,
        )
        .in("user_id", userIds)
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) throw error;

      // Process the data to get proper counts and flags
      const processedPosts =
        data?.map((post) => ({
          ...post,
          likes_count: post.likes_count?.[0]?.count || 0,
          comments_count: post.comments_count?.[0]?.count || 0,
          is_liked:
            post.is_liked?.some((like: any) => like.user_id === user?.id) ||
            false,
          is_bookmarked:
            post.is_bookmarked?.some(
              (bookmark: any) => bookmark.user_id === user?.id,
            ) || false,
        })) || [];

      setPosts(processedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchPosts();
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="flex items-center gap-3 p-3">
                <Skeleton className="w-8 h-8 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <Skeleton className="w-full aspect-square" />
              <div className="p-3 space-y-2">
                <div className="flex gap-4">
                  <Skeleton className="w-6 h-6" />
                  <Skeleton className="w-6 h-6" />
                  <Skeleton className="w-6 h-6" />
                </div>
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-md mx-auto">
        {/* Pull to refresh */}
        <div className="flex justify-center py-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
            className="gap-2"
          >
            <RefreshCw
              className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">SM</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Welcome to SocialManu!
            </h3>
            <p className="text-muted-foreground mb-4">
              Follow some users to see their posts in your feed
            </p>
            <Button asChild>
              <a href="/explore">Explore</a>
            </Button>
          </div>
        ) : (
          <div className="space-y-0">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
