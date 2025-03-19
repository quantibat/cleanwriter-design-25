
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import ToolsTab from '@/components/dashboard/tabs/ToolsTab';
import ProjectsTab from '@/components/dashboard/tabs/ProjectsTab';
import ContributeTab from '@/components/dashboard/tabs/ContributeTab';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('tools');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'tools':
        return <ToolsTab />;
      case 'projects':
        return <ProjectsTab />;
      case 'contribute':
        return <ContributeTab />;
      default:
        return <ToolsTab />;
    }
  };

  const breadcrumbs = [
    { label: activeTab === 'tools' ? 'Outils' : activeTab === 'projects' ? 'Projets' : 'Contribuer' }
  ];

  return (
    <DashboardLayout 
      activeTab={activeTab} 
      breadcrumbs={breadcrumbs}
    >
      {renderTabContent()}
    </DashboardLayout>
  );
};

export default Dashboard;
