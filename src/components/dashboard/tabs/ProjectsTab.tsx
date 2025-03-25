
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { FolderPlus, Edit, Eye, Trash2, Database, Clock, FileText as FileTextIcon, File as FileIcon, Youtube as YoutubeIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useProjects } from '@/hooks/useProjects';

const ProjectsTab = () => {
  const [projectsList, setProjectsList] = useState<any[]>([]);
  const { 
    isLoading, 
    getUserProjects, 
    viewProject, 
    editProject, 
    deleteProjectNavigate, 
    goToCreateProject 
  } = useProjects();

  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await getUserProjects();
      if (projects) {
        setProjectsList(projects);
      }
    };

    fetchProjects();
  }, [getUserProjects]);

  const getIconForType = (type: string) => {
    switch(type) {
      case "newsletter":
      case "Youtube to Newsletter":
        return <YoutubeIcon className="h-3.5 w-3.5 text-red-500" />;
      case "transcript":
      case "Transcription":
        return <FileTextIcon className="h-3.5 w-3.5 text-blue-500" />;
      case "summary":
      case "Résumé":
        return <FileIcon className="h-3.5 w-3.5 text-green-500" />;
      default:
        return <Database className="h-3.5 w-3.5 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-y-4">
        <div>
          <h2 className="text-2xl font-bold">Tous vos projets</h2>
          <p className="text-muted-foreground py-[10px]">Liste complète des projets et contenus associés à votre compte</p>
        </div>
        <Button onClick={goToCreateProject}>
          <FolderPlus className="h-4 w-4 mr-2" />
          Nouveau projet
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom du projet</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Nombre d'éléments</TableHead>
              <TableHead>Dernière modification</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  Chargement des projets...
                </TableCell>
              </TableRow>
            ) : projectsList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  Aucun projet trouvé. Créez votre premier projet en cliquant sur "Nouveau projet".
                </TableCell>
              </TableRow>
            ) : (
              projectsList.map(project => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1">
                      {getIconForType(project.option_type)}
                      {project.option_type || 'Youtube to Newsletter'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1">
                      <Database className="h-3.5 w-3.5 text-muted-foreground" />
                      {project.elements || 0} éléments
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                      {new Date(project.updated_at).toLocaleDateString('fr-FR')}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => viewProject(project)} 
                        title="Voir le projet" 
                        className="flex items-center gap-1"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Voir
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => editProject(project)} 
                        title="Modifier le projet" 
                        className="flex items-center gap-1"
                      >
                        <Edit className="h-3.5 w-3.5" />
                        Modifier
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => deleteProjectNavigate(project)} 
                        title="Supprimer le projet" 
                        className="flex items-center gap-1 text-red-500 hover:text-red-700 hover:bg-red-100/10"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Supprimer
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProjectsTab;
