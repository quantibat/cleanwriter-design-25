
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Project, ProjectInsert, ProjectUpdate } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/hooks/use-toast";
import { Json } from '@/integrations/supabase/types';
import {
  ActiveContent,
  activeContentToJson,
  activeContentArrayToJson,
  jsonToActiveContent,
  jsonToActiveContentArray
} from "@/types/contentTypes";
import { useNavigate } from 'react-router-dom';

export const useProjects = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user]);

  const fetchProjects = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (!user) {
        setError('User not authenticated');
        return [];
      }
      
      console.log('Fetching projects for user:', user.id);
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (projectsError) {
        console.error('Error fetching projects:', projectsError);
        setError(projectsError.message);
        return [];
      }

      if (projectsData) {
        console.log('Projects fetched:', projectsData.length);
        const transformedProjects = projectsData.map(project => transformDbProjectToUiModel(project));
        setProjects(transformedProjects);
        return transformedProjects;
      }
      
      return [];
    } catch (e: any) {
      console.error('Exception in fetchProjects:', e);
      setError(e.message);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getProjectById = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!user) {
        setError('User not authenticated');
        return null;
      }
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

      if (projectError) {
        setError(projectError.message);
        return null;
      }

      return projectData;
    } catch (e: any) {
      setError(e.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const createNewProject = async (project: ProjectInsert) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!user) {
        setError('User not authenticated');
        return false;
      }

      const projectToInsert = {
        ...project,
        user_id: user.id,
      };

      // Handle ActiveContent conversion
      if (projectToInsert.active_content && typeof projectToInsert.active_content !== 'string' && !(projectToInsert.active_content instanceof Array)) {
        projectToInsert.active_content = activeContentToJson(projectToInsert.active_content as unknown as ActiveContent);
      }
      
      if (projectToInsert.generated_contents && Array.isArray(projectToInsert.generated_contents)) {
        projectToInsert.generated_contents = activeContentArrayToJson(projectToInsert.generated_contents as unknown as ActiveContent[]);
      }

      console.log('Inserting project with data:', projectToInsert);
      const { data, error } = await supabase
        .from('projects')
        .insert([projectToInsert])
        .select();

      if (error) {
        console.error('Error creating project:', error);
        setError(error.message);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la création du projet",
          variant: "destructive"
        });
        return false;
      }

      if (data) {
        console.log('Project created successfully:', data);
        fetchProjects();
        toast({
          title: "Projet créé",
          description: "Votre projet a été créé avec succès."
        });
        return true;
      }

      return false;
    } catch (e: any) {
      console.error('Exception in createNewProject:', e);
      setError(e.message);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création du projet",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateExistingProject = async (projectId: string, data: any) => {
    try {
      let updatedData = { ...data };

      if (updatedData.active_content) {
        updatedData.active_content = activeContentToJson(updatedData.active_content);
      }

      if (updatedData.generated_contents && Array.isArray(updatedData.generated_contents)) {
        updatedData.generated_contents = activeContentArrayToJson(updatedData.generated_contents);
      }

      const { error } = await supabase
        .from('projects')
        .update(updatedData)
        .eq('id', projectId);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error updating project:', error);
      return false;
    }
  };

  const deleteProject = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!user) {
        setError('User not authenticated');
        return false;
      }
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        setError(error.message);
        return false;
      }

      fetchProjects();
      return true;
    } catch (e: any) {
      setError(e.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getUserProjects = () => {
    if(projects.length > 0) {
      return projects; 
    }else {
      return projects
    }
  };

  const viewProject = (id: string) => {
    navigate(`/view-project/${id}`);
  };

  const editProject = (id: string) => {
    navigate(`/edit-project/${id}`);
  };

  const deleteProjectNavigate = (id: string) => {
    navigate(`/delete-project/${id}`);
  };

  const goToCreateProject = () => {
    navigate('/create-dce');
  };

  const transformDbProjectToUiModel = (project: any) => {
    return {
      id: project.id,
      createdAt: project.created_at,
      title: project.title,
      type: project.option_type,
      description: project.card_title,
      youtubeLink: project.youtube_link,
      language: project.output_language,
      aiModel: project.ai_model,
      progress: project.progress,
      details: project.details,
      collaborators: project.collaborators,
      topics: project.topics,
      selectedTopics: project.selected_topics,
      videoMetadata: project.video_metadata,
      activeContent: project.active_content ? jsonToActiveContent(project.active_content) : null,
      generatedContents: project.generated_contents ? jsonToActiveContentArray(project.generated_contents) : [],
      elements: project.elements || 0,
      updated_at: project.updated_at
    };
  };

  return {
    projects,
    isLoading,
    error,
    fetchProjects,
    getProjectById,
    createNewProject,
    updateExistingProject,
    deleteProject,
    transformDbProjectToUiModel,
    getUserProjects,
    viewProject,
    editProject,
    deleteProjectNavigate,
    goToCreateProject
  };
};
