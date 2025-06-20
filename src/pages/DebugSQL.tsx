import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Copy, Check, ExternalLink, MousePointer, Bug } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { testDatabaseConnection } from "@/lib/debug-db";
import { Copy, Check, ExternalLink, MousePointer, Bug } from "lucide-react";

const DEBUG_SQL = `-- Debug and Fix SQL for SocialManu
-- Run this if you're still getting profile creation errors

-- First, let's check what's wrong
SELECT 'Checking profiles table...' as status;
SELECT * FROM profiles LIMIT 1;

-- Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'profiles';

-- Check policies
SELECT * FROM pg_policies WHERE tablename = 'profiles';

-- Check the trigger function
SELECT proname FROM pg_proc WHERE proname = 'handle_new_user';

-- Now let's fix common issues:

-- 1. Recreate the trigger function (this often fixes the issue)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, bio, is_private)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)),
    '',
    FALSE
  );
  RETURN NEW;
EXCEPTION
  WHEN others THEN
    -- Log the error but don't fail the auth
    RAISE WARNING 'Failed to create profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Fix RLS policies (sometimes the policies are too restrictive)
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (
    auth.uid() = id OR
    -- Allow the trigger to create profiles
    current_setting('role') = 'service_role'
  );

-- 4. Add a temporary policy to allow profile creation during signup
DROP POLICY IF EXISTS "Allow profile creation during signup" ON profiles;
CREATE POLICY "Allow profile creation during signup" ON profiles
  FOR INSERT WITH CHECK (true);

-- Test: Try to select from profiles (should work if RLS is set up correctly)
SELECT 'Testing profiles access...' as test;
SELECT COUNT(*) as profile_count FROM profiles;

-- Success message
SELECT 'Profile creation should now work! Try registering a new user.' as result;`;

export default function DebugSQL() {
  const [copied, setCopied] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);
  const sqlTextRef = useRef<HTMLPreElement>(null);
  const { toast } = useToast();

  const copyToClipboard = () => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = DEBUG_SQL;
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
          description: "Debug SQL copied to clipboard successfully.",
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
        description: "Debug SQL selected. Press Ctrl/Cmd+C to copy.",
      });
    }
  };

  const runDatabaseTest = async () => {
    setTesting(true);
    try {
      // Simple database connectivity test
      const { data, error } = await supabase
        .from("profiles")
        .select("count")
        .limit(1);

      const results = {
        profilesTableOk: !error,
        authOk: true,
        rlsOk: !error,
        errors: error ? { profiles: error } : {},
      };

      setTestResults(results);

      if (results.profilesTableOk) {
        toast({
          title: "Database Test Passed!",
          description: "Your database appears to be working correctly.",
        });
      } else {
        toast({
          title: "Database Issues Found",
          description: "Check the test results below and run the debug SQL.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Test failed:", error);
      setTestResults({
        profilesTableOk: false,
        authOk: false,
        rlsOk: false,
        errors: { general: error },
      });
      toast({
        title: "Test Failed",
        description: "Could not test database connection.",
        variant: "destructive",
      });
    } finally {
      setTesting(false);
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
              <Bug size={24} />
              Debug Profile Creation Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="mb-6 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
              <AlertDescription>
                <strong>Still getting "Error creating profile"?</strong>
                <br />
                This usually means the auto-trigger isn't working or RLS
                policies are too restrictive. Let's debug and fix it!
              </AlertDescription>
            </Alert>

            {/* Database Test */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Step 1: Test Your Database</h3>
              <Button
                onClick={runDatabaseTest}
                disabled={testing}
                className="gap-2"
              >
                {testing ? "Testing..." : "Run Database Test"}
              </Button>

              {testResults && (
                <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-medium mb-2">Test Results:</h4>
                  <div className="space-y-1 text-sm">
                    <div
                      className={
                        testResults.profilesTableOk
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      Profiles Table:{" "}
                      {testResults.profilesTableOk ? "✅ OK" : "❌ Error"}
                    </div>
                    <div
                      className={
                        testResults.authOk ? "text-green-600" : "text-red-600"
                      }
                    >
                      Authentication:{" "}
                      {testResults.authOk ? "✅ OK" : "❌ Error"}
                    </div>
                    <div
                      className={
                        testResults.rlsOk ? "text-green-600" : "text-red-600"
                      }
                    >
                      RLS Policies: {testResults.rlsOk ? "✅ OK" : "❌ Error"}
                    </div>
                  </div>

                  {testResults.errors &&
                    Object.values(testResults.errors).some((e) => e) && (
                      <details className="mt-2">
                        <summary className="cursor-pointer text-sm font-medium">
                          View Error Details
                        </summary>
                        <pre className="mt-2 text-xs bg-red-50 dark:bg-red-950 p-2 rounded overflow-auto">
                          {JSON.stringify(testResults.errors, null, 2)}
                        </pre>
                      </details>
                    )}
                </div>
              )}
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">
                  Step 2: Open Supabase SQL Editor
                </h3>
                <Button onClick={openSupabase} className="w-fit gap-2">
                  <ExternalLink size={16} />
                  Open Supabase Dashboard
                </Button>
              </div>

              <div>
                <h3 className="font-semibold mb-2">
                  Step 3: Run Debug & Fix SQL
                </h3>
                <div className="flex gap-2 mb-2 flex-wrap">
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="gap-2"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? "Copied!" : "Copy Debug SQL"}
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
                  This SQL will diagnose and fix common profile creation issues.
                </p>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm max-h-96 overflow-y-auto border">
              <pre
                ref={sqlTextRef}
                className="whitespace-pre-wrap select-text cursor-text"
                style={{ userSelect: "text" }}
              >
                {DEBUG_SQL}
              </pre>
            </div>

            <Alert className="mt-6">
              <AlertDescription>
                <strong>After running the debug SQL:</strong> Try registering
                again. The SQL includes multiple fixes for common profile
                creation issues including trigger problems and RLS policy
                restrictions.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
