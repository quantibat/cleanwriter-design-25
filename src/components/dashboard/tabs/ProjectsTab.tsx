
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { FolderPlus, Edit, Eye, Trash2, Database, Clock, FileText as FileTextIcon, File as FileIcon, Youtube as YoutubeIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { getUserProjects } from '@/services/projectsService';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

const ProjectsTab = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const projects = await getUserProjects();
        if (projects) {
          setProjectsList(projects);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast({
          title: 'Erreur',
          description: 'Impossible de récupérer vos projets',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [toast]);

  const handleOpenView = (project: any) => {
    const projectData = {
      id: project.id,
      title: project.title,
      type: project.option_type || 'Youtube to Newsletter',
      elements: project.elements || 0,
      description: project.card_title || '',
      date: new Date(project.created_at).toLocaleDateString('fr-FR'),
      lastModified: formatDistanceToNow(new Date(project.updated_at), { locale: fr, addSuffix: true }),
      progress: project.progress || 0,
      collaborators: 1,
      details: `Projet basé sur la vidéo YouTube: ${project.youtube_link || 'Non spécifié'}`
    };
    
    navigate(`/view-project/${project.id}`, {
      state: {
        project: projectData
      }
    });
  };

  const handleOpenEdit = (project: any) => {
    const projectData = {
      id: project.id,
      title: project.title,
      type: project.option_type || 'Youtube to Newsletter',
      elements: project.elements || 0,
      description: project.card_title || '',
      date: new Date(project.created_at).toLocaleDateString('fr-FR'),
      lastModified: formatDistanceToNow(new Date(project.updated_at), { locale: fr, addSuffix: true }),
      progress: project.progress || 0,
      collaborators: 1,
      details: `Projet basé sur la vidéo YouTube: ${project.youtube_link || 'Non spécifié'}`
    };
    
    navigate(`/edit-project/${project.id}`, {
      state: {
        project: projectData
      }
    });
  };

  const handleDelete = (project: any) => {
    const projectData = {
      id: project.id,
      title: project.title,
      type: project.option_type || 'Youtube to Newsletter',
      elements: project.elements || 0,
      description: project.card_title || '',
      date: new Date(project.created_at).toLocaleDateString('fr-FR'),
      lastModified: formatDistanceToNow(new Date(project.updated_at), { locale: fr, addSuffix: true }),
      progress: project.progress || 0,
      collaborators: 1,
      details: `Projet basé sur la vidéo YouTube: ${project.youtube_link || 'Non spécifié'}`
    };
    
    navigate(`/delete-project/${project.id}`, {
      state: {
        project: projectData
      }
    });
  };

  const handleOpenCreate = () => {
    navigate('/create-dce');
  };

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
        <Button onClick={handleOpenCreate}>
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
                      {formatDistanceToNow(new Date(project.updated_at), { locale: fr, addSuffix: true })}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleOpenView(project)} 
                        title="Voir le projet" 
                        className="flex items-center gap-1"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Voir
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleOpenEdit(project)} 
                        title="Modifier le projet" 
                        className="flex items-center gap-1"
                      >
                        <Edit className="h-3.5 w-3.5" />
                        Modifier
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDelete(project)} 
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
