export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id:               string
          slug:             string
          name:             string
          description:      string
          category:         string
          subcategory:      string | null
          price:            number
          compare_at_price: number | null
          price_tier:       string
          images:           Json
          stone_type:       string
          stone_size:       string | null
          stone_color:      string | null
          metal:            string
          stock:            number
          is_customizable:  boolean
          sku:              string
          weight_grams:     number | null
          certificate_type: string | null
          chain_width_mm:   number | null
          chain_length_in:  number | null
          tags:             string[]
          is_active:        boolean
          is_featured:      boolean
          created_at:       string
          updated_at:       string
        }
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['products']['Insert']>
      }
      orders: {
        Row: {
          id:                string
          stripe_session_id: string
          customer_email:    string
          customer_name:     string
          customer_phone:    string | null
          items:             Json
          total_amount:      number
          currency:          string
          status:            string
          shipping_address:  Json | null
          created_at:        string
          updated_at:        string
        }
        Insert: Omit<Database['public']['Tables']['orders']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['orders']['Insert']>
      }
      custom_requests: {
        Row: {
          id:             string
          product_id:     string | null
          configuration:  Json
          customer_email: string
          customer_name:  string
          notes:          string | null
          status:         string
          created_at:     string
        }
        Insert: Omit<Database['public']['Tables']['custom_requests']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['custom_requests']['Insert']>
      }
      newsletter_subscribers: {
        Row: {
          id:            string
          email:         string
          source:        string
          discount_sent: boolean
          subscribed_at: string
        }
        Insert: Omit<Database['public']['Tables']['newsletter_subscribers']['Row'], 'id' | 'subscribed_at'>
        Update: Partial<Database['public']['Tables']['newsletter_subscribers']['Insert']>
      }
    }
  }
}
