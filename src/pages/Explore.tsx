import { AppLayout } from "@/components/AppLayout";
import { Search, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Explore() {
  return (
    <AppLayout>
      <div className="max-w-md mx-auto p-4">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="Search users, posts..." className="pl-10" />
        </div>

        {/* Coming Soon */}
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Explore Coming Soon</h3>
          <p className="text-muted-foreground mb-4">
            Discover trending posts and new users
          </p>
          <Button variant="outline">Go Back to Home</Button>
        </div>
      </div>
    </AppLayout>
  );
}
