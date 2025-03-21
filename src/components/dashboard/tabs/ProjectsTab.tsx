
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { FolderPlus, Edit, Eye, Trash2, Database, Clock, FileText as FileTextIcon, File as FileIcon, Youtube as YoutubeIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

// Liste étendue de projets avec données supplémentaires
const projects = [{
  id: 1,
  title: "Youtube to Newsletter - JM Corda",
  type: "Youtube to Newsletter",
  elements: 3,
  description: "Transformation de la vidéo 'DÉMOLITION' de JP Fanguin par Jm Corda en newsletter",
  date: "15 juin 2023",
  lastModified: "Aujourd'hui",
  progress: 75,
  collaborators: 3,
  icon: YoutubeIcon,
  details: "Ce projet transforme du contenu YouTube en newsletter prête à l'emploi avec des sujets variés et une mise en forme professionnelle."
}, {
  id: 2,
  title: "Webinaire Marketing Digital",
  type: "Youtube to Newsletter",
  elements: 4,
  description: "Newsletter basée sur le webinaire de stratégies marketing digital",
  date: "22 juin 2023",
  lastModified: "Hier",
  progress: 30,
  collaborators: 2,
  icon: YoutubeIcon,
  details: "Transformation d'un webinaire sur les stratégies de marketing digital en série de newsletters ciblées pour différents segments d'audience."
}, {
  id: 3,
  title: "Interview CEO - Transcription",
  type: "Transcription",
  elements: 1,
  description: "Transcription de l'interview du CEO pour le blog d'entreprise",
  date: "10 mai 2023",
  lastModified: "15 août 2023",
  progress: 100,
  collaborators: 1,
  icon: FileTextIcon,
  details: "Transcription complète de l'interview du CEO comprenant les points clés sur la vision de l'entreprise pour 2024 et les nouvelles initiatives stratégiques."
}, {
  id: 4,
  title: "Conférence Tech - Points clés",
  type: "Résumé",
  elements: 5,
  description: "Résumé des points clés de la conférence TechInnovate 2023",
  date: "5 avril 2023",
  lastModified: "12 septembre 2023",
  progress: 60,
  collaborators: 2,
  icon: FileIcon,
  details: "Synthèse des innovations présentées lors de la conférence TechInnovate 2023, avec focus sur l'IA, la blockchain et les énergies renouvelables."
}, {
  id: 5,
  title: "Formation Leadership - Newsletter",
  type: "Youtube to Newsletter",
  elements: 3,
  description: "Transformation de la formation leadership en série de newsletters",
  date: "18 mars 2023",
  lastModified: "3 octobre 2023",
  progress: 45,
  collaborators: 1,
  icon: YoutubeIcon,
  details: "Série de newsletters basées sur une formation complète de leadership, découpée en modules thématiques pour faciliter l'apprentissage progressif."
}];

type Project = typeof projects[0];

const ProjectsTab = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [projectsList, setProjectsList] = useState<Project[]>(projects);

  const handleOpenView = (project: Project) => {
    navigate(`/view-dce/${project.id}`, {
      state: {
        project
      }
    });
  };

  const handleOpenEdit = (project: Project) => {
    navigate(`/edit-project/${project.id}`, {
      state: {
        project
      }
    });
  };

  const handleDelete = (project: Project) => {
    navigate(`/delete-project/${project.id}`, {
      state: {
        project
      }
    });
  };

  const handleOpenCreate = () => {
    navigate('/create-dce');
  };

  const getIconForType = (type: string) => {
    switch(type) {
      case "Youtube to Newsletter":
        return <YoutubeIcon className="h-3.5 w-3.5 text-red-500" />;
      case "Transcription":
        return <FileTextIcon className="h-3.5 w-3.5 text-blue-500" />;
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
            {projectsList.map(project => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.title}</TableCell>
                <TableCell>
                  <span className="flex items-center gap-1">
                    {getIconForType(project.type)}
                    {project.type}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="flex items-center gap-1">
                    <Database className="h-3.5 w-3.5 text-muted-foreground" />
                    {project.elements} éléments
                  </span>
                </TableCell>
                <TableCell>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    {project.lastModified}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleOpenView(project)} title="Voir le projet" className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" />
                      Voir
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleOpenEdit(project)} title="Modifier le projet" className="flex items-center gap-1">
                      <Edit className="h-3.5 w-3.5" />
                      Modifier
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(project)} title="Supprimer le projet" className="flex items-center gap-1 text-red-500 hover:text-red-700 hover:bg-red-100/10">
                      <Trash2 className="h-3.5 w-3.5" />
                      Supprimer
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProjectsTab;
