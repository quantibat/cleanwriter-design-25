import { useState, useCallback } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useNotificationsManager } from '@/hooks/useNotificationsManager';
import { 
  fetchProjects, 
  fetchProjectById, 
  createProject, 
  updateProject,
  deleteProject as deleteProjectAction
} from '@/store/slices/projectsSlice';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ActiveContent } from '@/hooks/useActiveContent';

export interface ProjectUIModel {
  id: string;
  title: string;
  type: string;
  elements: number;
  description: string;
  date?: string;
  lastModified?: string;
  progress: number;
  collaborators?: number;
  details?: string;
}

export const useProjects = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { notifySuccess, notifyError } = useNotificationsManager();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const transformDbProjectToUiModel = (project: any): ProjectUIModel => {
    return {
      id: project.id,
      title: project.title,
      type: project.option_type || 'Youtube to Newsletter',
      elements: project.elements || 0,
      description: project.card_title || '',
      date: project.created_at ? new Date(project.created_at).toLocaleDateString('fr-FR') : undefined,
      lastModified: project.updated_at 
        ? formatDistanceToNow(new Date(project.updated_at), { locale: fr, addSuffix: true }) 
        : undefined,
      progress: project.progress || 0,
      collaborators: 1,
      details: `Projet basé sur la vidéo YouTube: ${project.youtube_link || 'Non spécifié'}`
    };
  };

  const getUserProjects = useCallback(async (retry = true) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Fetching projects...');
      const projects = await dispatch(fetchProjects()).unwrap();
      console.log('Projects fetched successfully:', projects);
      setIsLoading(false);
      return projects;
    } catch (error: any) {
      console.error('Error fetching projects:', error);
      
      // If it's a network error and this is our first try, attempt one retry
      if (retry && (error instanceof TypeError || error.message === 'Failed to fetch')) {
        console.log('Network error, retrying once...');
        // Wait a bit before retrying
        await new Promise(resolve => setTimeout(resolve, 1000));
        return getUserProjects(false);
      }
      
      setError(error.message || 'Une erreur est survenue lors de la récupération des projets');
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible de récupérer vos projets',
        variant: 'destructive'
      });
      setIsLoading(false);
      return [];
    }
  }, [dispatch, toast]);

  const getProjectById = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const project = await dispatch(fetchProjectById(id)).unwrap();
      
      if (project.generated_contents) {
        const contentsArray = Array.isArray(project.generated_contents) 
          ? project.generated_contents 
          : typeof project.generated_contents === 'object' && project.generated_contents !== null 
            ? Object.values(project.generated_contents) 
            : [];
            
        project.generated_contents = contentsArray.map((content: any) => ({
          topicId: content.topicId || undefined,
          subject: content.subject || '',
          body: content.body || ''
        }));
      }
      
      setIsLoading(false);
      return project;
    } catch (error: any) {
      console.error('Error fetching project:', error);
      setError(error.message || 'Une erreur est survenue lors de la récupération du projet');
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible de récupérer le projet',
        variant: 'destructive'
      });
      setIsLoading(false);
      return null;
    }
  }, [dispatch, toast]);

  const createNewProject = async (data: any) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const project = await dispatch(createProject(data)).unwrap();
      notifySuccess(
        'Projet créé', 
        'Votre projet a été créé avec succès'
      );
      setIsLoading(false);
      return project;
    } catch (error: any) {
      console.error('Error creating project:', error);
      setError(error.message || 'Une erreur est survenue lors de la création du projet');
      notifyError(
        'Erreur', 
        error.message || 'Impossible de créer le projet'
      );
      setIsLoading(false);
      return null;
    }
  };

  const updateExistingProject = async (id: string, data: any) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const project = await dispatch(updateProject({ id, data })).unwrap();
      notifySuccess(
        'Projet mis à jour', 
        'Votre projet a été mis à jour avec succès'
      );
      setIsLoading(false);
      return project;
    } catch (error: any) {
      console.error('Error updating project:', error);
      setError(error.message || 'Une erreur est survenue lors de la mise à jour du projet');
      notifyError(
        'Erreur', 
        error.message || 'Impossible de mettre à jour le projet'
      );
      setIsLoading(false);
      return null;
    }
  };

  const deleteProject = async (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await dispatch(deleteProjectAction(id)).unwrap();
      notifySuccess(
        'Projet supprimé', 
        'Votre projet a été supprimé avec succès'
      );
      setIsLoading(false);
      return true;
    } catch (error: any) {
      console.error('Error deleting project:', error);
      setError(error.message || 'Une erreur est survenue lors de la suppression du projet');
      notifyError(
        'Erreur', 
        error.message || 'Impossible de supprimer le projet'
      );
      setIsLoading(false);
      return false;
    }
  };

  const viewProject = (project: any) => {
    const projectData = transformDbProjectToUiModel(project);
    navigate(`/view-project/${project.id}`, {
      state: { project: projectData }
    });
  };

  const editProject = (project: any) => {
    const projectData = transformDbProjectToUiModel(project);
    navigate(`/edit-project/${project.id}`, {
      state: { project: projectData }
    });
  };

  const deleteProjectNavigate = (project: any) => {
    const projectData = transformDbProjectToUiModel(project);
    navigate(`/delete-project/${project.id}`, {
      state: { project: projectData }
    });
  };

  const goToCreateProject = () => {
    navigate('/create-dce');
  };

  const saveGeneratedContent = async (projectId: string, content: ActiveContent) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const project = await dispatch(fetchProjectById(projectId)).unwrap();
      
      const existingContents = project.generated_contents || [];
      const typedContents: ActiveContent[] = Array.isArray(existingContents) 
        ? existingContents 
        : typeof existingContents === 'object' && existingContents !== null 
          ? Object.values(existingContents) 
          : [];
      
      const newContents = [...typedContents, content];
      
      const updatedProject = await dispatch(updateProject({ 
        id: projectId, 
        data: { generated_contents: newContents } 
      })).unwrap();
      
      setIsLoading(false);
      return updatedProject;
    } catch (error: any) {
      console.error('Error saving generated content:', error);
      setError(error.message || 'Une erreur est survenue lors de la sauvegarde du contenu');
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible de sauvegarder le contenu',
        variant: 'destructive'
      });
      setIsLoading(false);
      return null;
    }
  };

  const saveGeneratedContents = async (projectId: string, contents: ActiveContent[]) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const updatedProject = await dispatch(updateProject({ 
        id: projectId, 
        data: { generated_contents: contents } 
      })).unwrap();
      
      setIsLoading(false);
      return updatedProject;
    } catch (error: any) {
      console.error('Error saving generated contents:', error);
      setError(error.message || 'Une erreur est survenue lors de la sauvegarde des contenus');
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible de sauvegarder les contenus',
        variant: 'destructive'
      });
      setIsLoading(false);
      return null;
    }
  };

  return {
    isLoading,
    error,
    getUserProjects,
    getProjectById,
    createNewProject,
    updateExistingProject,
    deleteProject,
    viewProject,
    editProject,
    deleteProjectNavigate,
    goToCreateProject,
    transformDbProjectToUiModel,
    saveGeneratedContent,
    saveGeneratedContents
  };
};
