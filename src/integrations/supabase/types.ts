export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      ai_memory: {
        Row: {
          confidence: number | null
          content: string
          created_at: string | null
          id: string
          is_active: boolean | null
          memory_type: string
          source_entry_ids: string[] | null
          user_id: string
        }
        Insert: {
          confidence?: number | null
          content: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          memory_type: string
          source_entry_ids?: string[] | null
          user_id: string
        }
        Update: {
          confidence?: number | null
          content?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          memory_type?: string
          source_entry_ids?: string[] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_memory_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      coach_messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          persona: string | null
          role: string
          tokens_used: number | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          persona?: string | null
          role: string
          tokens_used?: number | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          persona?: string | null
          role?: string
          tokens_used?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "coach_messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      entries: {
        Row: {
          ai_mood_label: string | null
          ai_people: string[] | null
          ai_sentiment: number | null
          ai_summary: string | null
          ai_themes: string[] | null
          audio_url: string | null
          created_at: string | null
          energy: number | null
          entry_date: string
          id: string
          mood: number
          prompt_text: string | null
          text: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          ai_mood_label?: string | null
          ai_people?: string[] | null
          ai_sentiment?: number | null
          ai_summary?: string | null
          ai_themes?: string[] | null
          audio_url?: string | null
          created_at?: string | null
          energy?: number | null
          entry_date?: string
          id?: string
          mood: number
          prompt_text?: string | null
          text?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          ai_mood_label?: string | null
          ai_people?: string[] | null
          ai_sentiment?: number | null
          ai_summary?: string | null
          ai_themes?: string[] | null
          audio_url?: string | null
          created_at?: string | null
          energy?: number | null
          entry_date?: string
          id?: string
          mood?: number
          prompt_text?: string | null
          text?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      mood_daily: {
        Row: {
          avg_mood: number | null
          date: string
          dominant_theme: string | null
          entry_count: number | null
          user_id: string
        }
        Insert: {
          avg_mood?: number | null
          date: string
          dominant_theme?: string | null
          entry_count?: number | null
          user_id: string
        }
        Update: {
          avg_mood?: number | null
          date?: string
          dominant_theme?: string | null
          entry_count?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mood_daily_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          coach_persona: string | null
          created_at: string | null
          dark_mode: boolean | null
          display_name: string | null
          id: string
          language: string | null
          last_active_at: string | null
          lemon_customer_id: string | null
          lemon_subscription_id: string | null
          onboarded: boolean | null
          plan: string | null
          plan_expires_at: string | null
          streak_current: number | null
          streak_last_date: string | null
          streak_longest: number | null
          timezone: string | null
          total_entries: number | null
          trial_started_at: string | null
          updated_at: string | null
        }
        Insert: {
          coach_persona?: string | null
          created_at?: string | null
          dark_mode?: boolean | null
          display_name?: string | null
          id: string
          language?: string | null
          last_active_at?: string | null
          lemon_customer_id?: string | null
          lemon_subscription_id?: string | null
          onboarded?: boolean | null
          plan?: string | null
          plan_expires_at?: string | null
          streak_current?: number | null
          streak_last_date?: string | null
          streak_longest?: number | null
          timezone?: string | null
          total_entries?: number | null
          trial_started_at?: string | null
          updated_at?: string | null
        }
        Update: {
          coach_persona?: string | null
          created_at?: string | null
          dark_mode?: boolean | null
          display_name?: string | null
          id?: string
          language?: string | null
          last_active_at?: string | null
          lemon_customer_id?: string | null
          lemon_subscription_id?: string | null
          onboarded?: boolean | null
          plan?: string | null
          plan_expires_at?: string | null
          streak_current?: number | null
          streak_last_date?: string | null
          streak_longest?: number | null
          timezone?: string | null
          total_entries?: number | null
          trial_started_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      relationships: {
        Row: {
          avg_sentiment: number | null
          id: string
          last_mentioned_at: string | null
          mention_count: number | null
          person_name: string
          themes: string[] | null
          user_id: string
        }
        Insert: {
          avg_sentiment?: number | null
          id?: string
          last_mentioned_at?: string | null
          mention_count?: number | null
          person_name: string
          themes?: string[] | null
          user_id: string
        }
        Update: {
          avg_sentiment?: number | null
          id?: string
          last_mentioned_at?: string | null
          mention_count?: number | null
          person_name?: string
          themes?: string[] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "relationships_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      waitlist: {
        Row: {
          created_at: string | null
          email: string
          id: string
          source: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          source?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          source?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_coach_limit: { Args: { p_user_id: string }; Returns: boolean }
      check_entry_limit: { Args: { p_user_id: string }; Returns: boolean }
      update_streak: { Args: { p_user_id: string }; Returns: undefined }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
