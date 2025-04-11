export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      domaines_expertises: {
        Row: {
          id: string
          nom: string
        }
        Insert: {
          id?: string
          nom: string
        }
        Update: {
          id?: string
          nom?: string
        }
        Relationships: []
      }
      entreprises: {
        Row: {
          adresse_siege_social: string | null
          budget_conditions_financieres: Json | null
          created_time: string | null
          email: string
          id: string
          nom_entreprise: string
          nom_prenom_contact: string | null
          nombre_ao_mensuels: number | null
          numero_contact: string | null
          numero_siret: string | null
          password: string
          presentation_entreprise: string | null
          type_entreprise: string | null
          ville: string | null
          zone_chalandise: string | null
        }
        Insert: {
          adresse_siege_social?: string | null
          budget_conditions_financieres?: Json | null
          created_time?: string | null
          email: string
          id?: string
          nom_entreprise: string
          nom_prenom_contact?: string | null
          nombre_ao_mensuels?: number | null
          numero_contact?: string | null
          numero_siret?: string | null
          password: string
          presentation_entreprise?: string | null
          type_entreprise?: string | null
          ville?: string | null
          zone_chalandise?: string | null
        }
        Update: {
          adresse_siege_social?: string | null
          budget_conditions_financieres?: Json | null
          created_time?: string | null
          email?: string
          id?: string
          nom_entreprise?: string
          nom_prenom_contact?: string | null
          nombre_ao_mensuels?: number | null
          numero_contact?: string | null
          numero_siret?: string | null
          password?: string
          presentation_entreprise?: string | null
          type_entreprise?: string | null
          ville?: string | null
          zone_chalandise?: string | null
        }
        Relationships: []
      }
      entreprises_domaines_expertises: {
        Row: {
          domaine_id: string
          entreprise_id: string
        }
        Insert: {
          domaine_id: string
          entreprise_id: string
        }
        Update: {
          domaine_id?: string
          entreprise_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "entreprises_domaines_expertises_domaine_id_fkey"
            columns: ["domaine_id"]
            isOneToOne: false
            referencedRelation: "domaines_expertises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entreprises_domaines_expertises_entreprise_id_fkey"
            columns: ["entreprise_id"]
            isOneToOne: false
            referencedRelation: "entreprises"
            referencedColumns: ["id"]
          },
        ]
      }
      entreprises_natures_chantiers: {
        Row: {
          entreprise_id: string
          nature_id: string
        }
        Insert: {
          entreprise_id: string
          nature_id: string
        }
        Update: {
          entreprise_id?: string
          nature_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "entreprises_natures_chantiers_entreprise_id_fkey"
            columns: ["entreprise_id"]
            isOneToOne: false
            referencedRelation: "entreprises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entreprises_natures_chantiers_nature_id_fkey"
            columns: ["nature_id"]
            isOneToOne: false
            referencedRelation: "natures_chantiers"
            referencedColumns: ["id"]
          },
        ]
      }
      entreprises_types_chantiers: {
        Row: {
          entreprise_id: string
          type_id: string
        }
        Insert: {
          entreprise_id: string
          type_id: string
        }
        Update: {
          entreprise_id?: string
          type_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "entreprises_types_chantiers_entreprise_id_fkey"
            columns: ["entreprise_id"]
            isOneToOne: false
            referencedRelation: "entreprises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entreprises_types_chantiers_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "types_chantiers"
            referencedColumns: ["id"]
          },
        ]
      }
      natures_chantiers: {
        Row: {
          id: string
          nom: string
        }
        Insert: {
          id?: string
          nom: string
        }
        Update: {
          id?: string
          nom?: string
        }
        Relationships: []
      }
      types_chantiers: {
        Row: {
          id: string
          nom: string
        }
        Insert: {
          id?: string
          nom: string
        }
        Update: {
          id?: string
          nom?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
