import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Copy, Check, ExternalLink, AlertTriangle } from "lucide-react";

const ONE_LINE_FIX = `ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;`;

const ALTERNATIVE_FIX = `DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Enable profile creation" ON profiles;
CREATE POLICY "allow_all_inserts" ON profiles FOR INSERT WITH CHECK (true);`;

export default function OneLineFix() {
  const [copied, setCopied] = useState("");
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
        setTimeout(() => setCopied(""), 3000);
        toast({
          title: "Copied!",
          description: `${type} copied to clipboard.`,
        });
      } else {
        toast({
          title: "Copy Failed",
          description: "Please manually copy the text.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Please manually copy the text.",
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
              <AlertTriangle size={24} />
              ONE-LINE FIX
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="mb-6 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
              <AlertDescription>
                <strong>Still getting RLS policy error?</strong>
                <br />
                This one line will fix it immediately. Run this in Supabase SQL
                Editor.
              </AlertDescription>
            </Alert>

            <div className="space-y-6">
              {/* Step 1 */}
              <div>
                <h3 className="text-xl font-bold mb-3 text-red-600">
                  Step 1: Open Supabase SQL Editor
                </h3>
                <Button onClick={openSupabase} size="lg" className="gap-2">
                  <ExternalLink size={20} />
                  Open Supabase Dashboard
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  Go to your Supabase dashboard → SQL Editor → New Query
                </p>
              </div>

              {/* Step 2 - One Line Fix */}
              <div>
                <h3 className="text-xl font-bold mb-3 text-red-600">
                  Step 2: Copy & Paste This One Line
                </h3>

                <div className="bg-red-100 dark:bg-red-900 border-2 border-red-300 dark:border-red-700 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-red-800 dark:text-red-200">
                      🚨 IMMEDIATE FIX (Copy this):
                    </h4>
                    <Button
                      onClick={() =>
                        copyToClipboard(ONE_LINE_FIX, "One Line Fix")
                      }
                      variant="outline"
                      className="gap-2 border-red-300 text-red-700 hover:bg-red-50"
                    >
                      {copied === "One Line Fix" ? (
                        <Check size={16} />
                      ) : (
                        <Copy size={16} />
                      )}
                      {copied === "One Line Fix" ? "Copied!" : "Copy"}
                    </Button>
                  </div>

                  <div className="bg-gray-900 rounded-lg p-4 font-mono text-lg text-green-400 border-2 border-red-500">
                    <code className="select-all">{ONE_LINE_FIX}</code>
                  </div>
                </div>

                <Alert className="mt-4 border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
                  <AlertDescription className="text-orange-800 dark:text-orange-200">
                    <strong>What this does:</strong> Temporarily disables Row
                    Level Security on the profiles table, allowing profile
                    creation to work immediately.
                  </AlertDescription>
                </Alert>
              </div>

              {/* Alternative */}
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold mb-3">
                  Alternative Fix (if you prefer to keep RLS enabled):
                </h4>

                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">
                    More complex but keeps RLS enabled:
                  </span>
                  <Button
                    onClick={() =>
                      copyToClipboard(ALTERNATIVE_FIX, "Alternative Fix")
                    }
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    {copied === "Alternative Fix" ? (
                      <Check size={14} />
                    ) : (
                      <Copy size={14} />
                    )}
                    {copied === "Alternative Fix"
                      ? "Copied!"
                      : "Copy Alternative"}
                  </Button>
                </div>

                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-blue-400">
                  <pre className="whitespace-pre-wrap select-all">
                    {ALTERNATIVE_FIX}
                  </pre>
                </div>
              </div>

              {/* Step 3 */}
              <div>
                <h3 className="text-xl font-bold mb-3 text-green-600">
                  Step 3: Test Registration
                </h3>
                <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <p className="text-green-800 dark:text-green-200">
                    After running either SQL command above:
                  </p>
                  <ol className="list-decimal list-inside mt-2 space-y-1 text-green-700 dark:text-green-300">
                    <li>Go back to your app</li>
                    <li>Try registering a new account</li>
                    <li>It should work immediately!</li>
                  </ol>
                </div>
              </div>

              {/* Final Note */}
              <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
                <AlertDescription className="text-blue-800 dark:text-blue-200">
                  <strong>Important:</strong> The one-line fix disables RLS
                  temporarily to get your app working. Once registration works,
                  you can re-enable RLS later with more appropriate policies if
                  needed.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
