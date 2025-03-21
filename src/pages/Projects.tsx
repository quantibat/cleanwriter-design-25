
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import ProjectsTab from '@/components/dashboard/tabs/ProjectsTab';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Projects = () => {
  const { isPremiumUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
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
  }, [isPremiumUser, navigate, toast]);
  
  const breadcrumbs = [
    { label: 'Projets' }
  ];

  return (
    <DashboardLayout 
      activeTab="projects" 
      breadcrumbs={breadcrumbs}
    >
      <div className="w-full max-w-full">
        <ProjectsTab />
      </div>
    </DashboardLayout>
  );
};

export default Projects;
