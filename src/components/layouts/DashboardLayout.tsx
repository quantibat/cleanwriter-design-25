
import React, { ReactNode } from 'react';
import TopBar from '@/components/dashboard/TopBar';
import { SidebarProvider } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';
import N8nChat from '@/pages/Chat';

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
  activeTab,
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
      updatedBreadcrumbs = [{
        label: 'Projets',
        path: '/projects'
      },{
        label: 'Nouveau document'
      }];
    } else if (path.includes('/edit/') || path.includes('/create')) {
      if (toolType === 'dce') {
        updatedBreadcrumbs = [{
          label: 'Projets',
          path: '/projects'
        }, {
          label: 'Dossiers de Consultation',
          path: '/dce'
        }, {
          label: path.includes('/edit/') ? 'Modifier le dossier' : 'Nouveau dossier'
        }];
      } else if (toolType === 'technique') {
        updatedBreadcrumbs = [{
          label: 'Projets',
          path: '/projects'
        }, {
          label: 'Documents Techniques',
          path: '/technique'
        }, {
          label: path.includes('/edit/') ? 'Modifier le document' : 'Nouveau document'
        }];
      }
    } else {
      setDynamicBreadcrumbs(breadcrumbs);
      return;
    }
    setDynamicBreadcrumbs(updatedBreadcrumbs);
  }, [location.pathname, toolType, breadcrumbs]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
      document.documentElement.style.setProperty('--background', '#FFFFFF');
      document.documentElement.style.setProperty('--foreground', '#000000');
      document.documentElement.style.setProperty('--card', '#FFFFFF');
      document.documentElement.style.setProperty('--card-foreground', '#000000');
      document.documentElement.style.setProperty('--popover', '#FFFFFF');
      document.documentElement.style.setProperty('--popover-foreground', '#000000');
      document.documentElement.style.setProperty('--sidebar-background', '#FFFFFF');
      document.documentElement.style.setProperty('--sidebar-foreground', '#000000');
      document.documentElement.style.setProperty('--muted', '#F9FAFB');
      document.documentElement.style.setProperty('--muted-foreground', '#71717A');
      document.documentElement.style.setProperty('--accent', '#F9FAFB');
      document.documentElement.style.setProperty('--accent-foreground', '#000000');
      document.documentElement.style.setProperty('--sidebar-accent', '#F9FAFB');
      document.documentElement.style.setProperty('--sidebar-accent-foreground', '#000000');
      document.documentElement.style.setProperty('--border', '#E4E4E7');
      document.documentElement.style.setProperty('--sidebar-border', '#E4E4E7');
      document.documentElement.style.setProperty('--topbar-background', '#FFFFFF');
      document.documentElement.style.setProperty('--topbar-border', '#E4E4E7');
      document.documentElement.style.setProperty('--topbar-text', '#000000');
      document.documentElement.style.setProperty('--topbar-text-muted', '#71717A');
      document.documentElement.style.setProperty('--topbar-hover', '#F9FAFB');
      document.documentElement.style.setProperty('--dashboard-background', '#FFFFFF');
      document.documentElement.style.setProperty('--dashboard-text', '#000000');
      document.documentElement.style.setProperty('--dashboard-text-muted', '#71717A');
      document.documentElement.style.setProperty('--dashboard-border', '#E4E4E7');
      document.documentElement.style.setProperty('--dashboard-hover', '#F9FAFB');
      document.body.style.backgroundImage = 'none';
      document.body.style.backgroundColor = '#FFFFFF';
    } else {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
      document.documentElement.style.removeProperty('--background');
      document.documentElement.style.removeProperty('--foreground');
      document.documentElement.style.removeProperty('--card');
      document.documentElement.style.removeProperty('--card-foreground');
      document.documentElement.style.removeProperty('--popover');
      document.documentElement.style.removeProperty('--popover-foreground');
      document.documentElement.style.removeProperty('--sidebar-background');
      document.documentElement.style.removeProperty('--sidebar-foreground');
      document.documentElement.style.removeProperty('--muted');
      document.documentElement.style.removeProperty('--muted-foreground');
      document.documentElement.style.removeProperty('--accent');
      document.documentElement.style.removeProperty('--accent-foreground');
      document.documentElement.style.removeProperty('--sidebar-accent');
      document.documentElement.style.removeProperty('--sidebar-accent-foreground');
      document.documentElement.style.removeProperty('--border');
      document.documentElement.style.removeProperty('--sidebar-border');
      document.documentElement.style.removeProperty('--topbar-background');
      document.documentElement.style.removeProperty('--topbar-border');
      document.documentElement.style.removeProperty('--topbar-text');
      document.documentElement.style.removeProperty('--topbar-text-muted');
      document.documentElement.style.removeProperty('--topbar-hover');
      document.documentElement.style.removeProperty('--dashboard-background');
      document.documentElement.style.removeProperty('--dashboard-text');
      document.documentElement.style.removeProperty('--dashboard-text-muted');
      document.documentElement.style.removeProperty('--dashboard-border');
      document.documentElement.style.removeProperty('--dashboard-hover');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--dashboard-background,#0c101b)] w-full">
      <SidebarProvider defaultOpen={true}>
        <div className="flex flex-col h-screen overflow-auto w-full">
          <div className="flex flex-row">
            <div className="flex-1">
              <TopBar onThemeToggle={toggleTheme} isDarkMode={isDarkMode} activeTab={activeTab} />
              <div className="mx-auto w-[85%] p-0">
                {dynamicBreadcrumbs.length > 0 && (
                  <div className="pt-8">
                    <Breadcrumb>
                      <BreadcrumbList className="flex items-center space-x-2 text-[var(--dashboard-text-muted,#9CA3AF)]">
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/dashboard" className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                            <Home size={16} className="mr-1" />
                            <span>Tableau de bord</span>
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        
                        {dynamicBreadcrumbs.map((item, index) => (
                          <React.Fragment key={index}>
                            <BreadcrumbSeparator className="text-[var(--dashboard-text-muted,#71717A)]" />
                            {item.path ? (
                              <BreadcrumbItem>
                                <BreadcrumbLink href={item.path} className="text-[var(--dashboard-text,#FFFFFF)] hover:text-blue-300 transition-colors">
                                  {item.label}
                                </BreadcrumbLink>
                              </BreadcrumbItem>
                            ) : (
                              <BreadcrumbItem>
                                <BreadcrumbPage className="text-[var(--dashboard-text-muted,#71717A)] font-medium">{item.label}</BreadcrumbPage>
                              </BreadcrumbItem>
                            )}
                          </React.Fragment>
                        ))}
                      </BreadcrumbList>
                    </Breadcrumb>
                  </div>
                )}
                <div className="w-full">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
