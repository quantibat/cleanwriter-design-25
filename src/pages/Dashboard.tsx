
import React, { useState } from 'react';
import TopBar from '@/components/dashboard/TopBar';
import SidebarNavigation from '@/components/dashboard/SidebarNavigation';
import ToolsTab from '@/components/dashboard/tabs/ToolsTab';
import ProjectsTab from '@/components/dashboard/tabs/ProjectsTab';
import ContributeTab from '@/components/dashboard/tabs/ContributeTab';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('tools');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark-theme');
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar onThemeToggle={toggleTheme} isDarkMode={isDarkMode} />
      
      <div className="flex h-[calc(100vh-64px)]">
        <SidebarProvider defaultOpen={true}>
          <SidebarNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          <SidebarInset className="p-6">
            {activeTab === 'tools' && <ToolsTab />}
            {activeTab === 'projects' && <ProjectsTab />}
            {activeTab === 'contribute' && <ContributeTab />}
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default Dashboard;
