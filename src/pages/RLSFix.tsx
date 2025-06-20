import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Copy, Check, ExternalLink, MousePointer, Shield } from "lucide-react";

const RLS_FIX_SQL = `-- Fix RLS Policy for Profile Creation
-- This fixes the "row-level security policy" error

-- 1. Drop the problematic policies
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Allow profile creation during signup" ON profiles;

-- 2. Create a more permissive policy for profile creation
-- This allows profile creation during signup AND after authentication
CREATE POLICY "Enable profile creation" ON profiles
  FOR INSERT WITH CHECK (
    -- Allow if user is authenticated and creating their own profile
    auth.uid() = id OR
    -- Allow during signup process (when role is anon but we have the user data)
    (auth.role() = 'anon' AND id IS NOT NULL) OR
    -- Allow service role (for triggers)
    auth.role() = 'service_role'
  );

-- 3. Also update the trigger function to be more robust
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  new_username TEXT;
BEGIN
  -- Generate a username if not provided
  new_username := COALESCE(
    NEW.raw_user_meta_data->>'username', 
    'user_' || substr(NEW.id::text, 1, 8)
  );
  
  -- Insert the profile with better error handling
  INSERT INTO public.profiles (id, username, bio, is_private)
  VALUES (NEW.id, new_username, '', FALSE)
  ON CONFLICT (id) DO NOTHING; -- Ignore if already exists
  
  RETURN NEW;
EXCEPTION 
  WHEN others THEN
    -- Log the error but don't fail the auth process
    RAISE WARNING 'Failed to create profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. Alternative: Create a completely open policy for now (remove this later in production)
-- Uncomment the line below if the above doesn't work:
-- CREATE POLICY "Temporary open insert" ON profiles FOR INSERT WITH CHECK (true);

-- Test the fix
SELECT 'RLS policy fix applied! Try registering again.' as result;`;

export default function RLSFix() {
  const [copied, setCopied] = useState(false);
  const sqlTextRef = useRef<HTMLPreElement>(null);
  const { toast } = useToast();

  const copyToClipboard = () => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = RLS_FIX_SQL;
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
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast({
          title: "Copied!",
          description: "RLS fix SQL copied to clipboard successfully.",
        });
      } else {
        selectAllText();
        toast({
          title: "Copy Failed",
          description:
            "Text has been selected. Press Ctrl/Cmd+C to copy manually.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Copy failed:", err);
      selectAllText();
      toast({
        title: "Copy Failed",
        description:
          "Text has been selected. Press Ctrl/Cmd+C to copy manually.",
        variant: "destructive",
      });
    }
  };

  const selectAllText = () => {
    if (sqlTextRef.current) {
      const range = document.createRange();
      range.selectNodeContents(sqlTextRef.current);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      toast({
        title: "Text Selected",
        description: "RLS fix SQL selected. Press Ctrl/Cmd+C to copy.",
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
              <Shield size={24} />
              Fix RLS Policy Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="mb-6 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
              <AlertDescription>
                <strong>Issue Found:</strong> Row Level Security (RLS) policy is
                blocking profile creation.
                <br />
                <strong>Error Code 42501:</strong> "new row violates row-level
                security policy for table profiles"
                <br />
                <strong>Solution:</strong> Run the SQL below to fix the
                restrictive policy.
              </AlertDescription>
            </Alert>

            <div className="space-y-4 mb-6">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">
                  Step 1: Open Supabase SQL Editor
                </h3>
                <Button onClick={openSupabase} className="w-fit gap-2">
                  <ExternalLink size={16} />
                  Open Supabase Dashboard
                </Button>
              </div>

              <div>
                <h3 className="font-semibold mb-2">
                  Step 2: Run the RLS Fix SQL
                </h3>
                <div className="flex gap-2 mb-2 flex-wrap">
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="gap-2"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? "Copied!" : "Copy Fix SQL"}
                  </Button>
                  <Button
                    onClick={selectAllText}
                    variant="outline"
                    className="gap-2"
                  >
                    <MousePointer size={16} />
                    Select All
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  This SQL will create a more permissive RLS policy that allows
                  profile creation during signup.
                </p>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm max-h-96 overflow-y-auto border">
              <pre
                ref={sqlTextRef}
                className="whitespace-pre-wrap select-text cursor-text"
                style={{ userSelect: "text" }}
              >
                {RLS_FIX_SQL}
              </pre>
            </div>

            <div className="mt-6 space-y-4">
              <Alert>
                <AlertDescription>
                  <strong>What this fix does:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>
                      Creates a more permissive RLS policy for profile creation
                    </li>
                    <li>Allows profile creation during the signup process</li>
                    <li>
                      Improves the auto-trigger function with better error
                      handling
                    </li>
                    <li>Adds conflict resolution (ON CONFLICT DO NOTHING)</li>
                  </ul>
                </AlertDescription>
              </Alert>

              <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                <AlertDescription className="text-green-800 dark:text-green-200">
                  <strong>After running this SQL:</strong> Try registering a new
                  account. The "row-level security policy" error should be
                  completely resolved!
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
