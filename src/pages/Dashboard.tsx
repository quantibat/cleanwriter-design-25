
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import ToolsTab from '@/components/dashboard/tabs/ToolsTab';
import ProjectsTab from '@/components/dashboard/tabs/ProjectsTab';
import ContributeTab from '@/components/dashboard/tabs/ContributeTab';
import { useNotificationsManager } from '@/hooks/useNotificationsManager';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('tools');
  const { notifySuccess } = useNotificationsManager();
  const { isPremiumUser } = useAuth();
  const navigate = useNavigate();
  
  // Vérifier si l'utilisateur est premium
  useEffect(() => {
    if (!isPremiumUser) {
      toast({
        title: "Fonctionnalité premium",
        description: "Cette section nécessite un abonnement premium. Découvrez notre essai gratuit de 7 jours.",
        variant: "default"
      });
      navigate('/upgrade-plan');
    }
  }, [isPremiumUser, navigate]);
  
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
        setActiveTab('projects')
        return <div className="w-full"><ProjectsTab /></div>;
      case 'contribute':
        setActiveTab('contribute')
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
    >
      {renderTabContent()}
    </DashboardLayout>
  );
};

export default Dashboard;
