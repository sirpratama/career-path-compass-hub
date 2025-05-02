import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/login";
import Signup from "./pages/signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider, useAuth } from "./hooks/useAuth";

const queryClient = new QueryClient();

// Wrapper component to protect routes that should only be accessed by logged-out users
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user: currentUser } = useAuth();
  // Wait until auth status is determined (user might be null initially)
  // This prevents flashing the login page before redirecting
  // Note: You might need a more robust loading state depending on useAuth implementation
  if (currentUser === undefined) {
    return null; // Or a loading spinner
  }
  return currentUser ? <Navigate to="/" replace /> : <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <UserProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Index />} />
            {/* Keep PublicRoute for Login/Signup */}
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
            <Route 
              path="/signup" 
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </UserProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
