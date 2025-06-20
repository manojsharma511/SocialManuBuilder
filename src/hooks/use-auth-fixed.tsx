import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase, Profile, isSupabaseConfigured } from "@/lib/supabase";

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
      console.warn("Supabase not configured. Running in demo mode.");
      setLoading(false);
      return;
    }

    // Get initial session
    const initializeAuth = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Error getting session:", error);
        } else {
          setSession(session);
          setUser(session?.user ?? null);
          if (session?.user) {
            await fetchProfile(session.user.id);
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state change:", event);
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

      if (error) {
        // If profile doesn't exist, that's okay - it might be a new user
        if (error.code === "PGRST116") {
          console.log("Profile not found, user might be new");
          return;
        }
        throw error;
      }
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
      console.error("Sign in error:", error);
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
      // First check if username is available
      console.log("👤 Checking username availability...");
      const { data: existingProfile, error: usernameError } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", username)
        .single();

      if (usernameError && usernameError.code !== "PGRST116") {
        // PGRST116 means "no rows found" which is what we want
        console.error("❌ Username check error:", usernameError);
        return {
          data: null,
          error: {
            message: `Database error: ${usernameError.message}. Please check your database setup.`,
          },
        };
      }

      if (existingProfile) {
        return { data: null, error: { message: "Username already taken" } };
      }

      console.log("✅ Username available, creating auth user...");

      // Create the auth user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username,
          },
        },
      });

      if (error) {
        console.error("❌ Auth signup error:", error);
        return { data, error };
      }

      if (data.user) {
        console.log("✅ Auth user created, creating profile...");

        // Create profile immediately (don't wait for trigger)
        const { error: profileError } = await supabase.from("profiles").insert({
          id: data.user.id,
          username: username,
          bio: "",
          is_private: false,
        });

        if (profileError) {
          console.error("❌ Profile creation error:", profileError);

          // Provide specific error guidance
          if (profileError.code === "42501") {
            return {
              data: null,
              error: {
                message:
                  "Profile creation blocked by security policy. Database needs RLS policy fix.",
              },
            };
          } else if (profileError.code === "23505") {
            return {
              data: null,
              error: {
                message: "Profile already exists for this user.",
              },
            };
          } else {
            return {
              data: null,
              error: {
                message: `Profile creation failed: ${profileError.message}. Please check database setup.`,
              },
            };
          }
        }

        console.log("✅ Profile created successfully!");
      }

      return { data, error };
    } catch (error) {
      console.error("💥 Signup process failed:", error);
      return {
        data: null,
        error: {
          message: `Registration error: ${error instanceof Error ? error.message : "Unknown error"}`,
        },
      };
    }
  };

  const signOut = async () => {
    if (!isSupabaseConfigured) {
      return;
    }

    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Sign out error:", error);
    }
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
