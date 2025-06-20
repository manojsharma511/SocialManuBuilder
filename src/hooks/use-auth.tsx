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

    try {
      // Check if username is available
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", username)
        .single();

      if (existingProfile) {
        return { data: null, error: { message: "Username already taken" } };
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (data.user && !error) {
        // Create profile
        const { error: profileError } = await supabase.from("profiles").insert({
          id: data.user.id,
          username,
          bio: "",
          is_private: false,
        });

        if (profileError) {
          console.error("Error creating profile:", profileError);
        }
      }

      return { data, error };
    } catch (error) {
      return {
        data: null,
        error: {
          message:
            "Registration error. Please check your Supabase configuration.",
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
