import React, { useState, useEffect } from 'react';
import { Store, Grid, List, Filter, DollarSign, Eye, MessageCircle } from 'lucide-react';
import { GameCard } from '../components/games/GameCard';
import { marketplaceService, type GameListing } from '../lib/marketplace';

interface MarketplacePageProps {
  onGameClick: (game: any) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
}

const platforms = ['All', 'PC', 'PlayStation 5', 'PlayStation 4', 'Xbox Series X/S', 'Xbox One', 'Nintendo Switch'];
const conditions = ['All', 'New', 'Like New', 'Good', 'Fair'];
const gameTypes = ['All', 'Physical', 'Digital Account', 'Game Key'];

export function MarketplacePage({ onGameClick, viewMode, setViewMode }: MarketplacePageProps) {
  const [listings, setListings] = useState<GameListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const [filters, setFilters] = useState({
    platform: 'All',
    condition: 'All',
    gameType: 'All',
    minPrice: '',
    maxPrice: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (!initialized) {
      loadListings();
    }
  }, []);

  const loadListings = async () => {
    if (loading && initialized) return; // Prevent multiple loads
    
    try {
      setLoading(true);
      const result = await marketplaceService.getAllListings(1, 50);
      setListings(result.listings);
      setInitialized(true);
    } catch (error) {
      console.error('Error loading listings:', error);
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredListings = listings.filter((listing) => {
    if (filters.platform !== 'All' && listing.platform !== filters.platform) return false;
    if (filters.condition !== 'All' && listing.condition !== filters.condition) return false;
    if (filters.gameType !== 'All' && listing.game_type !== filters.gameType) return false;
    if (filters.minPrice && listing.price < parseFloat(filters.minPrice)) return false;
    if (filters.maxPrice && listing.price > parseFloat(filters.maxPrice)) return false;
    return true;
  });

  const handleContactSeller = (listing: GameListing) => {
    const contactInfo = listing.contact_info as any;
    if (contactInfo?.method === 'email') {
      window.open(`mailto:${contactInfo.value}?subject=Interested in ${listing.title}`);
    } else if (contactInfo?.method === 'discord') {
      alert(`Contact seller on Discord: ${contactInfo.value}`);
    } else if (contactInfo?.method === 'telegram') {
      window.open(`https://t.me/${contactInfo.value.replace('@', '')}`);
    }
  };

  // Only show loading if not initialized
  if (loading && !initialized) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-6 neon-glow"></div>
          <p className="text-gray-400 text-lg">Loading marketplace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold flex items-center text-shadow">
          <Store className="w-8 h-8 mr-3 text-green-400" />
          Game Marketplace
          {filteredListings.length > 0 && (
            <span className="ml-3 text-lg text-gray-400">({filteredListings.length})</span>
          )}
        </h2>

        <div className="flex items-center space-x-4">
          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-800/30 hover:bg-gray-700/50 rounded-lg transition-colors border border-gray-700/50"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>

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
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="glass-card p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Platform</label>
              <select
                value={filters.platform}
                onChange={(e) => setFilters({ ...filters, platform: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-400"
              >
                {platforms.map((platform) => (
                  <option key={platform} value={platform} className="bg-gray-800">
                    {platform}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Condition</label>
              <select
                value={filters.condition}
                onChange={(e) => setFilters({ ...filters, condition: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-400"
              >
                {conditions.map((condition) => (
                  <option key={condition} value={condition} className="bg-gray-800">
                    {condition}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
              <select
                value={filters.gameType}
                onChange={(e) => setFilters({ ...filters, gameType: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-400"
              >
                {gameTypes.map((type) => (
                  <option key={type} value={type} className="bg-gray-800">
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Min Price</label>
              <input
                type="number"
                placeholder="$0"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Max Price</label>
              <input
                type="number"
                placeholder="$999"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
              />
            </div>
          </div>
        </div>
      )}

      {/* Listings */}
      {filteredListings.length > 0 ? (
        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
            : 'space-y-4'
        }`}>
          {filteredListings.map((listing, index) => (
            <div
              key={listing.id}
              className={`glass-card group cursor-pointer transition-all duration-300 hover:scale-105 hover:glow-green overflow-hidden ${
                viewMode === 'list' ? 'flex items-center p-4 space-x-4' : 'p-4'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {viewMode === 'grid' ? (
                <>
                  {/* Game Image */}
                  <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
                    <img
                      src={listing.game?.background_image || '/placeholder-game.jpg'}
                      alt={listing.game?.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                      ${listing.price}
                    </div>
                    <div className="absolute top-2 left-2 bg-black/60 text-white px-2 py-1 rounded-full text-xs">
                      {listing.condition}
                    </div>
                  </div>

                  {/* Listing Info */}
                  <div className="space-y-3">
                    <h3 className="font-bold text-white text-lg line-clamp-1 group-hover:text-green-400 transition-colors">
                      {listing.title}
                    </h3>
                    
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{listing.platform}</span>
                      <span>{listing.game_type}</span>
                    </div>

                    {listing.description && (
                      <p className="text-gray-400 text-sm line-clamp-2">
                        {listing.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <Eye className="w-4 h-4" />
                        <span>{listing.views_count || 0}</span>
                      </div>
                      
                      <button
                        onClick={() => handleContactSeller(listing)}
                        className="flex items-center space-x-1 px-3 py-1 bg-green-500/20 hover:bg-green-500/30 rounded-lg text-green-400 text-sm font-medium transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Contact</span>
                      </button>
                    </div>

                    {/* Seller Info */}
                    <div className="flex items-center space-x-2 pt-2 border-t border-white/10">
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                        style={{ backgroundColor: listing.seller?.profile_color || '#22c55e' }}
                      >
                        {(listing.seller?.display_name || listing.seller?.full_name || 'U').charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm text-gray-400">
                        {listing.seller?.display_name || listing.seller?.full_name || 'Anonymous'}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* List View */}
                  <img
                    src={listing.game?.background_image || '/placeholder-game.jpg'}
                    alt={listing.game?.name}
                    className="w-24 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white text-lg truncate group-hover:text-green-400 transition-colors">
                      {listing.title}
                    </h3>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-400">
                      <span>{listing.platform}</span>
                      <span>{listing.condition}</span>
                      <span>{listing.game_type}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-400">${listing.price}</div>
                      {listing.original_price && (
                        <div className="text-sm text-gray-400 line-through">
                          ${listing.original_price}
                        </div>
                      )}
                    </div>
                    
                    <button
                      onClick={() => handleContactSeller(listing)}
                      className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg text-green-400 font-medium transition-colors"
                    >
                      Contact Seller
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <Store className="w-24 h-24 text-gray-600 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-400 mb-4">No Listings Found</h3>
          <p className="text-gray-500 mb-6">
            {listings.length === 0 
              ? "No games are currently listed for sale. Be the first to list your game!"
              : "No listings match your current filters. Try adjusting your search criteria."
            }
          </p>
        </div>
      )}
    </div>
  );
}