
import React, { useState } from 'react';
import TopBar from "@/components/dashboard/TopBar";
import SidebarNavigation from "@/components/dashboard/SidebarNavigation";
import { SidebarProvider } from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("tools");
  
  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <SidebarNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        <div className="flex-1 flex flex-col">
          <TopBar 
            onThemeToggle={handleThemeToggle} 
            isDarkMode={isDarkMode} 
          />
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
