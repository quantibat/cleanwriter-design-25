
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

const EditProject = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { toast } = useToast();
  
  // Get project from location state or fetch it based on ID
  const project = location.state?.project || null;
  
  // If project not found, handle it
  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center w-full">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Projet non trouvé</h1>
          <p className="mb-6">Le projet que vous cherchez n'existe pas ou a été supprimé.</p>
          <Button onClick={() => navigate('/projects')}>
            Retour aux projets
          </Button>
        </div>
      </div>
    );
  }

  const [progress, setProgress] = useState(project.progress || 0);
  
  const form = useForm({
    defaultValues: {
      title: project.title || '',
      type: project.type || 'Youtube to Newsletter',
      description: project.description || '',
      details: project.details || '',
      collaborators: project.collaborators?.toString() || '1',
    }
  });

  const onSubmit = (data) => {
    // In a real app, you would save the data to your backend
    // Here we'll just show a success message and navigate back
    const updatedProject = {
      ...project,
      ...data,
      progress,
    };
    
    toast({
      title: "Projet mis à jour",
      description: "Les modifications ont été enregistrées avec succès."
    });
    
    navigate('/view-project/' + id, { state: { project: updatedProject } });
  };

  const breadcrumbs = [
    { label: 'Projets', path: '/projects' },
    { label: project.title, path: `/view-project/${id}` },
    { label: 'Modifier' }
  ];

  return (
    <DashboardLayout activeTab="projects" breadcrumbs={breadcrumbs}>
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="outline" 
            size="sm"
            className="gap-1"
            onClick={() => navigate(`/view-project/${id}`, { state: { project } })}
          >
            <ArrowLeft size={16} />
            Retour au projet
          </Button>
          
          <h1 className="text-2xl font-bold">Modifier le projet</h1>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre du projet</FormLabel>
                  <FormControl>
                    <Input placeholder="Titre du projet" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de projet</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Youtube to Newsletter">Youtube to Newsletter</SelectItem>
                      <SelectItem value="Transcription">Transcription</SelectItem>
                      <SelectItem value="Résumé">Résumé</SelectItem>
                      <SelectItem value="Autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
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
                    <Textarea placeholder="Décrivez brièvement votre projet" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Détails du projet</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Ajoutez des détails supplémentaires sur le projet" 
                      className="min-h-32"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-2">
              <FormLabel>Progression ({progress}%)</FormLabel>
              <Slider
                defaultValue={[progress]}
                max={100}
                step={5}
                onValueChange={(values) => setProgress(values[0])}
              />
            </div>
            
            <FormField
              control={form.control}
              name="collaborators"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de collaborateurs</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} max={10} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end space-x-4 pt-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate(`/view-project/${id}`, { state: { project } })}
              >
                Annuler
              </Button>
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" />
                Enregistrer les modifications
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </DashboardLayout>
  );
};

export default EditProject;
