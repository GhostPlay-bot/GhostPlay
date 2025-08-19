import { supabase } from './supabase';
import { rawgService, type RAWGGame } from './rawg';
import type { Database } from './database.types';

type GameRow = Database['public']['Tables']['games']['Row'];
type GameInsert = Database['public']['Tables']['games']['Insert'];

export const gamesService = {
  // Sync game from RAWG to our database
  async syncGameFromRAWG(rawgGame: RAWGGame): Promise<GameRow> {
    const gameData: GameInsert = {
      rawg_id: rawgGame.id,
      name: rawgGame.name,
      description: rawgGame.description_raw || rawgGame.description || null,
      background_image: rawgGame.background_image,
      rating: rawgGame.rating,
      rating_top: rawgGame.rating_top,
      ratings_count: rawgGame.ratings_count,
      metacritic: rawgGame.metacritic,
      released: rawgGame.released,
      genres: rawgGame.genres || [],
      platforms: rawgGame.platforms || [],
      screenshots: rawgGame.short_screenshots || [],
    };

    // Try to insert, if conflict (game already exists), update it
    const { data, error } = await supabase
      .from('games')
      .upsert(gameData, { 
        onConflict: 'rawg_id',
        ignoreDuplicates: false 
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get popular games (sync from RAWG if needed)
  async getPopularGames(page = 1, pageSize = 40) {
    try {
      console.log('Fetching popular games from RAWG...');
      
      // Always fetch from RAWG for fresh data
      const rawgResponse = await rawgService.getPopularGames(page, Math.min(pageSize, 40));
      console.log('RAWG response successful for popular games, syncing games...');
      console.log('RAWG response:', rawgResponse);
      
      if (!rawgResponse.results || rawgResponse.results.length === 0) {
        console.log('No games from RAWG, checking database...');
        // Fallback to database
        const { data: existingGames, error: dbError } = await supabase
          .from('games')
          .select('*')
          .order('rating', { ascending: false })
          .order('ratings_count', { ascending: false })
          .limit(pageSize);

        console.log('Supabase fallback data for popular games:', existingGames);
        console.error('Supabase fallback error for popular games:', dbError);

        if (dbError) throw dbError;

        return {
          games: existingGames || [],
          hasMore: false,
        };
      }

      const syncedGames = await Promise.all(
        rawgResponse.results.map(game => this.syncGameFromRAWG(game))
      );

      return {
        games: syncedGames,
        hasMore: rawgResponse.next !== null,
      };
    } catch (error) {
      console.error('RAWG API failed for popular games, falling back to Supabase:', error);
      
      // Fallback to database on error
      try {
        const { data: existingGames, error: dbError } = await supabase
          .from('games')
          .select('*')
          .order('rating', { ascending: false })
          .order('ratings_count', { ascending: false })
          .limit(pageSize);

        console.log('Supabase fallback data after RAWG error (popular):', existingGames);
        console.error('Supabase fallback error after RAWG error (popular):', dbError);

        if (dbError) throw dbError;

        return {
          games: existingGames || [],
          hasMore: false,
        };
      } catch (dbError) {
        console.error('Database fallback failed:', dbError);
        throw error; // Throw original error
      }
    }
  },

  // Get trending games
  async getTrendingGames(page = 1, pageSize = 30) {
    try {
      console.log('Fetching trending games from RAWG...');
      const rawgResponse = await rawgService.getTrendingGames(page, Math.min(pageSize, 30));
      console.log('RAWG response successful for trending games, syncing games...');
      
      if (!rawgResponse.results || rawgResponse.results.length === 0) {
        // Fallback to popular games from database
        const { data: existingGames, error: dbError } = await supabase
          .from('games')
          .select('*')
          .order('rating', { ascending: false })
          .limit(pageSize);

        console.log('Supabase fallback data for trending games:', existingGames);
        console.error('Supabase fallback error for trending games:', dbError);

        if (dbError) throw dbError;

        return {
          games: existingGames || [],
          hasMore: false,
        };
      }

      const syncedGames = await Promise.all(
        rawgResponse.results.map(game => this.syncGameFromRAWG(game))
      );

      return {
        games: syncedGames,
        hasMore: rawgResponse.next !== null,
      };
    } catch (error) {
      console.error('RAWG API failed for trending games, falling back to Supabase:', error);
      
      // Fallback to database
      try {
        const { data: existingGames, error: dbError } = await supabase
          .from('games')
          .select('*')
          .order('rating', { ascending: false })
          .limit(pageSize);

        console.log('Supabase fallback data after RAWG error (trending):', existingGames);
        console.error('Supabase fallback error after RAWG error (trending):', dbError);

        if (dbError) throw dbError;

        return {
          games: existingGames || [],
          hasMore: false,
        };
      } catch (dbError) {
        console.error('Database fallback failed:', dbError);
        throw error;
      }
    }
  },

  // Get game by ID from our database
  async getGameById(gameId: string): Promise<GameRow | null> {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .eq('id', gameId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }

    return data;
  },

  // Get game by RAWG ID
  async getGameByRawgId(rawgId: number): Promise<GameRow | null> {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .eq('rawg_id', rawgId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }

    return data;
  },

  // Search games
  async searchGames(query: string, page = 1, pageSize = 30) {
    try {
      console.log('Searching games:', query);
      
      // Search RAWG and sync results
      const rawgResponse = await rawgService.searchGames(query, page, Math.min(pageSize, 30));
      
      if (!rawgResponse.results || rawgResponse.results.length === 0) {
        return {
          games: [],
          hasMore: false,
        };
      }

      const syncedGames = await Promise.all(
        rawgResponse.results.map(game => this.syncGameFromRAWG(game))
      );

      return {
        games: syncedGames,
        hasMore: rawgResponse.next !== null,
      };
    } catch (error) {
      console.error('Error searching games:', error);
      return {
        games: [],
        hasMore: false,
      };
    }
  },

  // Get games by category (maps to genres)
  async getGamesByCategory(category: string, page = 1, pageSize = 30) {
    const categoryMap: { [key: string]: number } = {
      'action': 4,
      'shooter': 2,
      'racing': 1,
      'puzzle': 7,
      'adventure': 3,
      'simulation': 14,
      'fighting': 6,
      'sports': 15,
      'multiplayer': 4, // Use action as fallback
    };

    const genreId = categoryMap[category];
    if (!genreId) {
      return this.getPopularGames(page, pageSize);
    }

    try {
      const rawgResponse = await rawgService.getGamesByGenre(genreId, page, Math.min(pageSize, 30));
      
      if (!rawgResponse.results || rawgResponse.results.length === 0) {
        return {
          games: [],
          hasMore: false,
        };
      }

      const syncedGames = await Promise.all(
        rawgResponse.results.map(game => this.syncGameFromRAWG(game))
      );

      return {
        games: syncedGames,
        hasMore: rawgResponse.next !== null,
      };
    } catch (error) {
      console.error('Error fetching games by category:', error);
      return {
        games: [],
        hasMore: false,
      };
    }
  },

  // Add game to favorites
  async addToFavorites(gameId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('user_favorites')
      .insert({
        user_id: user.id,
        game_id: gameId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Remove game from favorites
  async removeFromFavorites(gameId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('user_favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('game_id', gameId);

    if (error) throw error;
  },

  // Get user's favorite games
  async getUserFavorites(userId?: string) {
    const targetUserId = userId || (await supabase.auth.getUser()).data.user?.id;
    if (!targetUserId) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('user_favorites')
      .select(`
        *,
        games (*)
      `)
      .eq('user_id', targetUserId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Check if game is in user's favorites
  async isGameFavorited(gameId: string): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data, error } = await supabase
      .from('user_favorites')
      .select('id')
      .eq('user_id', user.id)
      .eq('game_id', gameId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return !!data;
  },

  // Add or update user review
  async addReview(gameId: string, rating: number, reviewText?: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('user_reviews')
      .upsert({
        user_id: user.id,
        game_id: gameId,
        rating,
        review_text: reviewText,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get reviews for a game
  async getGameReviews(gameId: string) {
    const { data, error } = await supabase
      .from('user_reviews')
      .select(`
        *,
        profiles (username, full_name, avatar_url)
      `)
      .eq('game_id', gameId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Get user's reviews
  async getUserReviews(userId?: string) {
    const targetUserId = userId || (await supabase.auth.getUser()).data.user?.id;
    if (!targetUserId) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('user_reviews')
      .select(`
        *,
        games (*)
      `)
      .eq('user_id', targetUserId)
      .order('created_at', { ascending: false});

    if (error) throw error;
    return data;
  },
};