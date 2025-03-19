import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { FolderPlus, Edit, Eye, Trash2, Calendar, Database, Clock } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

// Liste étendue de projets avec données supplémentaires
const projects = [{
  id: 1,
  title: "DCE Rénovation Mairie",
  type: "Appel d'offres",
  elements: 12,
  description: "Dossier de consultation pour la rénovation de la mairie du 5ème arrondissement.",
  date: "15 juin 2023",
  lastModified: "22 juillet 2023",
  progress: 75,
  collaborators: 3,
  details: "Ce dossier concerne les travaux de rénovation énergétique et d'accessibilité pour la mairie du 5ème arrondissement. Il inclut la réfection de la façade, le remplacement des fenêtres, et la mise aux normes des installations électriques."
}, {
  id: 2,
  title: "Construction École Primaire",
  type: "Consultation",
  elements: 24,
  description: "Appel d'offres pour la construction d'une nouvelle école primaire.",
  date: "22 juin 2023",
  lastModified: "30 juin 2023",
  progress: 30,
  collaborators: 5,
  details: "Construction d'une école primaire de 10 classes avec restauration scolaire, espaces récréatifs et équipements sportifs. Le projet comprend également l'aménagement des abords et des accès pour les personnes à mobilité réduite."
}, {
  id: 3,
  title: "Réfection Voirie",
  type: "Marché public",
  elements: 8,
  description: "Consultation des entreprises pour la réfection des voiries communales.",
  date: "10 mai 2023",
  lastModified: "15 août 2023",
  progress: 100,
  collaborators: 2,
  details: "Réfection complète de la voirie dans le quartier nord, incluant le revêtement de la chaussée, la réfection des trottoirs, la mise en place d'un nouveau système d'évacuation des eaux pluviales et l'installation de mobilier urbain."
}, {
  id: 4,
  title: "Aménagement Parc Municipal",
  type: "Concours",
  elements: 15,
  description: "Concours pour l'aménagement d'un nouveau parc urbain.",
  date: "5 avril 2023",
  lastModified: "12 septembre 2023",
  progress: 60,
  collaborators: 4,
  details: "Aménagement d'un parc public de 3 hectares avec aires de jeux, espaces verts, plan d'eau et mobilier urbain innovant. Le projet doit respecter des normes environnementales strictes et prévoir l'intégration d'énergies renouvelables."
}, {
  id: 5,
  title: "Construction Centre Médical",
  type: "Appel d'offres",
  elements: 20,
  description: "Dossier de consultation pour la construction d'un centre médical de proximité.",
  date: "18 mars 2023",
  lastModified: "3 octobre 2023",
  progress: 45,
  collaborators: 6,
  details: "Construction d'un centre médical de proximité de 1200m² comprenant 15 cabinets médicaux, une salle de radiologie, un espace d'accueil et un parking souterrain. Le bâtiment devra répondre aux normes d'accessibilité et d'efficacité énergétique les plus récentes."
}];
type Project = typeof projects[0];
const ProjectsTab = () => {
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const [projectsList, setProjectsList] = useState<Project[]>(projects);
  const handleOpenView = (project: Project) => {
    navigate(`/view-dce/${project.id}`, {
      state: {
        project
      }
    });
  };
  const handleOpenEdit = (project: Project) => {
    navigate(`/edit-dce/${project.id}`, {
      state: {
        project
      }
    });
  };
  const handleDelete = (projectId: number) => {
    // Confirmation de suppression
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
      // Filtrer la liste pour supprimer le projet avec l'ID spécifié
      const updatedProjects = projectsList.filter(project => project.id !== projectId);
      setProjectsList(updatedProjects);
      toast({
        title: "Projet supprimé",
        description: "Le dossier a été supprimé avec succès."
      });
    }
  };
  const handleOpenCreate = () => {
    navigate('/create-dce');
  };
  return <div className="space-y-6">
      <div className="flex items-center justify-between gap-y-4">
        <div>
          <h2 className="text-2xl font-bold">Tous vos projets</h2>
          <p className="text-muted-foreground">Liste complète des dossiers et projets associés à votre compte</p>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600" onClick={handleOpenCreate}>
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
            {projectsList.map(project => <TableRow key={project.id}>
                <TableCell className="font-medium">{project.title}</TableCell>
                <TableCell>
                  <span className="flex items-center gap-1">
                    <Database className="h-3.5 w-3.5 text-muted-foreground" />
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
                    <Button variant="outline" size="sm" onClick={() => handleDelete(project.id)} title="Supprimer le projet" className="flex items-center gap-1 text-red-500 hover:text-red-700 hover:bg-red-100/10">
                      <Trash2 className="h-3.5 w-3.5" />
                      Supprimer
                    </Button>
                  </div>
                </TableCell>
              </TableRow>)}
          </TableBody>
        </Table>
      </div>
    </div>;
};
export default ProjectsTab;