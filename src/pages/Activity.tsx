import { AppLayout } from "@/components/AppLayout";
import { Heart, MessageCircle, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Activity() {
  return (
    <AppLayout>
      <div className="max-w-md mx-auto p-4">
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Activity Coming Soon</h3>
          <p className="text-muted-foreground mb-4">
            See likes, comments, and follows
          </p>
          <Button variant="outline">Go Back to Home</Button>
        </div>
      </div>
    </AppLayout>
  );
}
