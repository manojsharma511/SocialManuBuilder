import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { isSupabaseConfigured } from "@/lib/supabase";
import { checkDatabaseSetup, DatabaseStatus } from "@/lib/database-check";
import {
  Instagram,
  Database,
  Shield,
  MessageSquare,
  Heart,
  Search,
  Camera,
  Users,
  Settings,
  AlertTriangle,
  CheckCircle,
  Loader2,
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [dbStatus, setDbStatus] = useState<DatabaseStatus | null>(null);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    // Check database setup if Supabase is configured
    if (isSupabaseConfigured) {
      setChecking(true);
      checkDatabaseSetup().then((status) => {
        setDbStatus(status);
        setChecking(false);
      });
    }

    // Auto redirect to home after 8 seconds
    const timer = setTimeout(() => {
      navigate("/home");
    }, 8000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const features = [
    { icon: Shield, title: "Supabase Auth", desc: "Secure authentication" },
    { icon: Users, title: "Follow System", desc: "Connect with friends" },
    { icon: Camera, title: "Media Posts", desc: "Share photos & videos" },
    { icon: Heart, title: "Likes & Comments", desc: "Engage with content" },
    { icon: MessageSquare, title: "Real-time Chat", desc: "Private messaging" },
    { icon: Search, title: "Explore", desc: "Discover new content" },
    { icon: Database, title: "Cloud Storage", desc: "Supabase backend" },
    { icon: Settings, title: "Admin Panel", desc: "Management tools" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Configuration Status */}
        {!isSupabaseConfigured && (
          <Alert className="mb-8 border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800 dark:text-orange-200">
              <strong>Setup Required:</strong> Supabase is not configured.
              Please add your environment variables to enable full
              functionality.
            </AlertDescription>
          </Alert>
        )}

        {isSupabaseConfigured && checking && (
          <Alert className="mb-8 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
            <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
            <AlertDescription className="text-blue-800 dark:text-blue-200">
              <strong>Checking database setup...</strong> Verifying all tables
              are created.
            </AlertDescription>
          </Alert>
        )}

        {isSupabaseConfigured &&
          !checking &&
          dbStatus &&
          !dbStatus.tablesExist && (
            <Alert className="mb-8 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800 dark:text-red-200">
                <strong>Database Setup Required:</strong> {dbStatus.error}.
                Please run the SQL schema in your Supabase dashboard.
              </AlertDescription>
            </Alert>
          )}

        {isSupabaseConfigured &&
          !checking &&
          dbStatus &&
          dbStatus.tablesExist && (
            <Alert className="mb-8 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                <strong>Ready to go!</strong> Supabase is configured and
                database tables are set up correctly.
              </AlertDescription>
            </Alert>
          )}

        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center mb-6">
            <span className="text-3xl font-bold text-white">SM</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Welcome to SocialManu
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            A modern Instagram-style social media platform
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Badge variant="secondary">React 18</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">Supabase</Badge>
            <Badge variant="secondary">Tailwind CSS</Badge>
            <Badge variant="secondary">Vite</Badge>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              onClick={() =>
                navigate(
                  isSupabaseConfigured && dbStatus?.tablesExist
                    ? "/login"
                    : "#setup",
                )
              }
              disabled={
                !isSupabaseConfigured || !dbStatus?.tablesExist || checking
              }
            >
              {checking ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Checking...
                </>
              ) : isSupabaseConfigured && dbStatus?.tablesExist ? (
                "Get Started"
              ) : (
                "Setup Required"
              )}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/home")}
            >
              {isSupabaseConfigured && dbStatus?.tablesExist
                ? "View App"
                : "Preview App"}
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map(({ icon: Icon, title, desc }) => (
            <Card key={title} className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Setup Instructions */}
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-2xl font-bold text-center">Quick Setup</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">1. Supabase Setup</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Create a new Supabase project</li>
                  <li>• Copy your project URL and anon key</li>
                  <li>• Update .env file with your credentials</li>
                  <li>• Run the SQL schema (see README)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">2. Environment Variables</h3>
                <div className="bg-muted p-3 rounded-lg text-sm font-mono">
                  <div>VITE_SUPABASE_URL=your-url</div>
                  <div>VITE_SUPABASE_ANON_KEY=your-key</div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">3. Database Schema Setup</h3>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>After setting up Supabase, run the SQL schema:</p>
                <ol className="list-decimal list-inside space-y-1 ml-4">
                  <li>Go to your Supabase dashboard</li>
                  <li>Navigate to "SQL Editor"</li>
                  <li>Create a new query</li>
                  <li>Copy and paste the contents of `supabase-schema.sql`</li>
                  <li>Click "Run" to execute</li>
                </ol>
                {dbStatus && !dbStatus.tablesExist && (
                  <div className="mt-2 p-2 bg-red-50 dark:bg-red-950 rounded text-red-800 dark:text-red-200 text-xs">
                    ⚠️ Database tables missing:{" "}
                    {dbStatus.missingTables.join(", ")}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Auto Redirect Notice */}
        <div className="text-center">
          <p className="text-muted-foreground">
            Redirecting to the app in a few seconds...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
