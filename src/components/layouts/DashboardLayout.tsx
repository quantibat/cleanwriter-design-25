import React, { ReactNode } from 'react';
import TopBar from '@/components/dashboard/TopBar';
import SidebarNavigation from '@/components/dashboard/SidebarNavigation';
import { SidebarProvider } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
interface BreadcrumbItem {
  label: string;
  path?: string;
}
interface DashboardLayoutProps {
  children: ReactNode;
  activeTab?: string;
  breadcrumbs?: BreadcrumbItem[];
}
const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeTab = 'tools',
  breadcrumbs = []
}) => {
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    isPremiumUser
  } = useAuth();
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark-theme');
  };
  const handleTabChange = (tab: string) => {
    // Maintain existing tab change functionality
  };
  const handlePremiumLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    // Vérifier si le lien concerne une fonctionnalité premium et si l'utilisateur n'est pas premium
    if (!isPremiumUser && (path === '/projects' || path === '/dashboard')) {
      e.preventDefault();
      toast({
        title: "Fonctionnalité premium",
        description: "Cette section nécessite un abonnement premium. Découvrez notre essai gratuit de 7 jours.",
        variant: "default"
      });
      navigate('/upgrade-plan');
    }
  };
  return <div className="min-h-screen bg-[#121520] w-full">
      <SidebarProvider defaultOpen={true}>
        <div className="flex flex-col h-screen overflow-hidden w-full">
          {/* Top navigation bar */}
          <SidebarNavigation activeTab={activeTab} onTabChange={handleTabChange} />
          
          <div className="flex justify-between items-start w-full">
            {/* Main content area */}
            <main className="flex-1 flex flex-col overflow-hidden w-full">
              {/* Top right corner elements */}
              <TopBar onThemeToggle={toggleTheme} isDarkMode={isDarkMode} />
              
              {/* Content with optional breadcrumb */}
              {breadcrumbs.length > 0}
              
              <div className="flex-1 w-full p-6 overflow-auto">
                <div className="w-full max-w-full">
                  {children}
                </div>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>;
};
export default DashboardLayout;