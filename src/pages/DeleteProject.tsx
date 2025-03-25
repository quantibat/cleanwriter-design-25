
import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft, Trash2, AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useToast } from "@/hooks/use-toast";

const DeleteProject = () => {
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
  
  const handleDelete = () => {
    // In a real app, you would delete the data from your backend
    // Here we'll just show a success message and navigate back
    toast({
      title: "Projet supprimé",
      description: "Le projet a été supprimé avec succès."
    });
    
    navigate('/projects');
  };

  const breadcrumbs = [
    { label: 'Projets', path: '/projects' },
    { label: project.title, path: `/view-project/${id}` },
    { label: 'Supprimer' }
  ];

  return (
    <DashboardLayout activeTab="projects" breadcrumbs={breadcrumbs}>
      <div className="w-full max-w-3xl mx-auto">
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
        </div>
        
        <Card className="border border-destructive/20 bg-destructive/5">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
            <h1 className="text-2xl font-bold mb-2">Supprimer le projet</h1>
            <p className="text-muted-foreground mb-6">
              Vous êtes sur le point de supprimer le projet <span className="font-semibold">"{project.title}"</span>. 
              Cette action est irréversible. Toutes les données associées à ce projet seront définitivement supprimées.
            </p>
            
            <div className="bg-card p-4 rounded-md border border-white/10 w-full mb-6">
              <h3 className="font-semibold mb-2">Informations du projet :</h3>
              <ul className="text-left space-y-1 text-sm">
                <li><span className="text-muted-foreground">Titre :</span> {project.title}</li>
                <li><span className="text-muted-foreground">Type :</span> {project.type}</li>
                <li><span className="text-muted-foreground">Date de création :</span> {project.date}</li>
                <li><span className="text-muted-foreground">Progression :</span> {project.progress}%</li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="outline"
                onClick={() => navigate(`/view-project/${id}`, { state: { project } })}
                className="w-full sm:w-auto"
              >
                Annuler
              </Button>
              <Button 
                variant="destructive"
                onClick={handleDelete}
                className="w-full sm:w-auto"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Confirmer la suppression
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DeleteProject;
