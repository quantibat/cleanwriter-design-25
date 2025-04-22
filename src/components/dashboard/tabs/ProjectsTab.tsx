
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { FolderPlus, RefreshCw } from "lucide-react";
import { useProjects } from '@/hooks/useProjects';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FolderCard } from '@/components/FolderCard';
import { useNavigate } from 'react-router-dom';

const ProjectsTab = () => {
  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [retryCount, setRetryCount] = useState(0);
  const { 
    isLoading, 
    error,
    getUserProjects, 
    goToCreateProject 
  } = useProjects();

  const navigate = useNavigate();

  const fetchProjects = useCallback(async () => {
    const projects = await getUserProjects();
    if (projects) {
      setProjectsList(projects);
    }
  }, [getUserProjects]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects, retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };



  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-y-4">
        <div className='py-4'>
          <h2 className="text-2xl font-bold mb-8">Tous vos projets</h2>
          <p className="text-muted-foreground py-[10px]">Liste complète des projets et contenus associés à votre compte</p>
        </div>
        <div className="flex gap-2">
          {isLoading ? null : (
            <Button variant="outline" onClick={handleRetry} disabled={isLoading}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Rafraîchir
            </Button>
          )}
          <Button onClick={goToCreateProject}>
            <FolderPlus className="h-4 w-4 mr-2" />
            Nouveau projet
          </Button>
        </div>
      </div>
      
      {error && (
        <Alert variant="destructive" className="mb-4">
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
      
      <div className="rounded-md border">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {projectsList.map(project => (
        <FolderCard
          key={project.id}
          title={project.title}
          date={project.updated_at}
          status={project.status}
          collaborateur={project.collaborateur || "Non défini"}
          onClick={() =>
            navigate(`/view-project/${project.id}`, {
              state: { project },
            })
          }
        />
      ))}
      </div>
      </div>
    </div>
  );
};

export default ProjectsTab;

