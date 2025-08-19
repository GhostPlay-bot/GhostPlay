import React, { useState, useEffect } from 'react';
import { X, Star, Calendar, Users, Monitor, Heart, Play, Download, Share2, Trophy, Zap, Shield, Store, DollarSign, MessageCircle } from 'lucide-react';
import { marketplaceService, type GameListing } from '../../lib/marketplace';
import type { Database } from '../../lib/database.types';

type GameRow = Database['public']['Tables']['games']['Row'];

interface GameDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  game: GameRow | null;
}

export function GameDetailsModal({ isOpen, onClose, game }: GameDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'screenshots' | 'marketplace' | 'reviews'>('overview');
  const [listings, setListings] = useState<GameListing[]>([]);
  const [loadingListings, setLoadingListings] = useState(false);

  useEffect(() => {
    if (game) loadGameListings();
  }, [game?.id]);

  const loadGameListings = async () => {
    if (!game) return;
    
    setLoadingListings(true);
    try {
      const gameListings = await marketplaceService.getGameListings(game.id);
      setListings(gameListings);
    } catch (error) {
      console.error('Error loading game listings:', error);
    } finally {
      setLoadingListings(false);
    }
  };

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

  if (!isOpen || !game) return null;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'TBA';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getGenres = () => {
    if (!game.genres || !Array.isArray(game.genres)) return [];
    return game.genres as any[];
  };

  const getPlatforms = () => {
    if (!game.platforms || !Array.isArray(game.platforms)) return [];
    return game.platforms as any[];
  };

  const getScreenshots = () => {
    if (!game.screenshots || !Array.isArray(game.screenshots)) return [];
    return game.screenshots as any[];
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass-card w-full max-w-6xl max-h-[90vh] overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <div className="overflow-y-auto max-h-[90vh]">
          {/* Hero Section */}
          <div className="relative h-80 overflow-hidden">
            <img
              src={game.background_image || '/placeholder-game.jpg'}
              alt={game.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            {/* Game Info Overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-end justify-between">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-white mb-2">{game.name}</h1>
                  <div className="flex items-center space-x-4 mb-4">
                    {game.rating && (
                      <div className="flex items-center space-x-1 bg-black/50 rounded-full px-3 py-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white font-semibold">{game.rating.toFixed(1)}</span>
                      </div>
                    )}
                    {game.metacritic && (
                      <div className={`w-10 h-10 rounded flex items-center justify-center text-sm font-bold ${
                        game.metacritic >= 75 ? 'bg-green-500' : 
                        game.metacritic >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}>
                        {game.metacritic}
                      </div>
                    )}
                    <div className="flex items-center space-x-1 text-gray-300">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(game.released)}</span>
                    </div>
                    {game.ratings_count && (
                      <div className="flex items-center space-x-1 text-gray-300">
                        <Users className="w-4 h-4" />
                        <span>{game.ratings_count.toLocaleString()} reviews</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Genres */}
                  <div className="flex flex-wrap gap-2">
                    {getGenres().slice(0, 4).map((genre, index) => (
                      <span
                        key={index}
                        className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3 ml-6">
                  <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                    <Play className="w-5 h-5" />
                    <span>Play Now</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 rounded-xl font-semibold transition-all duration-300">
                    <Download className="w-5 h-5" />
                    <span>Download</span>
                  </button>

                  {/* Favorite button temporarily disabled */}

                  <button className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content Tabs */}
          <div className="p-6">
            <div className="flex space-x-1 mb-6 bg-white/5 rounded-xl p-1">
              {[
                { id: 'overview', label: 'Overview', icon: Monitor },
                { id: 'screenshots', label: 'Screenshots', icon: Trophy },
                { id: 'marketplace', label: `Marketplace (${listings.length})`, icon: Store },
                { id: 'reviews', label: 'Reviews', icon: Star },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 flex-1 justify-center ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-green-400/20 to-blue-500/20 text-green-400'
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Description */}
                {game.description && (
                  <div>
                    <h3 className="text-xl font-bold mb-3">About This Game</h3>
                    <p className="text-gray-300 leading-relaxed">
                      {game.description.replace(/<[^>]*>/g, '')}
                    </p>
                  </div>
                )}

                {/* Game Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="glass-card p-4 text-center">
                    <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{game.rating?.toFixed(1) || 'N/A'}</div>
                    <div className="text-sm text-gray-400">User Rating</div>
                  </div>
                  
                  <div className="glass-card p-4 text-center">
                    <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">
                      {game.ratings_count ? (game.ratings_count / 1000).toFixed(0) + 'K' : 'N/A'}
                    </div>
                    <div className="text-sm text-gray-400">Reviews</div>
                  </div>
                  
                  <div className="glass-card p-4 text-center">
                    <Zap className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{game.metacritic || 'N/A'}</div>
                    <div className="text-sm text-gray-400">Metacritic</div>
                  </div>
                </div>

                {/* Platforms */}
                <div>
                  <h3 className="text-xl font-bold mb-3">Available Platforms</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {getPlatforms().map((platform, index) => (
                      <div key={index} className="glass-card p-3 text-center">
                        <Monitor className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                        <div className="text-sm font-medium text-white">
                          {platform.platform?.name || platform.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* System Requirements */}
                <div>
                  <h3 className="text-xl font-bold mb-3">System Requirements</h3>
                  <div className="glass-card p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-green-400 mb-2">Minimum</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li><strong>OS:</strong> Windows 10 64-bit</li>
                          <li><strong>Processor:</strong> Intel i5-4430 / AMD FX-6300</li>
                          <li><strong>Memory:</strong> 8 GB RAM</li>
                          <li><strong>Graphics:</strong> NVIDIA GTX 960 / AMD R9 280</li>
                          <li><strong>Storage:</strong> 50 GB available space</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-400 mb-2">Recommended</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li><strong>OS:</strong> Windows 11 64-bit</li>
                          <li><strong>Processor:</strong> Intel i7-8700K / AMD Ryzen 5 3600</li>
                          <li><strong>Memory:</strong> 16 GB RAM</li>
                          <li><strong>Graphics:</strong> NVIDIA RTX 3070 / AMD RX 6700 XT</li>
                          <li><strong>Storage:</strong> 50 GB SSD space</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'marketplace' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Available Listings</h3>
                  {listings.length > 0 && (
                    <span className="text-sm text-gray-400">
                      {listings.length} listing{listings.length !== 1 ? 's' : ''} available
                    </span>
                  )}
                </div>
                
                {loadingListings ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : listings.length > 0 ? (
                  <div className="space-y-4">
                    {listings.map((listing) => (
                      <div key={listing.id} className="glass-card p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-white mb-2">{listing.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                              <span className="flex items-center space-x-1">
                                <Monitor className="w-4 h-4" />
                                <span>{listing.platform}</span>
                              </span>
                              <span className="px-2 py-1 bg-white/10 rounded-full">
                                {listing.condition}
                              </span>
                              <span className="px-2 py-1 bg-blue-500/20 rounded-full text-blue-400">
                                {listing.game_type}
                              </span>
                              {listing.is_multiplayer && (
                                <span className="px-2 py-1 bg-green-500/20 rounded-full text-green-400">
                                  Multiplayer
                                </span>
                              )}
                              {listing.includes_dlc && (
                                <span className="px-2 py-1 bg-purple-500/20 rounded-full text-purple-400">
                                  Includes DLC
                                </span>
                              )}
                            </div>
                            {listing.description && (
                              <p className="text-gray-300 mb-4">{listing.description}</p>
                            )}
                          </div>
                          
                          <div className="text-right ml-6">
                            <div className="text-3xl font-bold text-green-400 mb-1">
                              ${listing.price}
                            </div>
                            {listing.original_price && (
                              <div className="text-sm text-gray-400 line-through">
                                Originally ${listing.original_price}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          <div className="flex items-center space-x-4">
                            {/* Seller Info */}
                            <div className="flex items-center space-x-2">
                              <div 
                                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold text-white"
                                style={{ backgroundColor: listing.seller?.profile_color || '#22c55e' }}
                              >
                                {(listing.seller?.display_name || listing.seller?.full_name || 'U').charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-white">
                                  {listing.seller?.display_name || listing.seller?.full_name || 'Anonymous Seller'}
                                </div>
                                <div className="text-xs text-gray-400">
                                  Listed {new Date(listing.created_at).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => handleContactSeller(listing)}
                            className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 rounded-lg font-semibold transition-all duration-200"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>Contact Seller</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="glass-card p-8 text-center">
                    <Store className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400 mb-4">No listings available for this game yet.</p>
                    <p className="text-sm text-gray-500">
                      Be the first to sell your copy of this game!
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'screenshots' && (
              <div>
                <h3 className="text-xl font-bold mb-4">Screenshots</h3>
                {getScreenshots().length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getScreenshots().map((screenshot, index) => (
                      <div key={index} className="relative group overflow-hidden rounded-xl">
                        <img
                          src={screenshot.image}
                          alt={`Screenshot ${index + 1}`}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="glass-card p-8 text-center">
                    <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">No screenshots available for this game.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-xl font-bold mb-4">User Reviews</h3>
                <div className="glass-card p-8 text-center">
                  <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">Reviews feature coming soon!</p>
                  <p className="text-sm text-gray-500">
                    Be the first to share your thoughts about this game.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}