
import React, { useState } from 'react';
import { TabsContent } from "@/components/ui/tabs";
import TopBar from '@/components/dashboard/TopBar';
import TabNavigation from '@/components/dashboard/TabNavigation';
import ToolsTab from '@/components/dashboard/tabs/ToolsTab';
import ProjectsTab from '@/components/dashboard/tabs/ProjectsTab';
import ContributeTab from '@/components/dashboard/tabs/ContributeTab';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('tools');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Ici on pourrait ajouter du code pour changer le thème au niveau du document
    document.documentElement.classList.toggle('dark-theme');
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar onThemeToggle={toggleTheme} isDarkMode={isDarkMode} />
      
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-7xl mx-auto py-8 px-6 md:px-10">
        {activeTab === 'tools' && <ToolsTab />}
        {activeTab === 'projects' && <ProjectsTab />}
        {activeTab === 'contribute' && <ContributeTab />}
      </main>
    </div>
  );
};

export default Dashboard;
