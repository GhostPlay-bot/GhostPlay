import { supabase } from './supabase';
import type { Database } from './database.types';

type GameListingRow = Database['public']['Tables']['game_listings']['Row'];
type GameListingInsert = Database['public']['Tables']['game_listings']['Insert'];
type ListingInquiryInsert = Database['public']['Tables']['listing_inquiries']['Insert'];

export interface GameListing extends GameListingRow {
  seller?: {
    id: string;
    username: string | null;
    full_name: string | null;
    display_name: string | null;
    avatar_url: string | null;
    profile_color: string | null;
  };
  game?: {
    id: string;
    name: string;
    background_image: string | null;
  };
}

export const marketplaceService = {
  // Create a new game listing
  async createListing(listingData: Omit<GameListingInsert, 'seller_id'>): Promise<GameListingRow> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('game_listings')
      .insert({
        ...listingData,
        seller_id: user.id,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get listings for a specific game
  async getGameListings(gameId: string): Promise<GameListing[]> {
    const { data, error } = await supabase
      .from('game_listings')
      .select(`
        *,
        seller:profiles!seller_id (
          id,
          username,
          full_name,
          display_name,
          avatar_url,
          profile_color
        ),
        game:games!game_id (
          id,
          name,
          background_image
        )
      `)
      .eq('game_id', gameId)
      .eq('status', 'available')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get all active listings with pagination
  async getAllListings(page = 1, pageSize = 20): Promise<{ listings: GameListing[]; hasMore: boolean }> {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error, count } = await supabase
      .from('game_listings')
      .select(`
        *,
        seller:profiles!seller_id (
          id,
          username,
          full_name,
          display_name,
          avatar_url,
          profile_color
        ),
        game:games!game_id (
          id,
          name,
          background_image
        )
      `, { count: 'exact' })
      .eq('status', 'available')
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) throw error;

    return {
      listings: data || [],
      hasMore: (count || 0) > to + 1,
    };
  },

  // Get user's own listings
  async getUserListings(userId?: string): Promise<GameListing[]> {
    const targetUserId = userId || (await supabase.auth.getUser()).data.user?.id;
    if (!targetUserId) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('game_listings')
      .select(`
        *,
        seller:profiles!seller_id (
          id,
          username,
          full_name,
          display_name,
          avatar_url,
          profile_color
        ),
        game:games!game_id (
          id,
          name,
          background_image
        )
      `)
      .eq('seller_id', targetUserId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Update listing
  async updateListing(listingId: string, updates: Partial<GameListingInsert>): Promise<GameListingRow> {
    const { data, error } = await supabase
      .from('game_listings')
      .update(updates)
      .eq('id', listingId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete listing
  async deleteListing(listingId: string): Promise<void> {
    const { error } = await supabase
      .from('game_listings')
      .delete()
      .eq('id', listingId);

    if (error) throw error;
  },

  // Create inquiry for a listing
  async createInquiry(listingId: string, message: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Get listing details to get seller_id
    const { data: listing, error: listingError } = await supabase
      .from('game_listings')
      .select('seller_id')
      .eq('id', listingId)
      .single();

    if (listingError) throw listingError;

    const inquiryData: ListingInquiryInsert = {
      listing_id: listingId,
      buyer_id: user.id,
      seller_id: listing.seller_id,
      message,
    };

    const { error } = await supabase
      .from('listing_inquiries')
      .insert(inquiryData);

    if (error) throw error;
  },

  // Get inquiries for user's listings (as seller)
  async getSellerInquiries(): Promise<any[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('listing_inquiries')
      .select(`
        *,
        listing:game_listings!listing_id (
          id,
          title,
          price,
          game:games!game_id (
            name,
            background_image
          )
        ),
        buyer:profiles!buyer_id (
          id,
          username,
          full_name,
          display_name,
          avatar_url,
          profile_color
        )
      `)
      .eq('seller_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get user's inquiries (as buyer)
  async getBuyerInquiries(): Promise<any[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('listing_inquiries')
      .select(`
        *,
        listing:game_listings!listing_id (
          id,
          title,
          price,
          game:games!game_id (
            name,
            background_image
          )
        ),
        seller:profiles!seller_id (
          id,
          username,
          full_name,
          display_name,
          avatar_url,
          profile_color
        )
      `)
      .eq('buyer_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Count listings for a game
  async getGameListingCount(gameId: string): Promise<number> {
    const { count, error } = await supabase
      .from('game_listings')
      .select('*', { count: 'exact', head: true })
      .eq('game_id', gameId)
      .eq('status', 'available');

    if (error) throw error;
    return count || 0;
  },

  // Increment view count
  async incrementViewCount(listingId: string): Promise<void> {
    const { error } = await supabase.rpc('increment_listing_views', {
      listing_id: listingId
    });

    if (error) {
      // Fallback if RPC doesn't exist
      const { data: listing } = await supabase
        .from('game_listings')
        .select('views_count')
        .eq('id', listingId)
        .single();

      if (listing) {
        await supabase
          .from('game_listings')
          .update({ views_count: (listing.views_count || 0) + 1 })
          .eq('id', listingId);
      }
    }
  },
};