
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import AuthGuard from "./components/AuthGuard";
import MainLayout from "./components/layouts/MainLayout";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import EmailConfirmation from "./pages/EmailConfirmation";
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
import EditProject from './pages/EditProject';
import DeleteProject from './pages/DeleteProject';
import ViewProject from './pages/ViewProject';
import Offers from "./pages/Offers";
import OfferDetail from "./pages/OfferDetail";
import N8nChat from "./pages/Chat";

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
              {/* Public pages with MainLayout */}
              <Route path="/" element={<MainLayout><Index /></MainLayout>} />
              <Route path="/signin" element={<MainLayout><SignIn /></MainLayout>} />
              <Route path="/signup" element={<MainLayout><SignUp /></MainLayout>} />
              <Route path="/forgot-password" element={<MainLayout><ForgotPassword /></MainLayout>} />
              <Route path="/reset-password" element={<MainLayout><ResetPassword /></MainLayout>} />
              <Route path="/email-confirmation" element={<MainLayout><EmailConfirmation /></MainLayout>} />
              <Route path="/affiliate" element={<MainLayout><Affiliate /></MainLayout>} />
              <Route path="/pricing" element={<MainLayout><CustomPricing /></MainLayout>} />
              <Route path="/privacy-policy" element={<MainLayout><PrivacyPolicy /></MainLayout>} />
              <Route path="/terms-of-service" element={<MainLayout><TermsOfService /></MainLayout>} />
              <Route path="/onboarding" element={<MainLayout><Onboarding /></MainLayout>} />
              <Route path="/free-trial" element={<MainLayout><FreeTrial /></MainLayout>} />
              <Route path="/chat" element={<MainLayout><N8nChat /></MainLayout>} />
              
              {/* Protected routes */}
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

              <Route path="/offres" element={
                <AuthGuard>
                  <Offers />
                </AuthGuard>
              } />

              <Route path="/offre-detail/:id" element={
                <AuthGuard>
                  <OfferDetail />
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
              <Route path="/edit-project/:id" element={
                <AuthGuard>
                  <EditProject />
                </AuthGuard>
              } />
              <Route path="/delete-project/:id" element={
                <AuthGuard>
                  <DeleteProject />
                </AuthGuard>
              } />
              <Route path="/view-project" element={
                <AuthGuard>
                  <ViewProject />
                </AuthGuard>
              } />
              
              {/* Fallback route */}
              <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
            </Routes>
          </BrowserRouter>
        </NotificationProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
