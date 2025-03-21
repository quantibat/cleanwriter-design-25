import React, { ReactNode, useEffect } from 'react';
import TopBar from '@/components/dashboard/TopBar';
import { SidebarProvider } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface DashboardLayoutProps {
  children: ReactNode;
  activeTab?: string;
  breadcrumbs?: BreadcrumbItem[];
  toolType?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeTab = 'tools',
  breadcrumbs = [],
  toolType = ''
}) => {
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { isPremiumUser } = useAuth();
  const [dynamicBreadcrumbs, setDynamicBreadcrumbs] = React.useState<BreadcrumbItem[]>(breadcrumbs);

  useEffect(() => {
    if (!toolType) {
      setDynamicBreadcrumbs(breadcrumbs);
      return;
    }

    const path = location.pathname;
    let updatedBreadcrumbs: BreadcrumbItem[] = [];

    if (path.includes('youtube-to-newsletter') || toolType === 'youtube') {
      updatedBreadcrumbs = [
        { label: 'Projets', path: '/projects' },
        { label: 'YouTube à Newsletter', path: '/youtube-to-newsletter' },
        { label: 'Nouveau document' }
      ];
    } else if (path.includes('/edit/') || path.includes('/create')) {
      if (toolType === 'dce') {
        updatedBreadcrumbs = [
          { label: 'Projets', path: '/projects' },
          { label: 'Dossiers de Consultation', path: '/dce' },
          { label: path.includes('/edit/') ? 'Modifier le dossier' : 'Nouveau dossier' }
        ];
      } else if (toolType === 'technique') {
        updatedBreadcrumbs = [
          { label: 'Projets', path: '/projects' },
          { label: 'Documents Techniques', path: '/technique' },
          { label: path.includes('/edit/') ? 'Modifier le document' : 'Nouveau document' }
        ];
      }
    } else {
      setDynamicBreadcrumbs(breadcrumbs);
      return;
    }

    setDynamicBreadcrumbs(updatedBreadcrumbs);
  }, [location.pathname, toolType, breadcrumbs]);

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

  return (
    <div className="min-h-screen bg-[#0c101b] w-full">
      <SidebarProvider defaultOpen={true}>
        <div className="flex flex-col h-screen overflow-hidden w-full">
          <TopBar onThemeToggle={toggleTheme} isDarkMode={isDarkMode} />
          
          <div className="flex-1 w-full p-6 overflow-auto">
            {dynamicBreadcrumbs.length > 0 && (
              <div className="mb-6">
                <Breadcrumb>
                  <BreadcrumbList className="flex items-center gap-2 text-gray-400">
                    <BreadcrumbItem>
                      <BreadcrumbLink 
                        href="/projects" 
                        className="flex items-center text-gray-400 hover:text-white text-sm"
                      >
                        <Home size={14} className="mr-1" />
                        <span>Projets</span>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    
                    {dynamicBreadcrumbs.map((item, index) => (
                      <React.Fragment key={index}>
                        <BreadcrumbSeparator className="text-gray-600" />
                        {item.path ? (
                          <BreadcrumbItem>
                            <BreadcrumbLink 
                              href={item.path} 
                              onClick={(e) => handlePremiumLink(e, item.path || '')}
                              className="text-gray-400 hover:text-white text-sm"
                            >
                              {item.label}
                            </BreadcrumbLink>
                          </BreadcrumbItem>
                        ) : (
                          <BreadcrumbItem>
                            <BreadcrumbPage className="text-white text-sm">{item.label}</BreadcrumbPage>
                          </BreadcrumbItem>
                        )}
                      </React.Fragment>
                    ))}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            )}
            <div className="w-full max-w-full">
              {children}
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
