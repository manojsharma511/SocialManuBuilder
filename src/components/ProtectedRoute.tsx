import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Skeleton } from "@/components/ui/skeleton";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // TEMPORARY: Skip authentication check
    console.log(
      "🚀 Bypassing authentication - allowing access to protected routes",
    );
    return;

    // Original auth check (commented out for now)
    /*
    if (!loading && !user) {
      navigate("/login", { replace: true });
    }
    */
  }, [user, loading, navigate]);

  // TEMPORARY: Skip loading check and allow immediate access
  if (false && loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black">
        {/* Header skeleton */}
        <div className="fixed top-0 left-0 right-0 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 z-40">
          <div className="flex items-center justify-between px-4 py-3">
            <Skeleton className="h-8 w-32" />
            <div className="flex gap-4">
              <Skeleton className="w-6 h-6" />
              <Skeleton className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Content skeleton */}
        <div className="pt-16 pb-16">
          <div className="space-y-6 max-w-md mx-auto">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="flex items-center gap-3 p-3">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                <Skeleton className="w-full aspect-square" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom nav skeleton */}
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-around py-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="w-6 h-6" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // TEMPORARY: Always render children, skip user check
  return <>{children}</>;

  // Original user check (commented out for now)
  /*
  if (!user) {
    return null;
  }

  return <>{children}</>;
  */
}
