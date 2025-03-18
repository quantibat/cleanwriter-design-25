
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderPlus, Calendar, Clock, Users, Edit, Eye } from "lucide-react";

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

  const handleOpenView = (project: Project) => {
    navigate(`/view-dce/${project.id}`, { state: { project } });
  };

  const handleOpenEdit = (project: Project) => {
    navigate(`/edit-dce/${project.id}`, { state: { project } });
  };

  const handleOpenCreate = () => {
    navigate('/create-dce');
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
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => handleOpenEdit(project)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-4">
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {project.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {project.progress}% terminé
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span className="text-sm text-muted-foreground">{project.collaborators} collaborateurs</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-white/10 hover:bg-white/10"
                onClick={() => handleOpenView(project)}
              >
                <Eye className="h-4 w-4 mr-1" />
                Ouvrir
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectsTab;
