import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import AuthGuard from "./components/AuthGuard";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notifications";
import Projects from "./pages/Projects";
import CreateDCE from "./pages/CreateDCE";
import EditDCE from "./pages/EditDCE";
import ViewDCE from "./pages/ViewDCE";
import NotFound from "./pages/NotFound";
import Account from "./pages/Account";
import Billing from "./pages/Billing";
import Usage from "./pages/Usage";
import Help from "./pages/Help";
import Affiliate from "./pages/Affiliate";
import CustomPricing from "./pages/CustomPricing";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Onboarding from "./pages/Onboarding";
import Contribute from "./pages/Contribute";
import FreeTrial from "./pages/FreeTrial";
import UpgradePlan from './pages/UpgradePlan';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <NotificationProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/affiliate" element={<Affiliate />} />
              <Route path="/pricing" element={<CustomPricing />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/free-trial" element={<FreeTrial />} />
              
              {/* Routes protégées */}
              <Route path="/dashboard" element={
                <AuthGuard>
                  <Dashboard />
                </AuthGuard>
              } />
              <Route path="/notifications" element={
                <AuthGuard>
                  <Notifications />
                </AuthGuard>
              } />
              <Route path="/projects" element={
                <AuthGuard>
                  <Projects />
                </AuthGuard>
              } />
              <Route path="/contribute" element={
                <AuthGuard>
                  <Contribute />
                </AuthGuard>
              } />
              <Route path="/create-dce" element={
                <AuthGuard>
                  <CreateDCE />
                </AuthGuard>
              } />
              <Route path="/edit-dce/:id" element={
                <AuthGuard>
                  <EditDCE />
                </AuthGuard>
              } />
              <Route path="/view-dce/:id" element={
                <AuthGuard>
                  <ViewDCE />
                </AuthGuard>
              } />
              <Route path="/account" element={
                <AuthGuard>
                  <Account />
                </AuthGuard>
              } />
              <Route path="/billing" element={
                <AuthGuard>
                  <Billing />
                </AuthGuard>
              } />
              <Route path="/usage" element={
                <AuthGuard>
                  <Usage />
                </AuthGuard>
              } />
              <Route path="/help" element={
                <AuthGuard>
                  <Help />
                </AuthGuard>
              } />
              <Route
                path="/upgrade-plan"
                element={
                  <AuthGuard>
                    <UpgradePlan />
                  </AuthGuard>
                }
              />
              
              {/* Redirection par défaut vers le dashboard si authentifié */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </NotificationProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
