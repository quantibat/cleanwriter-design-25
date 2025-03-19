
import React from 'react';
import TabNavigation from '@/components/dashboard/TabNavigation';
import ToolsTab from '@/components/dashboard/tabs/ToolsTab';
import ProjectsTab from '@/components/dashboard/tabs/ProjectsTab';
import ContributeTab from '@/components/dashboard/tabs/ContributeTab';
import DashboardLayout from '@/components/layouts/DashboardLayout';

const Dashboard = () => {
  const [activeTab, setActiveTab] = React.useState("tools");
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  
  return (
    <DashboardLayout>
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
    </DashboardLayout>
  );
};

export default Dashboard;
