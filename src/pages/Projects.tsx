
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { FolderPlus,  RefreshCw, LayoutGrid, Table as TableIcon } from "lucide-react";
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useProjects } from '@/hooks/useProjects';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FolderByTypeSection, FolderCard } from '@/components/FolderCard';

const Projects = () => {
  const navigate = useNavigate();
  const { getUserProjects, isLoading, error } = useProjects();
  const [retryCount, setRetryCount] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');

  const [projectsList, setProjectsList] = useState([]);



  const fetchProjects = useCallback(async () => {
    const projects = await getUserProjects();
    if (projects) {
      setProjectsList(projects);
    }
  }, [getUserProjects]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects, retryCount]);
  useEffect(() => {
    getUserProjects();
  }, [retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  const breadcrumbs = [
    { label: 'Projets' }
  ];

  const projets = [
    {
      id: 1,
      title: "Refonte du site vitrine",
      date: "2025-03-10",
      created_at: "2025-01-15",
      status: "En cours",
      collaborateur: "Julie Martin",
      type: "Projet Web",
    },
    {
      id: 2,
      title: "Application mobile RH",
      date: "2025-01-22",
      created_at: "2024-12-01",
      status: "Terminé",
      collaborateur: "Thomas Dupont",
      type: "Application Mobile",
    },
    {
      id: 3,
      title: "Application mobile RH",
      date: "2025-01-22",
      created_at: "2024-12-01",
      status: "Terminé",
      collaborateur: "Thomas Dupont",
      type: "Application Mobile",
    },
    {
      id: 4,
      title: "Campagne marketing Printemps",
      date: "2025-02-15",
      created_at: "2025-01-05",
      status: "En attente",
      collaborateur: "Laura Bernard",
      type: "Communication",
    },
    {
      id: 5,
      title: "Intégration maquette Figma",
      date: "2025-02-02",
      created_at: "2025-01-10",
      status: "Terminé",
      collaborateur: "Alice Moreau",
      type: "Intégration Web",
    }
  ];
  
  

  return (
    <DashboardLayout activeTab="projects" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className='space-y-2 pt-4'>
            <h1 className="text-2xl font-bold">Tous vos projets crées</h1>
            <p className="text-muted-foreground">
              Liste complète des projets et contenus associés à votre compte
            </p>
          </div>
          <div className="flex gap-2">

            <Button onClick={() => navigate('/create-dce')}>
              <FolderPlus className="h-4 w-4 mr-2" />
              Nouveau projet
            </Button>
          </div>
        </div>
  
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Erreur de connexion</AlertTitle>
            <AlertDescription>
              {error}
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-2" 
                onClick={handleRetry}
                disabled={isLoading}
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Réessayer
              </Button>
            </AlertDescription>
          </Alert>
        )}
  
        {isLoading ? (
          <div className="text-center py-8">Chargement des projets...</div>
        ) : projectsList.length === 0 && !error ? (
          <div className="border rounded-md p-8 text-center">
            <p className="text-muted-foreground">
              Aucun projet trouvé. Créez votre premier projet en cliquant sur "Nouveau projet".
            </p>
          </div>
        ) : (
          <div>
            <FolderByTypeSection folders={projets} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
  
};

export default Projects;
