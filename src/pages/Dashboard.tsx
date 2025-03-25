
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import ToolsTab from '@/components/dashboard/tabs/ToolsTab';
import ProjectsTab from '@/components/dashboard/tabs/ProjectsTab';
import ContributeTab from '@/components/dashboard/tabs/ContributeTab';
import { useNotificationsManager } from '@/hooks/useNotificationsManager';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('tools');
  const { notifySuccess } = useNotificationsManager();
  const { isLoading } = useAuth();
  
  // Exemple de notification de bienvenue
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    
    if (!hasSeenWelcome) {
      setTimeout(() => {
        notifySuccess(
          'Bienvenue sur votre tableau de bord',
          'Utilisez les outils disponibles pour gérer vos DCE efficacement.',
          true
        );
        localStorage.setItem('hasSeenWelcome', 'true');
      }, 1500);
    }
  }, [notifySuccess]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

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

  // If still loading, show a loading indicator
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0c101b] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const breadcrumbs = [
    { label: activeTab === 'tools' ? 'Outils' : activeTab === 'projects' ? 'Projets' : 'Contribuer' }
  ];

  return (
    <DashboardLayout 
      activeTab={activeTab} 
      onTabChange={handleTabChange}
      breadcrumbs={breadcrumbs}
    >
      <div className="w-full">
        {renderTabContent()}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
