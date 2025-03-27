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
    // Convert Json to ActiveContent types
    activeContent: project.active_content ? jsonToActiveContent(project.active_content as Json) : null,
    generatedContents: project.generated_contents 
      ? jsonToActiveContentArray(project.generated_contents as Json) 
      : [] as ActiveContent[]
  };
};
