
import { Json } from "@/integrations/supabase/types";
import { ActiveContent } from "./contentTypes";

export interface Project {
  id: string;
  createdAt: string;
  title: string;
  type?: string;
  description?: string;
  youtubeLink?: string;
  language?: string;
  aiModel?: string;
  progress?: number;
  details?: string;
  collaborators?: number;
  topics?: any[];
  selectedTopics?: string[];
  videoMetadata?: any;
  activeContent?: ActiveContent | null;
  generatedContents?: ActiveContent[];
  elements?: number; // Add the elements property to fix the error
}

export interface ProjectInsert {
  title: string;
  card_title?: string;
  youtube_link?: string;
  option_type?: string;
  output_language?: string;
  ai_model?: string;
  progress?: number;
  topics?: any[];
  selected_topics?: string[];
  video_metadata?: any;
  active_content?: Json;
  generated_contents?: Json;
  is_social_media_only?: boolean;
  used_credits?: number;
  elements?: number;
  user_id?: string;
}

export interface ProjectUpdate {
  title?: string;
  card_title?: string;
  youtube_link?: string;
  option_type?: string;
  output_language?: string;
  ai_model?: string;
  progress?: number;
  topics?: any[];
  selected_topics?: string[];
  video_metadata?: any;
  active_content?: Json;
  generated_contents?: Json;
  is_social_media_only?: boolean;
  used_credits?: number;
  elements?: number;
}
