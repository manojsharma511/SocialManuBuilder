import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { Eye, EyeOff, Loader2, Bug } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters");
      setLoading(false);
      return;
    }

    const { error } = await signUp(email, password, username);

    if (error) {
      setError(error.message);
    } else {
      navigate("/home");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
            <span className="text-2xl font-bold text-white">SM</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Join SocialManu
          </h1>
          <p className="text-muted-foreground">
            Create an account to start sharing
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>
                  <div className="space-y-2">
                    <div>{error}</div>

                    {(error.includes("security policy") ||
                      error.includes("Profile creation failed") ||
                      error.includes("RLS Policy Error")) && (
                      <div className="space-y-2">
                        <div className="text-sm font-medium">
                          🚨 Quick Fix Required:
                        </div>
                        <div className="text-xs bg-red-100 dark:bg-red-900 p-2 rounded border">
                          1. Open Supabase SQL Editor
                          <br />
                          2. Run:{" "}
                          <code className="bg-red-200 dark:bg-red-800 px-1 rounded">
                            ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
                          </code>
                          <br />
                          3. Try registering again
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={() =>
                              window.open(
                                "https://moxigystzunlawdbnmcf.supabase.co",
                                "_blank",
                              )
                            }
                          >
                            <Bug size={14} />
                            Open Supabase
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={() => navigate("/fix")}
                          >
                            <Bug size={14} />
                            View Fix Page
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
                            onClick={() => navigate("/emergency-register")}
                          >
                            🚨 Emergency Register
                          </Button>
                        </div>
                      </div>
                    )}

                    {error.includes("Profile creation failed") &&
                      !error.includes("security policy") && (
                        <div className="mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={() => navigate("/debug")}
                          >
                            <Bug size={14} />
                            Debug This Issue
                          </Button>
                        </div>
                      )}
                  </div>
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value.replace(/[^a-zA-Z0-9_]/g, ""))
                }
                required
                disabled={loading}
                minLength={3}
                maxLength={20}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  minLength={6}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
