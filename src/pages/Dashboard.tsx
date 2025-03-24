
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
  const { isPremiumUser } = useAuth();
  
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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'tools':
        return <div className="w-full"><ToolsTab /></div>;
      case 'projects':
        return <div className="w-full"><ProjectsTab /></div>;
      case 'contribute':
        return <div className="w-full"><ContributeTab /></div>;
      default:
        return <div className="w-full"><ToolsTab /></div>;
    }
  };

  const breadcrumbs = [
    { label: activeTab === 'tools' ? 'Outils' : activeTab === 'projects' ? 'Projets' : 'Contribuer' }
  ];

  return (
    <DashboardLayout 
      activeTab={activeTab} 
      breadcrumbs={breadcrumbs}
      onTabChange={setActiveTab}
    >
      {renderTabContent()}
    </DashboardLayout>
  );
};

export default Dashboard;
