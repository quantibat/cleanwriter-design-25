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
  return <div className="min-h-screen bg-background w-full">
      <SidebarProvider defaultOpen={true}>
        <div className="flex h-screen overflow-hidden w-full">
          <SidebarNavigation activeTab={activeTab} onTabChange={() => {}} />
          
          <main className="flex-1 flex flex-col overflow-hidden w-full">
            <TopBar onThemeToggle={toggleTheme} isDarkMode={isDarkMode} />
            
            {/* Breadcrumb */}
            <div className="px-6 py-2 border-b border-white/5 w-full">
              <Breadcrumb className="w-full">
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
            
            <div className="flex-1 w-full p-6 overflow-auto">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>;
};
export default DashboardLayout;