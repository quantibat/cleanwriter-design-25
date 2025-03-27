
// Import the new utility functions and type
import { 
  ActiveContent, 
  activeContentToJson, 
  activeContentArrayToJson,
  jsonToActiveContent,
  jsonToActiveContentArray
} from "@/types/contentTypes";
import { Json } from "@/integrations/supabase/types";
import { supabase } from "@/integrations/supabase/client";

// Export interface for project form data
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
  activeContent?: ActiveContent | null;
  generatedContents?: ActiveContent[];
  videoMetadata?: any;
  usedCredits?: number;
  progress?: number;
  elements?: number;
}

// Function to extract YouTube info
export const extractYoutubeInfo = async (youtubeLink: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('extract-youtube-info', {
      body: { youtubeLink }
    });

    if (error) throw error;
    console.log('YouTube info extracted:', data);
    return data;
  } catch (error) {
    console.error('Error extracting YouTube info:', error);
    return null;
  }
};

// Function to create a new project
export const createProject = async (projectData: ProjectFormData) => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    
    if (!userData || !userData.user) {
      throw new Error("User not authenticated");
    }

    console.log('Creating project with data:', projectData);

    // Convert ActiveContent types to Json before sending to Supabase
    let processedData: any = {
      user_id: userData.user.id,
      title: projectData.title || 'Untitled Project',
      youtube_link: projectData.youtubeLink,
      option_type: projectData.option,
      output_language: projectData.language || 'french',
      ai_model: projectData.aiModel || 'gpt-4o',
      card_title: projectData.cardTitle || 'Ma sélection de cartes',
      is_social_media_only: projectData.isSocialMediaOnly || false,
      topics: projectData.topics || [],
      selected_topics: projectData.selectedTopics || [],
      video_metadata: projectData.videoMetadata || null,
      used_credits: projectData.usedCredits || 0,
      progress: projectData.progress || 0,
      elements: projectData.elements || 0
    };
    
    // Convert ActiveContent to Json
    if (projectData.activeContent) {
      processedData.active_content = activeContentToJson(projectData.activeContent);
    }
    
    // Convert ActiveContent[] to Json
    if (projectData.generatedContents && Array.isArray(projectData.generatedContents)) {
      processedData.generated_contents = activeContentArrayToJson(projectData.generatedContents);
    }
    
    const { data, error } = await supabase
      .from('projects')
      .insert(processedData)
      .select()
      .single();
      
    if (error) throw error;
    
    console.log('Project created successfully:', data);
    
    // Return the newly created project with proper type conversion
    return mapProjectFromDb(data);
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

// Make sure to use the conversion functions when needed
// For example, when updating a project:
export const updateProject = async (projectId: string, data: any) => {
  try {
    // Convert ActiveContent types to Json
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

// And when mapping project data from the database:
export const mapProjectFromDb = (project: any) => {
  return {
    id: project.id,
    created_at: project.created_at,
    title: project.title,
    card_title: project.card_title,
    youtube_link: project.youtube_link,
    option_type: project.option_type,
    output_language: project.output_language,
    ai_model: project.ai_model,
    progress: project.progress,
    user_id: project.user_id,
    video_metadata: project.video_metadata,
    topics: project.topics,
    selected_topics: project.selected_topics,
    elements: project.elements,
    // Convert Json to ActiveContent types
    activeContent: project.active_content ? jsonToActiveContent(project.active_content as Json) : null,
    generatedContents: project.generated_contents 
      ? jsonToActiveContentArray(project.generated_contents as Json) 
      : [] as ActiveContent[]
  };
};
