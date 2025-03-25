
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';

export interface ProjectFormData {
  title: string;
  youtubeLink?: string;
  option?: string;
  language?: string;
  aiModel?: string;
  cardTitle?: string;
  isSocialMediaOnly?: boolean;
  topics?: any[];
  selectedTopics?: string[];
  activeContent?: any;
  videoMetadata?: any;
  usedCredits?: number;
  progress?: number;
  elements?: number;
}

export const createProject = async (data: ProjectFormData) => {
  try {
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('Utilisateur non authentifié');
    }
    
    const { data: project, error } = await supabase
      .from('projects')
      .insert({
        user_id: user.id,
        title: data.title || 'Untitled Youtube to Newsletter',
        youtube_link: data.youtubeLink,
        option_type: data.option,
        output_language: data.language || 'french',
        ai_model: data.aiModel || 'gpt-4o',
        card_title: data.cardTitle || 'Ma sélection de cartes',
        is_social_media_only: data.isSocialMediaOnly || false,
        topics: data.topics || [],
        selected_topics: data.selectedTopics || [],
        active_content: data.activeContent || null,
        video_metadata: data.videoMetadata || null,
        used_credits: data.usedCredits || 0,
        progress: data.progress || 0,
        elements: data.elements || 0
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return project;
  } catch (error: any) {
    console.error('Error creating project:', error);
    toast({
      title: 'Erreur',
      description: error.message || 'Une erreur est survenue lors de la création du projet',
      variant: 'destructive'
    });
    return null;
  }
};

export const updateProject = async (id: string, data: Partial<ProjectFormData>) => {
  try {
    const updateData: any = {};
    
    if (data.title !== undefined) updateData.title = data.title;
    if (data.youtubeLink !== undefined) updateData.youtube_link = data.youtubeLink;
    if (data.option !== undefined) updateData.option_type = data.option;
    if (data.language !== undefined) updateData.output_language = data.language;
    if (data.aiModel !== undefined) updateData.ai_model = data.aiModel;
    if (data.cardTitle !== undefined) updateData.card_title = data.cardTitle;
    if (data.isSocialMediaOnly !== undefined) updateData.is_social_media_only = data.isSocialMediaOnly;
    if (data.topics !== undefined) updateData.topics = data.topics;
    if (data.selectedTopics !== undefined) updateData.selected_topics = data.selectedTopics;
    if (data.activeContent !== undefined) updateData.active_content = data.activeContent;
    if (data.videoMetadata !== undefined) updateData.video_metadata = data.videoMetadata;
    if (data.usedCredits !== undefined) updateData.used_credits = data.usedCredits;
    if (data.progress !== undefined) updateData.progress = data.progress;
    if (data.elements !== undefined) updateData.elements = data.elements;
    
    updateData.updated_at = new Date().toISOString();

    const { data: project, error } = await supabase
      .from('projects')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return project;
  } catch (error: any) {
    console.error('Error updating project:', error);
    toast({
      title: 'Erreur',
      description: error.message || 'Une erreur est survenue lors de la mise à jour du projet',
      variant: 'destructive'
    });
    return null;
  }
};

export const getProjectById = async (id: string) => {
  try {
    const { data: project, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return project;
  } catch (error: any) {
    console.error('Error fetching project:', error);
    toast({
      title: 'Erreur',
      description: error.message || 'Une erreur est survenue lors de la récupération du projet',
      variant: 'destructive'
    });
    return null;
  }
};

export const getUserProjects = async () => {
  try {
    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      throw error;
    }

    return projects;
  } catch (error: any) {
    console.error('Error fetching projects:', error);
    toast({
      title: 'Erreur',
      description: error.message || 'Une erreur est survenue lors de la récupération des projets',
      variant: 'destructive'
    });
    return [];
  }
};

export const deleteProject = async (id: string) => {
  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    return true;
  } catch (error: any) {
    console.error('Error deleting project:', error);
    toast({
      title: 'Erreur',
      description: error.message || 'Une erreur est survenue lors de la suppression du projet',
      variant: 'destructive'
    });
    return false;
  }
};
