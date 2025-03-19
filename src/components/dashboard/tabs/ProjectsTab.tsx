
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { FolderPlus, Edit, Eye, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

const projects = [
  {
    id: 1,
    title: "DCE Rénovation Mairie",
    description: "Dossier de consultation pour la rénovation de la mairie du 5ème arrondissement.",
    date: "15 juin 2023",
    progress: 75,
    collaborators: 3,
    details: "Ce dossier concerne les travaux de rénovation énergétique et d'accessibilité pour la mairie du 5ème arrondissement. Il inclut la réfection de la façade, le remplacement des fenêtres, et la mise aux normes des installations électriques.",
  },
  {
    id: 2,
    title: "Construction École Primaire",
    description: "Appel d'offres pour la construction d'une nouvelle école primaire.",
    date: "22 juin 2023",
    progress: 30,
    collaborators: 5,
    details: "Construction d'une école primaire de 10 classes avec restauration scolaire, espaces récréatifs et équipements sportifs. Le projet comprend également l'aménagement des abords et des accès pour les personnes à mobilité réduite.",
  },
  {
    id: 3,
    title: "Réfection Voirie",
    description: "Consultation des entreprises pour la réfection des voiries communales.",
    date: "10 mai 2023",
    progress: 100,
    collaborators: 2,
    details: "Réfection complète de la voirie dans le quartier nord, incluant le revêtement de la chaussée, la réfection des trottoirs, la mise en place d'un nouveau système d'évacuation des eaux pluviales et l'installation de mobilier urbain.",
  }
];

type Project = typeof projects[0];

const ProjectsTab = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [projectsList, setProjectsList] = useState<Project[]>(projects);

  const handleOpenView = (project: Project) => {
    navigate(`/view-dce/${project.id}`, { state: { project } });
  };

  const handleOpenEdit = (project: Project) => {
    navigate(`/edit-dce/${project.id}`, { state: { project } });
  };

  const handleOpenCreate = () => {
    navigate('/create-dce');
  };

  const handleDelete = (projectId: number) => {
    // Filtrer la liste pour supprimer le projet avec l'ID spécifié
    const updatedProjects = projectsList.filter(project => project.id !== projectId);
    setProjectsList(updatedProjects);
    
    toast({
      title: "Projet supprimé",
      description: "Le dossier a été supprimé avec succès.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Vos dossiers</h2>
          <p className="text-muted-foreground">Gérez et suivez l'avancement de vos dossiers de consultation</p>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600" onClick={handleOpenCreate}>
          <FolderPlus className="h-4 w-4 mr-2" />
          Nouveau dossier
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Avancement</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projectsList.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.title}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>{project.date}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-full max-w-24 bg-white/10 h-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs">{project.progress}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleOpenView(project)}
                      title="Voir le dossier"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleOpenEdit(project)}
                      title="Modifier le dossier"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDelete(project.id)}
                      title="Supprimer le dossier"
                      className="text-red-500 hover:text-red-700 hover:bg-red-100/10"
                    >
                      <Trash2 className="h-4 w-4" />
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
