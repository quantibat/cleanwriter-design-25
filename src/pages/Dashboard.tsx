
import React, { useState } from 'react';
import TopBar from '@/components/dashboard/TopBar';
import SidebarNavigation from '@/components/dashboard/SidebarNavigation';
import TabNavigation from '@/components/dashboard/TabNavigation';
import ToolsTab from '@/components/dashboard/tabs/ToolsTab';
import ProjectsTab from '@/components/dashboard/tabs/ProjectsTab';
import ContributeTab from '@/components/dashboard/tabs/ContributeTab';
import { SidebarProvider } from '@/components/ui/sidebar';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("tools");
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  
  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <SidebarNavigation 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
        />
        <div className="flex-1 flex flex-col">
          <TopBar 
            onThemeToggle={handleThemeToggle} 
            isDarkMode={isDarkMode} 
          />
          <main className="flex-1">
            <TabNavigation 
              activeTab={activeTab} 
              onTabChange={handleTabChange} 
            />
            
            <div className="mt-6 px-6">
              {activeTab === "tools" && <ToolsTab />}
              {activeTab === "projects" && <ProjectsTab />}
              {activeTab === "contribute" && <ContributeTab />}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
