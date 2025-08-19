import React from 'react';
import { TrendingUp, Grid, List } from 'lucide-react';
import { GameCard } from '../components/games/GameCard';
import { useGames } from '../hooks/useGames';
import { useState } from 'react';

interface TrendingPageProps {
  onGameClick: (game: any) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  loadMoreTrending: () => Promise<boolean>;
  hasMoreTrending: boolean;
}

export function TrendingPage({ onGameClick, viewMode, setViewMode, loadMoreTrending, hasMoreTrending }: TrendingPageProps) {
  const { trendingGames, loading, error, initialized } = useGames();
  const [loadingMore, setLoadingMore] = useState(false);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    try {
      await loadMoreTrending();
    } catch (error) {
      console.error('Error loading more trending games:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  // Show loading only if we're actually loading and have no data
  if (loading && !initialized && trendingGames.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-6 neon-glow-purple"></div>
          <p className="text-gray-400 text-lg">Loading trending games...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card p-8 text-center mb-8">
        <div className="text-red-400 mb-4">
          <TrendingUp className="w-12 h-12 mx-auto mb-2" />
          <h3 className="text-xl font-semibold">Connection Lost</h3>
        </div>
        <p className="text-gray-400 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 rounded-lg font-semibold transition-all duration-200"
        >
          Reconnect
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Content Header with View Controls */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold flex items-center text-shadow">
          <TrendingUp className="w-8 h-8 mr-3 text-purple-400" />
          Trending Now
          {trendingGames.length > 0 && (
            <span className="ml-3 text-lg text-gray-400">({trendingGames.length})</span>
          )}
        </h2>

        {/* View Mode Controls */}
        <div className="flex items-center bg-gray-800/30 rounded-lg p-1 border border-gray-700/50">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded transition-all duration-300 ${
              viewMode === 'grid' 
                ? 'bg-purple-400/20 text-purple-400 neon-glow-purple' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded transition-all duration-300 ${
              viewMode === 'list' 
                ? 'bg-purple-400/20 text-purple-400 neon-glow-purple' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Games Grid */}
      {trendingGames.length > 0 ? (
        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
            : 'space-y-4'
        }`}>
          {trendingGames.map((game, index) => (
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
      ) : null}

      {/* Load More Button */}
      {trendingGames.length > 0 && hasMoreTrending && (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="px-8 py-4 bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
          >
            {loadingMore ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Loading More Trending...</span>
              </>
            ) : (
              <>
                <TrendingUp className="w-5 h-5" />
                <span>Load More Trending</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Empty State */}
      {trendingGames.length === 0 && !loading && (
        <div className="text-center py-20">
          <TrendingUp className="w-24 h-24 text-gray-600 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-400 mb-4">No Trending Games</h3>
          <p className="text-gray-500 mb-6">
            We're having trouble loading trending games right now.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 rounded-lg font-semibold transition-all duration-200"
          >
            Reload Games
          </button>
        </div>
      )}
    </div>
  );
}