import React, { ReactNode } from 'react';
import TopBar from '@/components/dashboard/TopBar';
import SidebarNavigation from '@/components/dashboard/SidebarNavigation';
import { SidebarProvider } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Home, Briefcase, Gift, Users, Zap } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
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
  return <div className="min-h-screen bg-background w-full">
      <SidebarProvider defaultOpen={true}>
        <div className="flex flex-col h-screen overflow-hidden w-full">
          {/* Top section with horizontal sidebar */}
          <SidebarNavigation activeTab={activeTab} onTabChange={handleTabChange} />
          
          <main className="flex-1 flex flex-col overflow-hidden w-full">
            <TopBar onThemeToggle={toggleTheme} isDarkMode={isDarkMode} />
            
            {/* Breadcrumb with navigation items */}
            <div className="px-6 py-2 border-b border-white/5 w-full">
              <div className="flex justify-between items-center w-full">
                <Breadcrumb className="w-full">
                  
                </Breadcrumb>
                
                {/* Navigation items moved from SidebarNavigation */}
                <ul className="flex space-x-2 h-full items-center">
                  <li>
                    <Link to="/dashboard" className={cn("py-2 px-4 rounded-lg transition-colors", "flex items-center", location.pathname === '/dashboard' ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/30 text-sidebar-foreground")} onClick={e => {
                    handleTabChange('tools');
                    handlePremiumLink(e, '/dashboard');
                  }}>
                      <Home className="h-5 w-5 mr-2" />
                      <span>Tableau de bord</span>
                    </Link>
                  </li>
                  
                  <li>
                    <Link to="/projects" className={cn("py-2 px-4 rounded-lg transition-colors", "flex items-center", location.pathname === '/projects' ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/30 text-sidebar-foreground")} onClick={e => handlePremiumLink(e, '/projects')}>
                      <Briefcase className="h-5 w-5 mr-2" />
                      <span>Projets</span>
                    </Link>
                  </li>
                  
                  <li>
                    <Link to="/contribute" className={cn("py-2 px-4 rounded-lg transition-colors", "flex items-center", location.pathname === '/contribute' ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/30 text-sidebar-foreground")} onClick={() => handleTabChange('contribute')}>
                      <Gift className="h-5 w-5 mr-2" />
                      <span>Contribuer</span>
                    </Link>
                  </li>
                  
                  {isPremiumUser && <li>
                      <Link to="/affiliate" className={cn("py-2 px-4 rounded-lg transition-colors", "flex items-center", location.pathname === '/affiliate' ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/30 text-sidebar-foreground")}>
                        <Users className="h-5 w-5 mr-2" />
                        <span>Affiliation</span>
                      </Link>
                    </li>}
                  
                  <li>
                    <Link to="/upgrade-plan" className={cn("py-2 px-4 rounded-lg transition-colors", "flex items-center", location.pathname === '/upgrade-plan' ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/30 text-sidebar-foreground")}>
                      <Zap className="h-5 w-5 mr-2" />
                      <span>Upgrader son plan</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex-1 w-full p-6 overflow-auto">
              <div className="w-full max-w-full">
                {children}
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>;
};
export default DashboardLayout;