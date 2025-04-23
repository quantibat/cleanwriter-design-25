
import { Database as GeneratedDatabase } from '@/integrations/supabase/types';
import { Json } from '@/integrations/supabase/types';

// Extend the generated Database type with our custom tables
export interface Database extends GeneratedDatabase {
  public: {
    Tables: {
      // Include all tables from the generated types
      ...GeneratedDatabase['public']['Tables'],
      
      // Add the projects table
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
        Relationships: [
          {
            foreignKeyName: "projects_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      // Add the users table (for profiles)
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
        Relationships: [
          {
            foreignKeyName: "users_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      // Include all views from the generated types
      ...GeneratedDatabase['public']['Views'];
    };
    Functions: {
      // Include all functions from the generated types
      ...GeneratedDatabase['public']['Functions'];
    };
    Enums: {
      // Include all enums from the generated types
      ...GeneratedDatabase['public']['Enums'];
    };
    CompositeTypes: {
      // Include all composite types from the generated types
      ...GeneratedDatabase['public']['CompositeTypes'];
    };
  };
}
