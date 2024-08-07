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
      customers: {
        Row: {
          id: string
          stripe_customer_id: string | null
        }
        Insert: {
          id: string
          stripe_customer_id?: string | null
        }
        Update: {
          id?: string
          stripe_customer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      decoration: {
        Row: {
          address: string
          city: string
          country: string
          created_at: string
          creator_id: string
          id: string
          latitude: number
          longitude: number
          name: string
          rating: number
          region: string
          updated_at: string
          verification_submitted: boolean
          verified: boolean
        }
        Insert: {
          address: string
          city: string
          country: string
          created_at?: string
          creator_id?: string
          id?: string
          latitude: number
          longitude: number
          name: string
          rating?: number
          region: string
          updated_at?: string
          verification_submitted?: boolean
          verified?: boolean
        }
        Update: {
          address?: string
          city?: string
          country?: string
          created_at?: string
          creator_id?: string
          id?: string
          latitude?: number
          longitude?: number
          name?: string
          rating?: number
          region?: string
          updated_at?: string
          verification_submitted?: boolean
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "decoration_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: true
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      decoration_images: {
        Row: {
          created_at: string
          decoration_id: string
          id: string
          url: string
        }
        Insert: {
          created_at?: string
          decoration_id: string
          id?: string
          url: string
        }
        Update: {
          created_at?: string
          decoration_id?: string
          id?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "decoration_images_decoration_id_fkey"
            columns: ["decoration_id"]
            isOneToOne: true
            referencedRelation: "decoration"
            referencedColumns: ["id"]
          },
        ]
      }
      notification: {
        Row: {
          body: string
          created_at: string
          id: string
          profile_id: string
          title: string
          unread: boolean
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          profile_id: string
          title: string
          unread?: boolean
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          profile_id?: string
          title?: string
          unread?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "notification_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      prices: {
        Row: {
          active: boolean | null
          currency: string | null
          description: string | null
          id: string
          interval: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count: number | null
          metadata: Json | null
          product_id: string | null
          trial_period_days: number | null
          type: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount: number | null
        }
        Insert: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Update: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id?: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "prices_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          active: boolean | null
          description: string | null
          id: string
          image: string | null
          metadata: Json | null
          name: string | null
        }
        Insert: {
          active?: boolean | null
          description?: string | null
          id: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Update: {
          active?: boolean | null
          description?: string | null
          id?: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Relationships: []
      }
      profile: {
        Row: {
          display_name: string | null
          has_premium: boolean
          id: string
          is_admin: boolean
          notifications_by_email_rating: boolean
          notifications_by_email_verification: boolean
          notifications_on_app_rating: boolean
          notifications_on_app_verification: boolean
        }
        Insert: {
          display_name?: string | null
          has_premium?: boolean
          id: string
          is_admin?: boolean
          notifications_by_email_rating?: boolean
          notifications_by_email_verification?: boolean
          notifications_on_app_rating?: boolean
          notifications_on_app_verification?: boolean
        }
        Update: {
          display_name?: string | null
          has_premium?: boolean
          id?: string
          is_admin?: boolean
          notifications_by_email_rating?: boolean
          notifications_by_email_verification?: boolean
          notifications_on_app_rating?: boolean
          notifications_on_app_verification?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "profile_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      rating: {
        Row: {
          created_at: string
          decoration_id: string | null
          id: number
          profile_id: string | null
          rating: number
        }
        Insert: {
          created_at?: string
          decoration_id?: string | null
          id?: number
          profile_id?: string | null
          rating: number
        }
        Update: {
          created_at?: string
          decoration_id?: string | null
          id?: number
          profile_id?: string | null
          rating?: number
        }
        Relationships: [
          {
            foreignKeyName: "rating_decoration_id_fkey"
            columns: ["decoration_id"]
            isOneToOne: false
            referencedRelation: "decoration"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rating_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      report: {
        Row: {
          additional_info: string | null
          created_at: string
          decoration_id: string
          id: string
          profile_id: string
          reasons: string[]
          resolved: boolean
        }
        Insert: {
          additional_info?: string | null
          created_at?: string
          decoration_id: string
          id?: string
          profile_id: string
          reasons: string[]
          resolved?: boolean
        }
        Update: {
          additional_info?: string | null
          created_at?: string
          decoration_id?: string
          id?: string
          profile_id?: string
          reasons?: string[]
          resolved?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "report_decoration_id_fkey"
            columns: ["decoration_id"]
            isOneToOne: true
            referencedRelation: "decoration"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "report_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      route: {
        Row: {
          created_at: string
          decoration_id: string | null
          id: string
          name: string
          profile_id: string | null
        }
        Insert: {
          created_at?: string
          decoration_id?: string | null
          id?: string
          name: string
          profile_id?: string | null
        }
        Update: {
          created_at?: string
          decoration_id?: string | null
          id?: string
          name?: string
          profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "route_decoration_id_fkey"
            columns: ["decoration_id"]
            isOneToOne: false
            referencedRelation: "decoration"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "route_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          cancel_at: string | null
          cancel_at_period_end: boolean | null
          canceled_at: string | null
          created: string
          current_period_end: string
          current_period_start: string
          ended_at: string | null
          id: string
          metadata: Json | null
          price_id: string | null
          quantity: number | null
          status: Database["public"]["Enums"]["subscription_status"] | null
          trial_end: string | null
          trial_start: string | null
          user_id: string
        }
        Insert: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id: string
        }
        Update: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_price_id_fkey"
            columns: ["price_id"]
            isOneToOne: false
            referencedRelation: "prices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      verification: {
        Row: {
          approved: boolean | null
          archived: boolean
          created_at: string
          decoration_id: string | null
          document: string | null
          id: number
          rejected: boolean
          rejected_reason: string | null
        }
        Insert: {
          approved?: boolean | null
          archived?: boolean
          created_at?: string
          decoration_id?: string | null
          document?: string | null
          id?: number
          rejected?: boolean
          rejected_reason?: string | null
        }
        Update: {
          approved?: boolean | null
          archived?: boolean
          created_at?: string
          decoration_id?: string | null
          document?: string | null
          id?: number
          rejected?: boolean
          rejected_reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "verification_decoration_id_fkey"
            columns: ["decoration_id"]
            isOneToOne: false
            referencedRelation: "decoration"
            referencedColumns: ["id"]
          },
        ]
      }
      view: {
        Row: {
          created_at: string
          decoration_id: string
          id: number
        }
        Insert: {
          created_at?: string
          decoration_id: string
          id?: number
        }
        Update: {
          created_at?: string
          decoration_id?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "view_decoration_id_fkey"
            columns: ["decoration_id"]
            isOneToOne: true
            referencedRelation: "decoration"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      pricing_plan_interval: "day" | "week" | "month" | "year"
      pricing_type: "one_time" | "recurring"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
