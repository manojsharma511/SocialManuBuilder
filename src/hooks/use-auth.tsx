import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase, Profile, isSupabaseConfigured } from "@/lib/supabase";
import {
  quickDatabaseTest,
  testSpecificProfileInsert,
} from "@/lib/simple-test";

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, username: string) => Promise<any>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If Supabase is not configured, set demo mode
    if (!isSupabaseConfigured) {
      console.warn(
        "Supabase not configured. Running in demo mode. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.",
      );
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchProfile(session.user.id);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error getting session:", error);
        setLoading(false);
      });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      return {
        data: null,
        error: {
          message:
            "Supabase not configured. Please set up your environment variables.",
        },
      };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { data, error };
    } catch (error) {
      return {
        data: null,
        error: {
          message:
            "Authentication error. Please check your Supabase configuration.",
        },
      };
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    if (!isSupabaseConfigured) {
      return {
        data: null,
        error: {
          message:
            "Supabase not configured. Please set up your environment variables.",
        },
      };
    }

    console.log("🚀 Starting signup process...");

    try {
      // First, run a quick database test
      await quickDatabaseTest();

      // Check if username is available
      console.log("👤 Checking username availability...");
      const { data: existingProfile, error: usernameError } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", username)
        .single();

      if (usernameError && usernameError.code !== "PGRST116") {
        // PGRST116 means "no rows found" which is what we want
        console.error("❌ Username check error:");
        console.error("Message:", usernameError.message);
        console.error("Code:", usernameError.code);
        console.error("Details:", usernameError.details);

        return {
          data: null,
          error: {
            message: `Database error (${usernameError.code}): ${usernameError.message}. The database might not be properly set up.`,
          },
        };
      }

      if (existingProfile) {
        return { data: null, error: { message: "Username already taken" } };
      }

      console.log("✅ Username available, creating auth user...");
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error("❌ Auth signup error:");
        console.error("Message:", error.message);
        console.error("Full error:", JSON.stringify(error, null, 2));
        return { data, error };
      }

      if (data.user) {
        console.log("✅ Auth user created, now creating profile...");

        // Test profile creation with clearer error reporting
        const profileTest = await testSpecificProfileInsert(
          data.user.id,
          username,
        );

        if (!profileTest.success) {
          const err = profileTest.error;
          const errorMsg = err?.message || "Unknown error";
          const errorCode = err?.code || "unknown";
          const errorHint = err?.hint || "";

          // Check for specific RLS policy error
          if (
            errorCode === "42501" &&
            errorMsg.includes("row-level security policy")
          ) {
            return {
              data: null,
              error: {
                message: `RLS Policy Error: Profile creation blocked by security policy. Go to /quick-fix for immediate solution.`,
              },
            };
          }

          return {
            data: null,
            error: {
              message: `Profile creation failed (${errorCode}): ${errorMsg}${errorHint ? ". Hint: " + errorHint : ""}. Go to /debug for help.`,
            },
          };
        }

        console.log("✅ Profile created successfully!");
      }

      return { data, error };
    } catch (error) {
      console.error("💥 Signup process failed:", error);
      return {
        data: null,
        error: {
          message: `Registration error: ${error instanceof Error ? error.message : "Unknown error"}. Please check your Supabase configuration.`,
        },
      };
    }
  };

  const signOut = async () => {
    if (!isSupabaseConfigured) {
      return;
    }
    await supabase.auth.signOut();
  };

  const value = {
    user,
    profile,
    session,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
