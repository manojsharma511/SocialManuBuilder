import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  TrendingUp,
  Grid3x3,
  Play,
  Heart,
  MessageCircle,
  Clock,
  Users,
} from "lucide-react";
import { allPosts, allUsers, mockReels } from "@/data/mockData";
import { cn } from "@/lib/utils";

function SearchResults({ query }: { query: string }) {
  const filteredUsers = allUsers.filter(
    (user) =>
      user.username.toLowerCase().includes(query.toLowerCase()) ||
      user.name.toLowerCase().includes(query.toLowerCase()),
  );

  const filteredPosts = allPosts.filter((post) =>
    post.caption.toLowerCase().includes(query.toLowerCase()),
  );

  if (!query) return null;

  return (
    <div className="space-y-4">
      {/* Users */}
      {filteredUsers.length > 0 && (
        <div>
          <h3 className="font-semibold text-sm mb-3 text-muted-foreground">
            Accounts
          </h3>
          <div className="space-y-3">
            {filteredUsers.slice(0, 5).map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
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
                          className="w-4 h-4 p-0 bg-blue-500"
                        >
                          ✓
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.followers.toLocaleString()} followers
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Follow
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Posts */}
      {filteredPosts.length > 0 && (
        <div>
          <h3 className="font-semibold text-sm mb-3 text-muted-foreground">
            Posts
          </h3>
          <div className="grid grid-cols-3 gap-1">
            {filteredPosts.slice(0, 9).map((post) => (
              <div key={post.id} className="relative aspect-square">
                <img
                  src={post.mediaUrl}
                  alt={post.caption}
                  className="w-full h-full object-cover rounded-sm"
                />
                {post.mediaType === "video" && (
                  <div className="absolute top-2 right-2">
                    <Play size={16} className="text-white" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                  <div className="flex items-center gap-4 text-white">
                    <div className="flex items-center gap-1">
                      <Heart size={16} className="fill-white" />
                      <span className="text-sm font-semibold">
                        {post.likes > 1000
                          ? `${(post.likes / 1000).toFixed(1)}K`
                          : post.likes}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={16} className="fill-white" />
                      <span className="text-sm font-semibold">
                        {post.comments}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TrendingGrid() {
  const trendingPosts = allPosts.sort((a, b) => b.likes - a.likes).slice(0, 30);

  return (
    <div className="grid grid-cols-3 gap-1">
      {trendingPosts.map((post, index) => (
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

          {/* Trending badge for top posts */}
          {index < 3 && (
            <div className="absolute top-2 left-2">
              <Badge className="bg-red-500 text-white text-xs">
                <TrendingUp size={10} className="mr-1" />#{index + 1}
              </Badge>
            </div>
          )}

          {/* Hover overlay with stats */}
          <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
            <div className="flex items-center gap-4 text-white">
              <div className="flex items-center gap-1">
                <Heart size={18} className="fill-white" />
                <span className="font-semibold">
                  {post.likes > 1000
                    ? `${(post.likes / 1000).toFixed(1)}K`
                    : post.likes}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle size={18} className="fill-white" />
                <span className="font-semibold">{post.comments}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ReelsGrid() {
  return (
    <div className="grid grid-cols-3 gap-1">
      {mockReels.map((reel) => (
        <div key={reel.id} className="relative aspect-[9/16]">
          <img
            src={reel.thumbnail}
            alt={reel.caption}
            className="w-full h-full object-cover"
          />

          {/* Reels indicator */}
          <div className="absolute top-2 right-2">
            <Badge className="bg-black/70 text-white text-xs">
              <Play size={10} className="mr-1" />
              Reel
            </Badge>
          </div>

          {/* Views count */}
          <div className="absolute bottom-2 left-2">
            <div className="flex items-center gap-1 text-white text-xs font-semibold drop-shadow-lg">
              <Play size={12} />
              {reel.likes > 1000
                ? `${(reel.likes / 1000).toFixed(1)}K`
                : reel.likes}
            </div>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors" />
        </div>
      ))}
    </div>
  );
}

function SuggestedUsers() {
  const suggested = allUsers
    .filter((user) => user.followers > 1000)
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Suggested for you</h3>
        <Button variant="ghost" size="sm">
          See All
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {suggested.map((user) => (
          <Card key={user.id}>
            <CardContent className="p-4 text-center">
              <Avatar className="w-16 h-16 mx-auto mb-3">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex items-center justify-center gap-1 mb-1">
                <p className="font-semibold text-sm truncate">
                  {user.username}
                </p>
                {user.isVerified && (
                  <Badge
                    variant="secondary"
                    className="w-3 h-3 p-0 bg-blue-500"
                  >
                    ✓
                  </Badge>
                )}
              </div>

              <p className="text-xs text-muted-foreground mb-2 truncate">
                {user.name}
              </p>

              <p className="text-xs text-muted-foreground mb-3">
                {user.followers.toLocaleString()} followers
              </p>

              <Button size="sm" className="w-full">
                Follow
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function ExploreInstagram() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  return (
    <AppLayout>
      <div className="max-w-md mx-auto">
        {/* Search Bar */}
        <div className="sticky top-16 bg-white dark:bg-black z-10 p-4 border-b border-gray-100 dark:border-gray-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search accounts and posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {searchQuery ? (
            <SearchResults query={searchQuery} />
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all" className="text-xs">
                  <Grid3x3 size={14} className="mr-1" />
                  All
                </TabsTrigger>
                <TabsTrigger value="reels" className="text-xs">
                  <Play size={14} className="mr-1" />
                  Reels
                </TabsTrigger>
                <TabsTrigger value="trending" className="text-xs">
                  <TrendingUp size={14} className="mr-1" />
                  Trending
                </TabsTrigger>
                <TabsTrigger value="people" className="text-xs">
                  <Users size={14} className="mr-1" />
                  People
                </TabsTrigger>
              </TabsList>

              <div className="mt-4">
                <TabsContent value="all" className="mt-0">
                  <TrendingGrid />
                </TabsContent>

                <TabsContent value="reels" className="mt-0">
                  <ReelsGrid />
                </TabsContent>

                <TabsContent value="trending" className="mt-0">
                  <TrendingGrid />
                </TabsContent>

                <TabsContent value="people" className="mt-0">
                  <SuggestedUsers />
                </TabsContent>
              </div>
            </Tabs>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
