
import React, { ReactNode } from 'react';
import TopBar from '@/components/dashboard/TopBar';
import { SidebarProvider } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface DashboardLayoutProps {
  children: ReactNode;
  activeTab?: string;
  onTabChange?: (tab: string) => void; // Add a callback for tab changes
  breadcrumbs?: BreadcrumbItem[];
  toolType?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeTab,
  onTabChange,
  breadcrumbs = [],
  toolType = ''
}) => {
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const location = useLocation();
  const [dynamicBreadcrumbs, setDynamicBreadcrumbs] = React.useState<BreadcrumbItem[]>(breadcrumbs);

  React.useEffect(() => {
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

  // Handle tab changes from TopBar
  const handleTabChange = (newTab: string) => {
    if (onTabChange) {
      onTabChange(newTab);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c101b] w-full">
      <SidebarProvider defaultOpen={true}>
        <div className="flex flex-col h-screen overflow-hidden w-full">
          <TopBar 
            onThemeToggle={toggleTheme} 
            isDarkMode={isDarkMode} 
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
          <div className="flex-1 w-full p-6 overflow-auto">
            {dynamicBreadcrumbs.length > 0 && (
              <div className="mb-6">
                <Breadcrumb>
                  <BreadcrumbList className="flex items-center space-x-2 text-gray-200">
                    <BreadcrumbItem>
                      <BreadcrumbLink 
                        href="/dashboard" 
                        className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <Home size={16} className="mr-1" />
                        <span>Dashboard</span>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    
                    {dynamicBreadcrumbs.map((item, index) => (
                      <React.Fragment key={index}>
                        <BreadcrumbSeparator className="text-gray-500" />
                        {item.path ? (
                          <BreadcrumbItem>
                            <BreadcrumbLink 
                              href={item.path} 
                              className="text-gray-300 hover:text-blue-300 transition-colors"
                            >
                              {item.label}
                            </BreadcrumbLink>
                          </BreadcrumbItem>
                        ) : (
                          <BreadcrumbItem>
                            <BreadcrumbPage className="text-gray-500 font-medium">{item.label}</BreadcrumbPage>
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
