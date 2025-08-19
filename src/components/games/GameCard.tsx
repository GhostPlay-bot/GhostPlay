import React, { useState, useEffect } from 'react';
import { Star, Heart, Calendar, Users, Play, Download, Eye, Zap, Store } from 'lucide-react';
import { marketplaceService } from '../../lib/marketplace';
import { useFavorites } from '../../hooks/useGames';
import { useAuth } from '../../hooks/useAuth';
import type { Database } from '../../lib/database.types';

type GameRow = Database['public']['Tables']['games']['Row'];

interface GameCardProps {
  game: GameRow;
  onClick?: () => void;
  viewMode?: 'grid' | 'list';
  className?: string;
  style?: React.CSSProperties;
}

export function GameCard({ game, onClick, viewMode = 'grid', className = '', style }: GameCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [listingCount, setListingCount] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  
  const { isAuthenticated } = useAuth();
  const { addToFavorites, removeFromFavorites, isGameFavorited } = useFavorites();

  useEffect(() => {
    loadListingCount();
    if (isAuthenticated) {
      checkFavoriteStatus();
    }
  }, [game.id]);

  const loadListingCount = async () => {
    try {
      const count = await marketplaceService.getGameListingCount(game.id);
      setListingCount(count);
    } catch (error) {
      console.error('Error loading listing count:', error);
    }
  };

  const checkFavoriteStatus = async () => {
    try {
      const favorited = await isGameFavorited(game.id);
      setIsFavorited(favorited);
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  };

  const handleFavoriteToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) return;
    
    setFavoriteLoading(true);
    try {
      if (isFavorited) {
        await removeFromFavorites(game.id);
        setIsFavorited(false);
      } else {
        await addToFavorites(game.id);
        setIsFavorited(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setFavoriteLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'TBA';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getGenreNames = () => {
    if (!game.genres || !Array.isArray(game.genres)) return [];
    return (game.genres as any[]).slice(0, 2).map(genre => genre.name);
  };

  const getPlatformNames = () => {
    if (!game.platforms || !Array.isArray(game.platforms)) return [];
    return (game.platforms as any[]).slice(0, 2).map(platform => platform.platform?.name || platform.name);
  };

  if (viewMode === 'list') {
    return (
      <div
        className={`glass-card group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:glow-green overflow-hidden ${className}`}
        onClick={onClick}
        style={style}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center p-4 space-x-4">
          {/* Game Image */}
          <div className="relative w-24 h-16 flex-shrink-0 overflow-hidden rounded-lg">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
            )}
            <img
              src={game.background_image || '/placeholder-game.jpg'}
              alt={game.name}
              className={`w-full h-full object-cover transition-all duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder-game.jpg';
                setImageLoaded(true);
              }}
            />
          </div>

          {/* Game Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white text-lg truncate group-hover:text-green-400 transition-colors">
              {game.name}
            </h3>
            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-400">
              {game.rating && (
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span>{game.rating.toFixed(1)}</span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(game.released)}</span>
              </div>
              {game.ratings_count && (
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>{game.ratings_count.toLocaleString()}</span>
                </div>
              )}
              {listingCount > 0 && (
                <div className="flex items-center space-x-1 text-green-400">
                  <Store className="w-3 h-3" />
                  <span>{listingCount} for sale</span>
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {getGenreNames().slice(0, 2).map((genre, index) => (
                <span
                  key={index}
                  className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {game.metacritic && (
              <div className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold ${
                game.metacritic >= 75 ? 'bg-green-500' : 
                game.metacritic >= 50 ? 'bg-yellow-500' : 'bg-red-500'
              }`}>
                {game.metacritic}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`glass-card group cursor-pointer transition-all duration-500 hover:scale-105 hover:glow-green overflow-hidden transform-gpu ${className}`}
      onClick={onClick}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Game Image */}
      <div className="relative aspect-video overflow-hidden group">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
          </div>
        )}
        <img
          src={game.background_image || '/placeholder-game.jpg'}
          alt={game.name}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder-game.jpg';
            setImageLoaded(true);
          }}
        />
        
        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="flex space-x-2">
              <button className="p-2 bg-green-500/80 hover:bg-green-600/80 rounded-full transition-colors">
                <Play className="w-4 h-4 text-white" />
              </button>
              <button className="p-2 bg-blue-500/80 hover:bg-blue-600/80 rounded-full transition-colors">
                <Download className="w-4 h-4 text-white" />
              </button>
            </div>
            <button className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors">
              <Eye className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
        
        {/* Favorite Button */}
        {isAuthenticated && (
          <button
            onClick={handleFavoriteToggle}
            disabled={favoriteLoading}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
              isFavorited 
                ? 'bg-red-500/80 text-white' 
                : 'bg-black/60 text-gray-300 hover:text-red-400'
            } ${favoriteLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
        )}

        {/* Rating Badge */}
        {game.rating && (
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1 border border-white/10">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-white text-xs font-semibold">
              {game.rating.toFixed(1)}
            </span>
          </div>
        )}

        {/* Metacritic Score */}
        {game.metacritic && (
          <div className={`absolute bottom-3 left-3 w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold shadow-lg ${
            game.metacritic >= 75 ? 'bg-green-500' : 
            game.metacritic >= 50 ? 'bg-yellow-500' : 'bg-red-500'
          }`}>
            {game.metacritic}
          </div>
        )}
      </div>

      {/* Game Info */}
      <div className="p-5 space-y-3">
        <div>
          <h3 className="font-bold text-white text-lg line-clamp-1 group-hover:text-green-400 transition-colors duration-300">
            {game.name}
          </h3>
          
          {/* Genres */}
          <div className="flex flex-wrap gap-1 mt-2">
            {getGenreNames().map((genre, index) => (
              <span
                key={index}
                className="text-xs bg-gradient-to-r from-white/10 to-white/5 text-gray-300 px-2 py-1 rounded-full border border-white/5 hover:border-white/20 transition-colors"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-400 pt-2 border-t border-white/5">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(game.released)}</span>
          </div>
          
          {game.ratings_count && (
            <div className="flex items-center space-x-1">
              <Zap className="w-4 h-4 text-green-400" />
              <span>{(game.ratings_count / 1000).toFixed(0)}K</span>
            </div>
          )}
          
          {listingCount > 0 && (
            <div className="flex items-center space-x-1 text-green-400">
              <Store className="w-4 h-4" />
              <span>{listingCount} for sale</span>
            </div>
          )}
        </div>

        {/* Platforms */}
        <div className="flex flex-wrap gap-1">
          {getPlatformNames().map((platform, index) => (
            <span
              key={index}
              className="text-xs bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 px-2 py-1 rounded-md border border-blue-500/10"
            >
              {platform}
            </span>
          ))}
        </div>

        {/* Description Preview */}
        {game.description && (
          <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
            {game.description.replace(/<[^>]*>/g, '').substring(0, 100)}...
          </p>
        )}

        {/* Action Buttons - Only show on hover */}
        <div className={`flex space-x-2 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          <button className="flex-1 py-2 bg-gradient-to-r from-green-400/20 to-blue-500/20 hover:from-green-400/30 hover:to-blue-500/30 rounded-lg text-sm font-medium text-white transition-all duration-300 border border-green-400/20">
            Quick View
          </button>
        </div>
      </div>
    </div>
  );
}