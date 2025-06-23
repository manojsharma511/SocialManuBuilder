import { useState, useRef, useEffect } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  Volume2,
  VolumeX,
  Music,
  Play,
  Pause,
} from "lucide-react";
import { mockReels } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface ReelCardProps {
  reel: any;
  isActive: boolean;
  onLike: (reelId: string) => void;
  onBookmark: (reelId: string) => void;
}

function ReelCard({ reel, isActive, onLike, onBookmark }: ReelCardProps) {
  const [isLiked, setIsLiked] = useState(reel.isLiked);
  const [likesCount, setLikesCount] = useState(reel.likes);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isActive]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    onLike(reel.id);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark(reel.id);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="relative h-screen w-full bg-black flex items-center justify-center">
      {/* Video */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        className="h-full w-full object-cover"
        loop
        muted={isMuted}
        playsInline
        onClick={togglePlay}
      />

      {/* Play/Pause Overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="w-16 h-16 bg-black/50 hover:bg-black/70 text-white rounded-full"
            onClick={togglePlay}
          >
            <Play size={32} />
          </Button>
        </div>
      )}

      {/* User Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-end justify-between">
          <div className="flex-1 mr-4">
            {/* User */}
            <div className="flex items-center gap-2 mb-2">
              <Avatar className="w-8 h-8 ring-2 ring-white">
                <AvatarImage src={reel.user.avatar} />
                <AvatarFallback>
                  {reel.user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-white font-semibold text-sm">
                {reel.user.username}
              </span>
              {reel.user.isVerified && (
                <Badge variant="secondary" className="w-4 h-4 p-0 bg-blue-500">
                  ✓
                </Badge>
              )}
              <Button
                variant="outline"
                size="sm"
                className="ml-2 text-white border-white hover:bg-white hover:text-black"
              >
                Follow
              </Button>
            </div>

            {/* Caption */}
            <p className="text-white text-sm mb-2 line-clamp-2">
              {reel.caption}
            </p>

            {/* Music */}
            <div className="flex items-center gap-2">
              <Music size={14} className="text-white" />
              <span className="text-white text-xs">{reel.music}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center gap-4">
            {/* Like */}
            <div className="flex flex-col items-center">
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 text-white hover:bg-white/20"
                onClick={handleLike}
              >
                <Heart
                  size={28}
                  className={cn(
                    "transition-colors",
                    isLiked && "fill-red-500 text-red-500",
                  )}
                />
              </Button>
              <span className="text-white text-xs font-semibold">
                {likesCount > 1000
                  ? `${(likesCount / 1000).toFixed(1)}K`
                  : likesCount}
              </span>
            </div>

            {/* Comments */}
            <div className="flex flex-col items-center">
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 text-white hover:bg-white/20"
              >
                <MessageCircle size={28} />
              </Button>
              <span className="text-white text-xs font-semibold">
                {reel.comments > 1000
                  ? `${(reel.comments / 1000).toFixed(1)}K`
                  : reel.comments}
              </span>
            </div>

            {/* Share */}
            <div className="flex flex-col items-center">
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 text-white hover:bg-white/20"
              >
                <Send size={28} />
              </Button>
              <span className="text-white text-xs font-semibold">
                {reel.shares}
              </span>
            </div>

            {/* Bookmark */}
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 text-white hover:bg-white/20"
              onClick={handleBookmark}
            >
              <Bookmark
                size={28}
                className={cn(
                  "transition-colors",
                  isBookmarked && "fill-white",
                )}
              />
            </Button>

            {/* More */}
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 text-white hover:bg-white/20"
            >
              <MoreHorizontal size={28} />
            </Button>
          </div>
        </div>
      </div>

      {/* Mute Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 w-10 h-10 text-white bg-black/50 hover:bg-black/70"
        onClick={toggleMute}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </Button>
    </div>
  );
}

export default function Reels() {
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [reels] = useState(mockReels);

  const handleLike = (reelId: string) => {
    console.log("Liked reel:", reelId);
  };

  const handleBookmark = (reelId: string) => {
    console.log("Bookmarked reel:", reelId);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const newIndex = Math.round(scrollY / windowHeight);

      if (newIndex !== currentReelIndex && newIndex < reels.length) {
        setCurrentReelIndex(newIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentReelIndex, reels.length]);

  return (
    <div className="bg-black min-h-screen">
      {/* No AppLayout here as Reels should be full screen */}
      <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
        {reels.map((reel, index) => (
          <div key={reel.id} className="snap-start">
            <ReelCard
              reel={reel}
              isActive={index === currentReelIndex}
              onLike={handleLike}
              onBookmark={handleBookmark}
            />
          </div>
        ))}
      </div>

      {/* Reel indicators */}
      <div className="fixed right-2 top-1/2 transform -translate-y-1/2 flex flex-col gap-1 z-50">
        {reels.map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-1 h-8 rounded-full transition-colors",
              index === currentReelIndex ? "bg-white" : "bg-white/30",
            )}
          />
        ))}
      </div>
    </div>
  );
}
