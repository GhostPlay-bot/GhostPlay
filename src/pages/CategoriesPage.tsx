import React, { useState, useEffect } from 'react';
import { Grid, Gamepad2, Sword, Target, Car, Puzzle, Users, Zap, Shield, Crown, Flame, List } from 'lucide-react';
import { GameCard } from '../components/games/GameCard';
import { useGames } from '../hooks/useGames';

interface CategoriesPageProps {
  onGameClick: (game: any) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
}

const categories = [
  { id: 'all', name: 'All', icon: Gamepad2, color: 'from-gray-400 to-gray-600' },
  { id: 'action', name: 'Action', icon: Sword, color: 'from-red-400 to-red-600' },
  { id: 'shooter', name: 'Shooter', icon: Target, color: 'from-orange-400 to-orange-600' },
  { id: 'racing', name: 'Racing', icon: Car, color: 'from-blue-400 to-blue-600' },
  { id: 'puzzle', name: 'Puzzle', icon: Puzzle, color: 'from-purple-400 to-purple-600' },
  { id: 'multiplayer', name: 'Multiplayer', icon: Users, color: 'from-green-400 to-green-600' },
  { id: 'adventure', name: 'Adventure', icon: Crown, color: 'from-yellow-400 to-yellow-600' },
  { id: 'simulation', name: 'Simulation', icon: Shield, color: 'from-teal-400 to-teal-600' },
  { id: 'fighting', name: 'Fighting', icon: Flame, color: 'from-pink-400 to-pink-600' },
  { id: 'sports', name: 'Sports', icon: Zap, color: 'from-indigo-400 to-indigo-600' },
];

export function CategoriesPage({ onGameClick, viewMode, setViewMode }: CategoriesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredGames, setFilteredGames] = useState<any[]>([]);
  const [categoryPage, setCategoryPage] = useState(1);
  const [hasMoreCategory, setHasMoreCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const { popularGames, getGamesByCategory, loading: gamesLoading, initialized } = useGames();

  useEffect(() => {
    if (initialized || popularGames.length > 0) {
      loadCategoryGames();
    }
  }, [selectedCategory, initialized]);

  const loadCategoryGames = async () => {
    if (selectedCategory === 'all') {
      setFilteredGames(popularGames);
      setHasMoreCategory(false);
      setCategoryPage(1);
      return;
    }

    setLoading(true);
    try {
      const result = await getGamesByCategory(selectedCategory);
      const games = Array.isArray(result) ? result : result.games || [];
      setFilteredGames(games);
      setHasMoreCategory(games.length >= 40);
      setCategoryPage(1);
    } catch (error) {
      console.error('Error loading category games:', error);
      setFilteredGames([]);
      setHasMoreCategory(false);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreCategory = async () => {
    if (selectedCategory === 'all') return;

    setLoadingMore(true);
    try {
      const nextPage = categoryPage + 1;
      const result = await getGamesByCategory(selectedCategory);
      const games = Array.isArray(result) ? result : result.games || [];
      setFilteredGames(prev => [...prev, ...games]);
      setHasMoreCategory(games.length >= 40);
      setCategoryPage(nextPage);
    } catch (error) {
      console.error('Error loading category games:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  // Show loading only if we're actually loading and have no data
  if (gamesLoading && !initialized && popularGames.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-6 neon-glow"></div>
          <p className="text-gray-400 text-lg">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="glass-card p-6">
        <h3 className="text-2xl font-bold mb-6 flex items-center text-shadow">
          <Grid className="w-7 h-7 mr-3 text-green-400" />
          Browse By Category
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-3">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group relative p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  isSelected
                    ? 'bg-gradient-to-br ' + category.color + ' shadow-lg neon-glow'
                    : 'bg-gray-800/30 hover:bg-gray-700/50 border border-gray-700/50'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className={`p-3 rounded-lg transition-all duration-300 ${
                    isSelected 
                      ? 'bg-white/20' 
                      : 'bg-gray-700/30 group-hover:bg-gray-600/50'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      isSelected ? 'text-white' : 'text-gray-300 group-hover:text-white'
                    }`} />
                  </div>
                  <span className={`text-sm font-medium text-center leading-tight ${
                    isSelected ? 'text-white' : 'text-gray-300 group-hover:text-white'
                  }`}>
                    {category.name}
                  </span>
                </div>
                
                {/* Glow effect for selected category */}
                {isSelected && (
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${category.color} opacity-20 blur-xl -z-10`} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Header with View Controls */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold flex items-center text-shadow">
          <Grid className="w-8 h-8 mr-3 text-green-400" />
          {categories.find(c => c.id === selectedCategory)?.name || 'All'} Games
          {filteredGames.length > 0 && (
            <span className="ml-3 text-lg text-gray-400">({filteredGames.length})</span>
          )}
        </h2>

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

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-20 h-20 border-4 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-6 neon-glow"></div>
            <p className="text-gray-400 text-lg">Loading {categories.find(c => c.id === selectedCategory)?.name.toLowerCase()} games...</p>
          </div>
        </div>
      )}

      {/* Games Grid */}
      {!loading && filteredGames.length > 0 && (
        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
            : 'space-y-4'
        }`}>
          {filteredGames.map((game, index) => (
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
      )}

      {/* Load More Button */}
      {!loading && filteredGames.length > 0 && hasMoreCategory && selectedCategory !== 'all' && (
        <div className="flex justify-center mt-12">
          <button
            onClick={loadMoreCategory}
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
                <Grid className="w-5 h-5" />
                <span>Load More {categories.find(c => c.id === selectedCategory)?.name} Games</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredGames.length === 0 && (
        <div className="text-center py-20">
          <Grid className="w-24 h-24 text-gray-600 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-400 mb-4">No Games Found</h3>
          <p className="text-gray-500 mb-6">
            No games found in the {categories.find(c => c.id === selectedCategory)?.name.toLowerCase()} category.
          </p>
          <button
            onClick={() => setSelectedCategory('all')}
            className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 rounded-lg font-semibold transition-all duration-200"
          >
            View All Games
          </button>
        </div>
      )}
    </div>
  );
}