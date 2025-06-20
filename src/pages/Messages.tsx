import { AppLayout } from "@/components/AppLayout";
import { MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Messages() {
  return (
    <AppLayout>
      <div className="max-w-md mx-auto p-4">
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Messages Coming Soon</h3>
          <p className="text-muted-foreground mb-4">
            Real-time chat with your friends
          </p>
          <Button variant="outline">Go Back to Home</Button>
        </div>
      </div>
    </AppLayout>
  );
}
