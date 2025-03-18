
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { FolderPlus, Calendar, Clock, Users, MoreHorizontal, Edit, Eye } from "lucide-react";
import { useForm } from "react-hook-form";

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

type ProjectFormData = {
  title: string;
  description: string;
  details: string;
};

const ProjectsTab = () => {
  const [viewingProject, setViewingProject] = useState<Project | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  
  const form = useForm<ProjectFormData>({
    defaultValues: {
      title: '',
      description: '',
      details: ''
    }
  });

  const handleOpenView = (project: Project) => {
    setViewingProject(project);
  };

  const handleCloseView = () => {
    setViewingProject(null);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project);
    form.reset({
      title: project.title,
      description: project.description,
      details: project.details
    });
  };

  const handleCloseEdit = () => {
    setEditingProject(null);
  };

  const handleOpenCreate = () => {
    setIsCreating(true);
    form.reset({
      title: '',
      description: '',
      details: ''
    });
  };

  const handleCloseCreate = () => {
    setIsCreating(false);
  };

  const onSubmitEdit = (data: ProjectFormData) => {
    // In a real application, this would update the project in the database
    console.log('Edited project data:', data);
    handleCloseEdit();
  };

  const onSubmitCreate = (data: ProjectFormData) => {
    // In a real application, this would create a new project in the database
    console.log('New project data:', data);
    handleCloseCreate();
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

      {/* View Project Dialog */}
      <Dialog open={viewingProject !== null} onOpenChange={handleCloseView}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{viewingProject?.title}</DialogTitle>
            <DialogDescription>{viewingProject?.description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 my-4">
            <div className="text-sm space-y-1">
              <div className="font-medium">Date de création:</div>
              <div>{viewingProject?.date}</div>
            </div>
            <div className="text-sm space-y-1">
              <div className="font-medium">Avancement:</div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full" 
                  style={{ width: `${viewingProject?.progress}%` }}
                ></div>
              </div>
              <div>{viewingProject?.progress}% terminé</div>
            </div>
            <div className="text-sm space-y-1">
              <div className="font-medium">Collaborateurs:</div>
              <div>{viewingProject?.collaborators} personnes assignées</div>
            </div>
            <div className="text-sm space-y-1">
              <div className="font-medium">Description détaillée:</div>
              <div className="whitespace-pre-line">{viewingProject?.details}</div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseView}>Fermer</Button>
            <Button onClick={() => {
              handleCloseView();
              if (viewingProject) handleOpenEdit(viewingProject);
            }}>Modifier</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Project Dialog */}
      <Dialog open={editingProject !== null} onOpenChange={handleCloseEdit}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Modifier le dossier</DialogTitle>
            <DialogDescription>Modifiez les détails du dossier. Cliquez sur sauvegarder une fois terminé.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitEdit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description détaillée</FormLabel>
                    <FormControl>
                      <Textarea rows={5} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleCloseEdit}>Annuler</Button>
                <Button type="submit">Sauvegarder</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Create Project Dialog */}
      <Dialog open={isCreating} onOpenChange={handleCloseCreate}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Créer un nouveau dossier</DialogTitle>
            <DialogDescription>Ajoutez les détails de votre nouveau dossier de consultation.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitCreate)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Rénovation École Jules Ferry" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Brève description du dossier" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description détaillée</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Description complète du projet, exigences, contraintes, etc." 
                        rows={5} 
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleCloseCreate}>Annuler</Button>
                <Button type="submit">Créer le dossier</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectsTab;
