import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Search,
  MessageCircle,
  User,
  PlusSquare,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/home" },
    { icon: Search, label: "Explore", path: "/explore" },
    { icon: PlusSquare, label: "Create", path: "/create" },
    { icon: Heart, label: "Activity", path: "/activity" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center justify-center w-16 h-12 rounded-lg transition-colors",
                isActive
                  ? "text-black dark:text-white"
                  : "text-gray-500 dark:text-gray-400",
              )}
            >
              <Icon
                size={24}
                className={cn(isActive && "fill-current")}
                strokeWidth={isActive ? 2 : 1.5}
              />
              <span className="sr-only">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
