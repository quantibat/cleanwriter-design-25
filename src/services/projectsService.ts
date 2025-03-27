
import { store } from '@/store';
import { 
  fetchProjects as fetchProjectsAction,
  fetchProjectById as fetchProjectByIdAction,
  createProject as createProjectAction,
  updateProject as updateProjectAction,
  deleteProject as deleteProjectAction
} from '@/store/slices/projectsSlice';
import { 
  ActiveContent, 
  activeContentToJson, 
  jsonToActiveContent, 
  jsonToActiveContentArray,
  activeContentArrayToJson 
} from '@/hooks/useActiveContent';
import { Json } from '@/integrations/supabase/types';

export interface ProjectFormData {
  title: string;
  youtubeLink?: string;
  option?: string;
  language?: string;
  output_language?: string;
  aiModel?: string;
  cardTitle?: string;
  description?: string;
  isSocialMediaOnly?: boolean;
  topics?: any[];
  selectedTopics?: string[];
  selected_topics?: string[];
  activeContent?: ActiveContent | null;
  active_content?: ActiveContent | null;
  generatedContents?: ActiveContent[];
  generated_contents?: ActiveContent[];
  videoMetadata?: any;
  video_metadata?: any;
  usedCredits?: number;
  progress?: number;
  elements?: number;
  details?: string;
  option_type?: string;
  card_title?: string;
  youtube_link?: string;
}

// Add better error handling to these service methods
export const createProject = async (data: ProjectFormData) => {
  try {
    // Convert ActiveContent to Json compatible format before sending to Redux
    const projectData = {
      ...data,
      activeContent: data.activeContent ? activeContentToJson(data.activeContent) : null,
      generatedContents: data.generatedContents ? activeContentArrayToJson(data.generatedContents) : []
    };
    
    return await store.dispatch(createProjectAction(projectData)).unwrap();
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

export const updateProject = async (id: string, data: Partial<ProjectFormData>) => {
  try {
    // Convert ActiveContent to Json compatible format before sending to Redux
    const updateData: any = { ...data };
    
    if (data.activeContent !== undefined) {
      updateData.activeContent = activeContentToJson(data.activeContent);
    }
    
    if (data.generatedContents !== undefined) {
      updateData.generatedContents = activeContentArrayToJson(data.generatedContents);
    }
    
    return await store.dispatch(updateProjectAction({ id, data: updateData })).unwrap();
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

export const getProjectById = async (id: string) => {
  try {
    const project = await store.dispatch(fetchProjectByIdAction(id)).unwrap();
    
    // Convert Json to ActiveContent after fetching from Redux
    if (project.generated_contents) {
      project.generated_contents = jsonToActiveContentArray(project.generated_contents);
    }
    
    return project;
  } catch (error) {
    console.error('Error fetching project by ID:', error);
    throw error;
  }
};

export const getUserProjects = async () => {
  try {
    return await store.dispatch(fetchProjectsAction()).unwrap();
  } catch (error) {
    console.error('Error fetching user projects:', error);
    throw error;
  }
};

export const deleteProject = async (id: string) => {
  try {
    return await store.dispatch(deleteProjectAction(id)).unwrap();
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

// Function to save generated content to a project
export const saveGeneratedContent = async (projectId: string, content: ActiveContent) => {
  try {
    const project = await getProjectById(projectId);
    
    // Get existing generated contents or initialize as empty array
    const existingContents = project.generated_contents || [];
    const typedContents: ActiveContent[] = Array.isArray(existingContents) 
      ? existingContents 
      : typeof existingContents === 'object' && existingContents !== null 
        ? Object.values(existingContents) 
        : [];
    
    // Add the new content
    const newContents = [...typedContents, content];
    
    // Update the project with the new contents - already converted to Json in updateProject
    return await updateProject(projectId, {
      generated_contents: newContents
    });
  } catch (error) {
    console.error('Error saving generated content:', error);
    throw error;
  }
};

// Function to save multiple generated contents to a project
export const saveGeneratedContents = async (projectId: string, contents: ActiveContent[]) => {
  try {
    // Contents are already converted to Json in updateProject
    return await updateProject(projectId, {
      generated_contents: contents
    });
  } catch (error) {
    console.error('Error saving generated contents:', error);
    throw error;
  }
};

// Enhanced utility function to extract YouTube video information
export const extractYoutubeInfo = async (url: string) => {
  let videoId = '';
  
  // Extract video ID from different YouTube URL formats
  if (url.includes('youtube.com/watch')) {
    const urlParams = new URLSearchParams(url.split('?')[1]);
    videoId = urlParams.get('v') || '';
  } else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1].split('?')[0];
  }
  
  if (!videoId) return null;
  
  // Basic info that doesn't require API calls
  const info = {
    videoId,
    thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    embedUrl: `https://www.youtube.com/embed/${videoId}`
  };
  
  try {
    // Try to get video metadata from YouTube's oEmbed API
    const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
    if (response.ok) {
      const data = await response.json();
      return {
        ...info,
        title: data.title || 'Unknown Title',
        channel: data.author_name || 'Unknown Channel',
        // These aren't provided by oEmbed, but we'll set placeholders
        views: 'Views unavailable',
        duration: 'Duration unavailable'
      };
    }
  } catch (error) {
    console.error('Error fetching YouTube metadata:', error);
  }
  
  // Fallback if the API call fails
  return {
    ...info,
    title: 'Video Title Unavailable',
    channel: 'Channel Unavailable',
    views: 'Views unavailable',
    duration: 'Duration unavailable'
  };
};
