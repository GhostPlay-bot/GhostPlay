import { useState, useEffect } from 'react';
import { gamesService } from '../lib/games';
import { useAuth } from './useAuth';
import type { Database } from '../lib/database.types';

type GameRow = Database['public']['Tables']['games']['Row'];

export function useGames() {
  const [popularGames, setPopularGames] = useState<GameRow[]>([]);
  const [trendingGames, setTrendingGames] = useState<GameRow[]>([]);
  const [popularPage, setPopularPage] = useState(1);
  const [trendingPage, setTrendingPage] = useState(1);
  const [hasMorePopular, setHasMorePopular] = useState(true);
  const [hasMoreTrending, setHasMoreTrending] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    let mounted = true;
    
    const loadInitialGames = async () => {
      if (initialized) return; // Prevent multiple loads
      
      try {
        setLoading(true);
        setError(null);

        const [popularResult, trendingResult] = await Promise.all([
          gamesService.getPopularGames(1, 40),
          gamesService.getTrendingGames(1, 40),
        ]);

        if (mounted) {
          setPopularGames(popularResult.games || []);
          setTrendingGames(trendingResult.games || []);
          setHasMorePopular(popularResult.hasMore);
          setHasMoreTrending(trendingResult.hasMore);
          setPopularPage(1);
          setTrendingPage(1);
          setInitialized(true);
        }
      } catch (err) {
        console.error('Error loading games:', err);
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load games');
          // Set some fallback data to prevent infinite loading
          setPopularGames([]);
          setTrendingGames([]);
          setInitialized(true);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    // Add a small delay to prevent immediate loading
    const timer = setTimeout(loadInitialGames, 100);
    
    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, []); // Remove initialized dependency to prevent loops

  const searchGames = async (query: string) => {
    try {
      setError(null);

      const result = await gamesService.searchGames(query, 1, 40);

      return result.games || [];
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'Failed to search games');
      return [];
    }
  };

  const getGamesByCategory = async (category: string) => {
    try {
      setError(null);

      const result = await gamesService.getGamesByCategory(category, 1, 40);

      return result.games || [];
    } catch (err) {
      console.error('Category error:', err);
      setError(err instanceof Error ? err.message : 'Failed to load category games');
      return [];
    }
  };

  const loadMorePopular = async () => {
    try {
      const nextPage = popularPage + 1;
      const result = await gamesService.getPopularGames(nextPage, 40);
      setPopularGames(prev => [...prev, ...result.games]);
      setHasMorePopular(result.hasMore);
      setPopularPage(nextPage);
      return result.hasMore;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load more games');
      return false;
    }
  };

  const loadMoreTrending = async () => {
    try {
      const nextPage = trendingPage + 1;
      const result = await gamesService.getTrendingGames(nextPage, 40);
      setTrendingGames(prev => [...prev, ...result.games]);
      setHasMoreTrending(result.hasMore);
      setTrendingPage(nextPage);
      return result.hasMore;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load more games');
      return false;
    }
  };

  const refreshGames = () => {
    setInitialized(false);
    setPopularPage(1);
    setTrendingPage(1);
    setHasMorePopular(true);
    setHasMoreTrending(true);
    setLoading(true);
    setError(null);
  };

  return {
    popularGames,
    trendingGames,
    hasMorePopular,
    hasMoreTrending,
    loading: loading && !initialized,
    error,
    searchGames,
    getGamesByCategory,
    loadMorePopular,
    loadMoreTrending,
    refreshGames,
    initialized,
  };
}

export function useGameDetails(gameId: string | null) {
  const [game, setGame] = useState<GameRow | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!gameId) {
      setGame(null);
      return;
    }

    loadGameDetails(gameId);
  }, [gameId]);

  const loadGameDetails = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const gameData = await gamesService.getGameById(id);
      setGame(gameData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load game details');
      console.error('Error loading game details:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    game,
    loading,
    error,
    refetch: () => gameId && loadGameDetails(gameId),
  };
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const { isAuthenticated } = useAuth();

  const loadFavorites = async () => {
    if (!isAuthenticated) {
      setFavorites([]);
      setInitialized(true);
      return;
    }
    
    if (loading) return; // Prevent multiple simultaneous loads
    
    try {
      setLoading(true);
      const userFavorites = await gamesService.getUserFavorites();
      setFavorites(userFavorites || []);
      setInitialized(true);
    } catch (err) {
      console.error('Error loading favorites:', err);
      setFavorites([]);
      setInitialized(true);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (gameId: string) => {
    if (!isAuthenticated) {
      throw new Error('User not authenticated');
    }
    
    try {
      await gamesService.addToFavorites(gameId);
      // Reload favorites
      await loadFavorites();
    } catch (err) {
      console.error('Error adding to favorites:', err);
      throw err;
    }
  };

  const removeFromFavorites = async (gameId: string) => {
    if (!isAuthenticated) {
      throw new Error('User not authenticated');
    }
    
    try {
      await gamesService.removeFromFavorites(gameId);
      // Reload favorites
      await loadFavorites();
    } catch (err) {
      console.error('Error removing from favorites:', err);
      throw err;
    }
  };

  const isGameFavorited = async (gameId: string) => {
    if (!isAuthenticated) {
      return false;
    }
    
    try {
      return await gamesService.isGameFavorited(gameId);
    } catch (err) {
      console.error('Error checking if game is favorited:', err);
      return false;
    }
  };

  useEffect(() => {
    if (!initialized) {
      loadFavorites();
    }
  }, [initialized, isAuthenticated]);

  return {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    isGameFavorited,
    refetch: loadFavorites,
  };
}