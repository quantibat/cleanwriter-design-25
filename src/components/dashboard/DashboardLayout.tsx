
import React, { ReactNode } from 'react';
import TopBar from '@/components/dashboard/TopBar';
import SidebarNavigation from '@/components/dashboard/SidebarNavigation';
import { SidebarProvider } from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isDarkMode, setIsDarkMode] = React.useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark-theme');
  };

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider defaultOpen={true}>
        <div className="flex h-screen overflow-hidden">
          <SidebarNavigation activeTab="projects" onTabChange={() => {}} />
          
          <main className="flex-1 flex flex-col overflow-hidden">
            <TopBar onThemeToggle={toggleTheme} isDarkMode={isDarkMode} />
            
            <div className="flex-1 overflow-auto">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
