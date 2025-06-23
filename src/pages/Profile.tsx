import { AppLayout } from "@/components/AppLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Settings, Grid, User, LogOut } from "lucide-react";

export default function Profile() {
  const { user, profile, signOut } = useAuth();

  // Check for default user
  const defaultUser = localStorage.getItem("defaultUser");
  const defaultUserData = defaultUser ? JSON.parse(defaultUser) : null;

  const handleSignOut = async () => {
    // Clear default user if exists
    localStorage.removeItem("defaultUser");
    await signOut();
  };

  return (
    <AppLayout>
      <div className="max-w-md mx-auto">
        {/* Profile Header */}
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={profile?.avatar_url} />
                <AvatarFallback className="text-2xl">
                  {(
                    profile?.username ||
                    defaultUserData?.username ||
                    "manojkumarsharma511"
                  )
                    .charAt(0)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">
                  @
                  {profile?.username ||
                    defaultUserData?.username ||
                    "manojkumarsharma511"}
                </h2>
                <p className="text-muted-foreground">
                  {profile?.bio ||
                    defaultUserData?.bio ||
                    "Default user - Welcome to SocialManu!"}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </div>

          {/* Stats */}
          <div className="flex justify-around py-4 border-t border-b">
            <div className="text-center">
              <div className="font-bold">0</div>
              <div className="text-sm text-muted-foreground">Posts</div>
            </div>
            <div className="text-center">
              <div className="font-bold">0</div>
              <div className="text-sm text-muted-foreground">Followers</div>
            </div>
            <div className="text-center">
              <div className="font-bold">0</div>
              <div className="text-sm text-muted-foreground">Following</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button variant="outline" className="w-full">
              <User className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
            <Button
              variant="outline"
              className="w-full text-red-600 hover:text-red-700"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="p-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Grid className="w-5 h-5" />
            <span className="font-medium">Posts</span>
          </div>

          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <Grid className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Posts Yet</h3>
            <p className="text-muted-foreground mb-4">
              Start sharing your moments
            </p>
            <Button variant="outline">Create Post</Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
