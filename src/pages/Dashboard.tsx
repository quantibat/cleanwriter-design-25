
import React, { useState } from 'react';
import TopBar from '@/components/dashboard/TopBar';
import SidebarNavigation from '@/components/dashboard/SidebarNavigation';
import ToolsTab from '@/components/dashboard/tabs/ToolsTab';
import ProjectsTab from '@/components/dashboard/tabs/ProjectsTab';
import ContributeTab from '@/components/dashboard/tabs/ContributeTab';
import { SidebarProvider } from "@/components/ui/sidebar";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('tools');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark-theme');
  };

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider defaultOpen={true}>
        <div className="flex h-screen overflow-hidden">
          <SidebarNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          
          <main className="flex-1 flex flex-col overflow-hidden">
            <TopBar onThemeToggle={toggleTheme} isDarkMode={isDarkMode} />
            
            <div className="flex-1 overflow-auto p-4 md:p-6">
              {activeTab === 'tools' && <ToolsTab />}
              {activeTab === 'projects' && <ProjectsTab />}
              {activeTab === 'contribute' && <ContributeTab />}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;
