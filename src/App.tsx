import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ThemeProvider } from "next-themes";

// Pages
import Index from "./pages/Index";
import DatabaseSetup from "./pages/DatabaseSetup";
import DebugSQL from "./pages/DebugSQL";
import RLSFix from "./pages/RLSFix";
import QuickFix from "./pages/QuickFix";
import OneLineFix from "./pages/OneLineFix";
import EmergencyRegister from "./pages/EmergencyRegister";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomeInstagram from "./pages/HomeInstagram";
import ExploreInstagram from "./pages/ExploreInstagram";
import Reels from "./pages/Reels";
import Activity from "./pages/Activity";
import ProfileInstagram from "./pages/ProfileInstagram";
import MessagesInstagram from "./pages/MessagesInstagram";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Welcome page */}
              <Route path="/" element={<Index />} />

              {/* Setup routes */}
              <Route path="/setup" element={<DatabaseSetup />} />
              <Route path="/debug" element={<DebugSQL />} />
              <Route path="/rls-fix" element={<RLSFix />} />
              <Route path="/quick-fix" element={<QuickFix />} />
              <Route path="/fix" element={<OneLineFix />} />

              {/* Auth routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/emergency-register"
                element={<EmergencyRegister />}
              />

              {/* Protected routes */}
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <HomeInstagram />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/explore"
                element={
                  <ProtectedRoute>
                    <ExploreInstagram />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reels"
                element={
                  <ProtectedRoute>
                    <Reels />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create"
                element={
                  <ProtectedRoute>
                    <Reels />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/activity"
                element={
                  <ProtectedRoute>
                    <Activity />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileInstagram />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/messages"
                element={
                  <ProtectedRoute>
                    <MessagesInstagram />
                  </ProtectedRoute>
                }
              />

              {/* Catch all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
