import React, { useEffect } from 'react';
import { Heart, Grid, List } from 'lucide-react';
import { GameCard } from '../components/games/GameCard';
import { useFavorites } from '../hooks/useGames';
import { useAuth } from '../hooks/useAuth';

interface FavoritesPageProps {
  onGameClick: (game: any) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
}

export function FavoritesPage({ onGameClick, viewMode, setViewMode }: FavoritesPageProps) {
  const { isAuthenticated } = useAuth();
  const { favorites, loading } = useFavorites();

  if (!isAuthenticated) {
    return (
      <div className="text-center py-20">
        <Heart className="w-24 h-24 text-gray-600 mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-gray-400 mb-4">Sign In Required</h3>
        <p className="text-gray-500 mb-6">
          Please sign in to view your favorite games.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-red-400 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-gray-400 text-lg">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  const favoriteGames = favorites.map(fav => fav.games).filter(Boolean);

  return (
    <div className="space-y-8">
      {/* Content Header with View Controls */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold flex items-center text-shadow">
          <Heart className="w-8 h-8 mr-3 text-red-400" />
          Your Favorites
          {favoriteGames.length > 0 && (
            <span className="ml-3 text-lg text-gray-400">({favoriteGames.length})</span>
          )}
        </h2>

        {/* View Mode Controls - Only show if there are favorites */}
        {favoriteGames.length > 0 && (
          <div className="flex items-center bg-gray-800/30 rounded-lg p-1 border border-gray-700/50">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-all duration-300 ${
                viewMode === 'grid' 
                  ? 'bg-red-400/20 text-red-400' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-all duration-300 ${
                viewMode === 'list' 
                  ? 'bg-red-400/20 text-red-400' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Games Grid */}
      {favoriteGames.length > 0 ? (
        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
            : 'space-y-4'
        }`}>
          {favoriteGames.map((game, index) => (
            <GameCard
              key={game.id}
              game={game}
              onClick={() => onGameClick(game)}
              viewMode={viewMode}
              className={`animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <Heart className="w-24 h-24 text-gray-600 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-400 mb-4">No Favorites Yet</h3>
          <p className="text-gray-500 mb-6">
            Start adding games to your favorites to see them here!
          </p>
        </div>
      )}
    </div>
  );
}