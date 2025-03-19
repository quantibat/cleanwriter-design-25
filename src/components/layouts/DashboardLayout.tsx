import React, { ReactNode } from 'react';
import TopBar from '@/components/dashboard/TopBar';
import SidebarNavigation from '@/components/dashboard/SidebarNavigation';
import { SidebarProvider } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';
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
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark-theme');
  };
  return <div className="min-h-screen bg-background">
      <SidebarProvider defaultOpen={true}>
        <div className="flex h-screen overflow-hidden">
          <SidebarNavigation activeTab={activeTab} onTabChange={() => {}} />
          
          <main className="flex-1 flex flex-col overflow-hidden">
            <TopBar onThemeToggle={toggleTheme} isDarkMode={isDarkMode} />
            
            {/* Breadcrumb */}
            <div className="px-6 py-2 border-b border-white/5">
              <Breadcrumb className="max-w-7xl mx-auto">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/dashboard" className="flex justfiy-center align-center">
                        <Home className="h-4 w-4 mr-1" />
                        Dashboard
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  
                  {breadcrumbs.map((crumb, index) => <React.Fragment key={index}>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        {index === breadcrumbs.length - 1 || !crumb.path ? <BreadcrumbPage>{crumb.label}</BreadcrumbPage> : <BreadcrumbLink asChild>
                            <Link to={crumb.path}>{crumb.label}</Link>
                          </BreadcrumbLink>}
                      </BreadcrumbItem>
                    </React.Fragment>)}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            
            <div className="flex-1 overflow-auto p-4 md:p-6 w-full">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>;
};
export default DashboardLayout;