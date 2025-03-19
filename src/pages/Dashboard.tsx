
import React from 'react';
import ToolsTab from '@/components/dashboard/tabs/ToolsTab';
import ProjectsTab from '@/components/dashboard/tabs/ProjectsTab';
import ContributeTab from '@/components/dashboard/tabs/ContributeTab';
import DashboardLayout from '@/components/layouts/DashboardLayout';

const Dashboard = () => {
  const [activeTab, setActiveTab] = React.useState("tools");
  
  return (
    <DashboardLayout>
      <main className="flex-1">
        <div className="px-6 py-6">
          {activeTab === "tools" && <ToolsTab />}
          {activeTab === "projects" && <ProjectsTab />}
          {activeTab === "contribute" && <ContributeTab />}
        </div>
      </main>
    </DashboardLayout>
  );
};

export default Dashboard;
