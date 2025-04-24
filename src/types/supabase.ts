
import { Database as GeneratedDatabase } from '@/integrations/supabase/types';
import { Json } from '@/integrations/supabase/types';

export interface Database extends GeneratedDatabase {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          user_id: string;
          title: string;
          youtube_link?: string;
          option_type?: string;
          output_language?: string;
          ai_model?: string;
          card_title?: string;
          is_social_media_only?: boolean;
          topics?: Json;
          selected_topics?: Json;
          video_metadata?: Json;
          active_content?: Json;
          generated_contents?: Json;
          progress?: number;
          used_credits?: number;
          elements?: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          user_id: string;
          title: string;
          youtube_link?: string;
          option_type?: string;
          output_language?: string;
          ai_model?: string;
          card_title?: string;
          is_social_media_only?: boolean;
          topics?: Json;
          selected_topics?: Json;
          video_metadata?: Json;
          active_content?: Json;
          generated_contents?: Json;
          progress?: number;
          used_credits?: number;
          elements?: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          user_id?: string;
          title?: string;
          youtube_link?: string;
          option_type?: string;
          output_language?: string;
          ai_model?: string;
          card_title?: string;
          is_social_media_only?: boolean;
          topics?: Json;
          selected_topics?: Json;
          video_metadata?: Json;
          active_content?: Json;
          generated_contents?: Json;
          progress?: number;
          used_credits?: number;
          elements?: number;
        };
      };
      users: {
        Row: {
          id: string;
          created_at?: string;
          full_name?: string;
          avatar_url?: string;
          enterprise?: string;
          siret?: string;
        };
        Insert: {
          id: string;
          created_at?: string;
          full_name?: string;
          avatar_url?: string;
          enterprise?: string;
          siret?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          full_name?: string;
          avatar_url?: string;
          enterprise?: string;
          siret?: string;
        };
      };
    };
    Views: GeneratedDatabase['public']['Views'];
    Functions: GeneratedDatabase['public']['Functions'];
    Enums: GeneratedDatabase['public']['Enums'];
    CompositeTypes: GeneratedDatabase['public']['CompositeTypes'];
  };
}
