
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft, Trash2, AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteProject, fetchProjectById } from '@/store/slices/projectsSlice';

const DeleteProject = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { currentProject, isLoading } = useAppSelector(state => state.projects);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Obtenir le projet depuis le state location ou le charger depuis Redux
  const project = location.state?.project || currentProject;
  
  useEffect(() => {
    // Si nous n'avons pas le projet dans location.state et pas dans Redux, charger depuis l'API
    if (!location.state?.project && !currentProject && id) {
      dispatch(fetchProjectById(id));
    }
  }, [dispatch, id, location.state, currentProject]);

  // Si projet non trouvé, gérer cette situation
  if (!project && !isLoading) {
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
  
  const handleDelete = async () => {
    if (!id) return;
    
    setIsDeleting(true);
    
    try {
      await dispatch(deleteProject(id)).unwrap();
      toast({
        title: "Projet supprimé",
        description: "Le projet a été supprimé avec succès."
      });
      navigate('/projects');
    } catch (error) {
      setIsDeleting(false);
    }
  };

  const breadcrumbs = [
    { label: 'Projets', path: '/projects' },
    { label: project?.title, path: `/view-project/${id}` },
    { label: 'Supprimer' }
  ];

  if (isLoading && !project) {
    return (
      <DashboardLayout activeTab="projects" breadcrumbs={breadcrumbs}>
        <div className="flex items-center justify-center h-64">
          <p>Chargement du projet...</p>
        </div>
      </DashboardLayout>
    );
  }

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
                <li><span className="text-muted-foreground">Type :</span> {project.option_type || project.type}</li>
                <li>
                  <span className="text-muted-foreground">Date de création :</span> {
                    project.created_at 
                      ? new Date(project.created_at).toLocaleDateString('fr-FR')
                      : project.date
                  }
                </li>
                <li><span className="text-muted-foreground">Progression :</span> {project.progress}%</li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="outline"
                onClick={() => navigate(`/view-project/${id}`, { state: { project } })}
                className="w-full sm:w-auto"
                disabled={isDeleting}
              >
                Annuler
              </Button>
              <Button 
                variant="destructive"
                onClick={handleDelete}
                className="w-full sm:w-auto"
                disabled={isDeleting}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {isDeleting ? 'Suppression en cours...' : 'Confirmer la suppression'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DeleteProject;
