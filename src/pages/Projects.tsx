
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { FolderPlus, Database, Clock, RefreshCw, LayoutGrid, Table as TableIcon } from "lucide-react";
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useProjects } from '@/hooks/useProjects';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ProjectsGrid from '@/components/projects/ProjectsGrid';
import ProjectsTable from '@/components/projects/ProjectsTable';

const Projects = () => {
  const navigate = useNavigate();
  const { getUserProjects, isLoading, error } = useProjects();
  const [projects, setProjects] = useState<any[]>([]);
  const [retryCount, setRetryCount] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');

  const fetchProjects = async () => {
    const projectsList = await getUserProjects();
    if (projectsList) {
      setProjects(projectsList);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  const breadcrumbs = [
    { label: 'Projets' }
  ];

  return (
    <DashboardLayout activeTab="projects" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Tous vos projets</h1>
            <p className="text-muted-foreground">Liste complète des projets et contenus associés à votre compte</p>
          </div>
          <div className="flex gap-2">
            <div className="flex border rounded-md overflow-hidden">
              <Button 
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                className="rounded-none"
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewMode === 'table' ? 'default' : 'ghost'}
                size="sm"
                className="rounded-none"
                onClick={() => setViewMode('table')}
              >
                <TableIcon className="h-4 w-4" />
              </Button>
            </div>
            {isLoading ? null : (
              <Button variant="outline" onClick={handleRetry} disabled={isLoading}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Rafraîchir
              </Button>
            )}
            <Button onClick={() => navigate('/create-project')}>
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
        ) : projects.length === 0 && !error ? (
          <div className="border rounded-md p-8 text-center">
            <p className="text-muted-foreground">Aucun projet trouvé. Créez votre premier projet en cliquant sur "Nouveau projet".</p>
          </div>
        ) : (
          viewMode === 'grid' ? (
            <ProjectsGrid projects={projects} />
          ) : (
            <ProjectsTable projects={projects} />
          )
        )}
      </div>
    </DashboardLayout>
  );
};

export default Projects;
