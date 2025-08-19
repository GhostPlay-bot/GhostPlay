export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          display_name: string | null
          avatar_url: string | null
          bio: string | null
          profile_color: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          display_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          profile_color?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          display_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          profile_color?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      games: {
        Row: {
          id: string
          rawg_id: number
          name: string
          description: string | null
          background_image: string | null
          rating: number | null
          rating_top: number | null
          ratings_count: number | null
          metacritic: number | null
          released: string | null
          genres: Json
          platforms: Json
          screenshots: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          rawg_id: number
          name: string
          description?: string | null
          background_image?: string | null
          rating?: number | null
          rating_top?: number | null
          ratings_count?: number | null
          metacritic?: number | null
          released?: string | null
          genres?: Json
          platforms?: Json
          screenshots?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          rawg_id?: number
          name?: string
          description?: string | null
          background_image?: string | null
          rating?: number | null
          rating_top?: number | null
          ratings_count?: number | null
          metacritic?: number | null
          released?: string | null
          genres?: Json
          platforms?: Json
          screenshots?: Json
          created_at?: string
          updated_at?: string
        }
      }
      user_favorites: {
        Row: {
          id: string
          user_id: string
          game_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          game_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          game_id?: string
          created_at?: string
        }
      }
      user_reviews: {
        Row: {
          id: string
          user_id: string
          game_id: string
          rating: number
          review_text: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          game_id: string
          rating: number
          review_text?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          game_id?: string
          rating?: number
          review_text?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      game_listings: {
        Row: {
          id: string
          seller_id: string
          game_id: string
          title: string
          description: string | null
          price: number
          original_price: number | null
          platform: string
          condition: string
          game_type: string
          is_multiplayer: boolean
          includes_dlc: boolean
          account_details: Json
          contact_info: Json
          images: Json
          status: string
          views_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          seller_id: string
          game_id: string
          title: string
          description?: string | null
          price: number
          original_price?: number | null
          platform: string
          condition: string
          game_type: string
          is_multiplayer?: boolean
          includes_dlc?: boolean
          account_details?: Json
          contact_info?: Json
          images?: Json
          status?: string
          views_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          seller_id?: string
          game_id?: string
          title?: string
          description?: string | null
          price?: number
          original_price?: number | null
          platform?: string
          condition?: string
          game_type?: string
          is_multiplayer?: boolean
          includes_dlc?: boolean
          account_details?: Json
          contact_info?: Json
          images?: Json
          status?: string
          views_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      listing_inquiries: {
        Row: {
          id: string
          listing_id: string
          buyer_id: string
          seller_id: string
          message: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          listing_id: string
          buyer_id: string
          seller_id: string
          message: string
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          listing_id?: string
          buyer_id?: string
          seller_id?: string
          message?: string
          status?: string
          created_at?: string
        }
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
  }
}