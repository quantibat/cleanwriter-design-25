import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FolderPlus, Database, Clock, FileText as FileTextIcon, File as FileIcon, Youtube as YoutubeIcon } from "lucide-react";
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useProjects } from '@/hooks/useProjects';

const Projects = () => {
  const navigate = useNavigate();
  const { getUserProjects, isLoading } = useProjects();
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsList = await getUserProjects();
      if (projectsList) {
        setProjects(projectsList);
      }
    };

    fetchProjects();
  }, [getUserProjects]);

  const getIconForType = (type: string) => {
    switch(type) {
      case "newsletter":
      case "Youtube to Newsletter":
        return <YoutubeIcon className="h-5 w-5 text-red-500" />;
      case "transcript":
      case "Transcription":
        return <FileTextIcon className="h-5 w-5 text-blue-500" />;
      case "summary":
      case "Résumé":
        return <FileIcon className="h-5 w-5 text-green-500" />;
      default:
        return <Database className="h-5 w-5 text-muted-foreground" />;
    }
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
          <Button onClick={() => navigate('/create-project')}>
            <FolderPlus className="h-4 w-4 mr-2" />
            Nouveau projet
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-8">Chargement des projets...</div>
        ) : projects.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">Aucun projet trouvé. Créez votre premier projet en cliquant sur "Nouveau projet".</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="hover:bg-accent/50 transition-colors cursor-pointer" onClick={() => navigate(`/view-project/${project.id}`, { state: { project } })}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {getIconForType(project.option_type)}
                      <h3 className="font-semibold">{project.title}</h3>
                    </div>
                    <span className="text-sm text-muted-foreground">{project.progress}%</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Database className="h-4 w-4" />
                      {project.elements || 0} éléments
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {new Date(project.updated_at).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Projects;
