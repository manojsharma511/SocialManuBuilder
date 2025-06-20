import { AppLayout } from "@/components/AppLayout";
import { Camera, Image, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Create() {
  return (
    <AppLayout>
      <div className="max-w-md mx-auto p-4">
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
            <Camera className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold mb-2">
            Create Post Coming Soon
          </h3>
          <p className="text-muted-foreground mb-4">
            Share photos and videos with your friends
          </p>
          <div className="space-y-2">
            <Button variant="outline" className="w-full">
              <Image className="w-4 h-4 mr-2" />
              Share Photo
            </Button>
            <Button variant="outline" className="w-full">
              <Video className="w-4 h-4 mr-2" />
              Share Video
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
