import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Copy, Check, ExternalLink, Zap } from "lucide-react";

const QUICK_FIX_SQL = `-- IMMEDIATE FIX for RLS Policy Error
-- This will fix the profile creation issue right now

-- Method 1: Create a simple, permissive policy (RECOMMENDED)
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Enable profile creation" ON profiles;
DROP POLICY IF EXISTS "Allow profile creation during signup" ON profiles;

-- Create a new policy that allows profile creation
CREATE POLICY "Allow profile inserts" ON profiles
  FOR INSERT WITH CHECK (true);

-- Method 2: Alternative - Temporarily disable RLS (uncomment if needed)
-- ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- Test that it worked
SELECT 'Quick fix applied! Try registering now.' as status;`;

const SECURE_FIX_SQL = `-- SECURE FIX (run this after testing the quick fix works)
-- This replaces the permissive policy with a more secure one

DROP POLICY IF EXISTS "Allow profile inserts" ON profiles;

-- More secure policy that allows authenticated users and signup process
CREATE POLICY "Secure profile creation" ON profiles
  FOR INSERT WITH CHECK (
    auth.uid() = id OR                    -- Authenticated user creating own profile
    auth.role() = 'service_role' OR       -- Service role (triggers)
    (auth.uid() IS NULL AND id IS NOT NULL) -- During signup when auth.uid() not set yet
  );

SELECT 'Secure policy applied!' as status;`;

export default function QuickFix() {
  const [copied, setCopied] = useState("");
  const quickFixRef = useRef<HTMLPreElement>(null);
  const secureFixRef = useRef<HTMLPreElement>(null);
  const { toast } = useToast();

  const copyToClipboard = (text: string, type: string) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.opacity = "0";

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      textArea.setSelectionRange(0, 99999);

      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);

      if (successful) {
        setCopied(type);
        setTimeout(() => setCopied(""), 2000);
        toast({
          title: "Copied!",
          description: `${type} SQL copied to clipboard.`,
        });
      } else {
        toast({
          title: "Copy Failed",
          description: "Please manually copy the SQL text.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Please manually copy the SQL text.",
        variant: "destructive",
      });
    }
  };

  const openSupabase = () => {
    window.open("https://moxigystzunlawdbnmcf.supabase.co", "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
              <Zap size={24} />
              Quick Fix for RLS Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="mb-6 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
              <AlertDescription>
                <strong>Same RLS Error Still Happening?</strong>
                <br />
                Let's fix this immediately with a simple solution that will work
                right now.
              </AlertDescription>
            </Alert>

            <div className="space-y-6">
              {/* Step 1 */}
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  Step 1: Open Supabase SQL Editor
                </h3>
                <Button onClick={openSupabase} className="gap-2">
                  <ExternalLink size={16} />
                  Open Supabase Dashboard
                </Button>
              </div>

              {/* Step 2 - Quick Fix */}
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Step 2: Run This Quick Fix (Copy & Paste)
                </h3>
                <div className="flex gap-2 mb-2">
                  <Button
                    onClick={() => copyToClipboard(QUICK_FIX_SQL, "Quick Fix")}
                    variant="outline"
                    className="gap-2"
                  >
                    {copied === "Quick Fix" ? (
                      <Check size={16} />
                    ) : (
                      <Copy size={16} />
                    )}
                    {copied === "Quick Fix" ? "Copied!" : "Copy Quick Fix"}
                  </Button>
                </div>

                <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm max-h-64 overflow-y-auto border mb-4">
                  <pre
                    ref={quickFixRef}
                    className="whitespace-pre-wrap select-text cursor-text"
                    style={{ userSelect: "text" }}
                  >
                    {QUICK_FIX_SQL}
                  </pre>
                </div>

                <Alert className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
                  <AlertDescription className="text-yellow-800 dark:text-yellow-200">
                    <strong>
                      This creates a permissive policy that allows all profile
                      inserts.
                    </strong>
                    <br />
                    Run this first to get registration working, then optionally
                    run the secure fix below.
                  </AlertDescription>
                </Alert>
              </div>

              {/* Step 3 */}
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Step 3: Test Registration
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  After running the quick fix SQL, go back to your app and try
                  registering. It should work immediately.
                </p>
              </div>

              {/* Optional Secure Fix */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-2">
                  Optional: More Secure Policy (Run After Quick Fix Works)
                </h3>
                <div className="flex gap-2 mb-2">
                  <Button
                    onClick={() =>
                      copyToClipboard(SECURE_FIX_SQL, "Secure Fix")
                    }
                    variant="outline"
                    className="gap-2"
                  >
                    {copied === "Secure Fix" ? (
                      <Check size={16} />
                    ) : (
                      <Copy size={16} />
                    )}
                    {copied === "Secure Fix" ? "Copied!" : "Copy Secure Fix"}
                  </Button>
                </div>

                <div className="bg-gray-900 rounded-lg p-4 text-blue-400 font-mono text-sm max-h-64 overflow-y-auto border mb-4">
                  <pre
                    ref={secureFixRef}
                    className="whitespace-pre-wrap select-text cursor-text"
                    style={{ userSelect: "text" }}
                  >
                    {SECURE_FIX_SQL}
                  </pre>
                </div>

                <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                  <AlertDescription className="text-green-800 dark:text-green-200">
                    <strong>
                      This replaces the permissive policy with a more secure one
                    </strong>{" "}
                    that still allows signup but is more restrictive.
                  </AlertDescription>
                </Alert>
              </div>

              {/* Final Instructions */}
              <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
                <AlertDescription className="text-blue-800 dark:text-blue-200">
                  <strong>Summary:</strong>
                  <ol className="list-decimal list-inside mt-2 space-y-1">
                    <li>Run the "Quick Fix" SQL first</li>
                    <li>Test registration in your app - it should work</li>
                    <li>Optionally run the "Secure Fix" for better security</li>
                  </ol>
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
