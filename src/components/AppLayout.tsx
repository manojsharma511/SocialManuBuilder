import { AppHeader } from "./AppHeader";
import { MobileNav } from "./MobileNav";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showNav?: boolean;
}

export function AppLayout({
  children,
  showHeader = true,
  showNav = true,
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {showHeader && <AppHeader />}
      <main className={cn("pb-16", showHeader && "pt-16", !showNav && "pb-0")}>
        {children}
      </main>
      {showNav && <MobileNav />}
    </div>
  );
}
