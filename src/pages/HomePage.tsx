import React from 'react';
import { Star, Trophy, Zap, Play, Grid, List } from 'lucide-react';
import { GameCard } from '../components/games/GameCard';
import { useGames } from '../hooks/useGames';
import { useState } from 'react';

interface HomePageProps {
  searchResults: any[];
  onGameClick: (game: any) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  clearSearch: () => void;
  loadMorePopular: () => Promise<boolean>;
  hasMorePopular: boolean;
  loadMoreSearchResults: () => Promise<void>;
  hasMoreSearchResults: boolean;
}

export function HomePage({ 
  searchResults, 
  onGameClick, 
  viewMode, 
  setViewMode, 
  clearSearch,
  loadMorePopular,
  hasMorePopular,
  loadMoreSearchResults,
  hasMoreSearchResults
}: HomePageProps) {
  const { popularGames, loading, error, initialized } = useGames();
  const [loadingMore, setLoadingMore] = useState(false);
  const [setError] = useState<any>(null);

  const getCurrentGames = () => {
    return searchResults.length > 0 ? searchResults : popularGames;
  };

  const getTitle = () => {
    return searchResults.length > 0 ? 'Search Results' : 'Featured Games';
  };

  const handleLoadMore = async () => {
    setLoadingMore(true);
    try {
      if (searchResults.length > 0) {
        await loadMoreSearchResults();
      } else {
        await loadMorePopular();
      }
    } catch (error) {
      console.error('Error loading more games:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  const shouldShowLoadMore = searchResults.length > 0 ? hasMoreSearchResults : hasMorePopular;
  const hasGamesToShow = getCurrentGames().length > 0;

  // Show loading only if we're actually loading and have no data
  if (loading && !initialized && popularGames.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-6 neon-glow"></div>
          <p className="text-gray-400 text-lg">Loading epic games...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card p-8 text-center mb-8">
        <div className="text-red-400 mb-4">
          <Star className="w-12 h-12 mx-auto mb-2" />
          <h3 className="text-xl font-semibold">Connection Lost</h3>
        </div>
        <p className="text-gray-400 mb-4">{error}</p>
        <button
          onClick={() => {
            setError(null);
            window.location.reload();
          }}
          className="px-6 py-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 rounded-lg font-semibold transition-all duration-200"
        >
          Reconnect
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section - Only show when no search results */}
      {!searchResults.length && (
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-blue-500/10 to-purple-600/10 rounded-3xl blur-3xl"></div>
          <div className="relative">
            <h2 className="text-6xl md:text-7xl font-bold gradient-text mb-6 animate-pulse-glow text-shadow">
              Ghost Play
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Buy and sell used games at unbeatable prices. Build your collection while saving money.
            </p>
            <div className="flex items-center justify-center space-x-8 mt-8">
              <div className="flex items-center space-x-2 text-green-400">
                <Trophy className="w-6 h-6" />
                <span className="font-semibold">Great Deals</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-400">
                <Zap className="w-6 h-6" />
                <span className="font-semibold">Safe Trading</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-400">
                <Play className="w-6 h-6" />
                <span className="font-semibold">Easy Selling</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Header with View Controls */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <h2 className="text-3xl font-bold flex items-center text-shadow">
            <Star className="w-8 h-8 mr-3 text-yellow-400" />
            {getTitle()}
            {getCurrentGames().length > 0 && (
              <span className="ml-3 text-lg text-gray-400">({getCurrentGames().length})</span>
            )}
          </h2>
          {searchResults.length > 0 && (
            <button
              onClick={clearSearch}
              className="px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors border border-gray-700/50"
            >
              Clear Search
            </button>
          )}
        </div>

        {/* View Mode Controls */}
        <div className="flex items-center bg-gray-800/30 rounded-lg p-1 border border-gray-700/50">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded transition-all duration-300 ${
              viewMode === 'grid' 
                ? 'bg-green-400/20 text-green-400 neon-glow' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded transition-all duration-300 ${
              viewMode === 'list' 
                ? 'bg-green-400/20 text-green-400 neon-glow' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Games Grid */}
      {hasGamesToShow ? (
        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
            : 'space-y-4'
        }`}>
          {getCurrentGames().map((game, index) => (
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
      {hasGamesToShow && shouldShowLoadMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="px-8 py-4 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
          >
            {loadingMore ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Loading More Games...</span>
              </>
            ) : (
              <>
                <Star className="w-5 h-5" />
                <span>Load More Games</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Empty State */}
      {!hasGamesToShow && (
        <div className="text-center py-20">
          <Star className="w-24 h-24 text-gray-600 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-400 mb-4">No Games Found</h3>
          <p className="text-gray-500 mb-6">
            {searchResults.length > 0 
              ? "No games match your search criteria. Try different keywords."
              : "We're having trouble loading games right now. Please check your connection and try again."
            }
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 rounded-lg font-semibold transition-all duration-200"
          >
            Reload Games
          </button>
        </div>
      )}
    </div>
  );
}