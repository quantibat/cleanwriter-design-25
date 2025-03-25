
import { useState } from 'react';
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

  const getUserProjects = async () => {
    setIsLoading(true);
    try {
      const projects = await dispatch(fetchProjects()).unwrap();
      setIsLoading(false);
      return projects;
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de récupérer vos projets',
        variant: 'destructive'
      });
      setIsLoading(false);
      return [];
    }
  };

  const getProjectById = async (id: string) => {
    setIsLoading(true);
    try {
      const project = await dispatch(fetchProjectById(id)).unwrap();
      setIsLoading(false);
      return project;
    } catch (error) {
      console.error('Error fetching project:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de récupérer le projet',
        variant: 'destructive'
      });
      setIsLoading(false);
      return null;
    }
  };

  const createNewProject = async (data: any) => {
    setIsLoading(true);
    try {
      const project = await dispatch(createProject(data)).unwrap();
      notifySuccess(
        'Projet créé', 
        'Votre projet a été créé avec succès'
      );
      setIsLoading(false);
      return project;
    } catch (error) {
      console.error('Error creating project:', error);
      notifyError(
        'Erreur', 
        'Impossible de créer le projet'
      );
      setIsLoading(false);
      return null;
    }
  };

  const updateExistingProject = async (id: string, data: any) => {
    setIsLoading(true);
    try {
      const project = await dispatch(updateProject({ id, data })).unwrap();
      notifySuccess(
        'Projet mis à jour', 
        'Votre projet a été mis à jour avec succès'
      );
      setIsLoading(false);
      return project;
    } catch (error) {
      console.error('Error updating project:', error);
      notifyError(
        'Erreur', 
        'Impossible de mettre à jour le projet'
      );
      setIsLoading(false);
      return null;
    }
  };

  const deleteProject = async (id: string) => {
    setIsLoading(true);
    try {
      await dispatch(deleteProjectAction(id)).unwrap();
      notifySuccess(
        'Projet supprimé', 
        'Votre projet a été supprimé avec succès'
      );
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Error deleting project:', error);
      notifyError(
        'Erreur', 
        'Impossible de supprimer le projet'
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

  return {
    isLoading,
    getUserProjects,
    getProjectById,
    createNewProject,
    updateExistingProject,
    deleteProject,
    viewProject,
    editProject,
    deleteProjectNavigate,
    goToCreateProject,
    transformDbProjectToUiModel
  };
};
