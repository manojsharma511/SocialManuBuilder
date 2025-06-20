import { MessageCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function AppHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 z-40">
      <div className="flex items-center justify-between px-4 py-3">
        <Link to="/home">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            SocialManu
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/messages">
              <MessageCircle size={24} />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/activity">
              <Heart size={24} />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
