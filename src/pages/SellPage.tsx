import React, { useState, useEffect } from 'react';
import { DollarSign, Search, Plus, Monitor, Tag, MessageCircle, Eye } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useGames } from '../hooks/useGames';
import { marketplaceService } from '../lib/marketplace';

export function SellPage() {
  const { isAuthenticated } = useAuth();
  const { searchGames } = useGames();
  const [step, setStep] = useState<'search' | 'create'>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedGame, setSelectedGame] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    original_price: '',
    platform: 'PC',
    condition: 'Like New',
    game_type: 'Physical',
    is_multiplayer: false,
    includes_dlc: false,
    contact_method: 'email',
    contact_value: ''
  });

  if (!isAuthenticated) {
    return (
      <div className="text-center py-20">
        <DollarSign className="w-24 h-24 text-gray-600 mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-gray-400 mb-4">Sign In Required</h3>
        <p className="text-gray-500 mb-6">
          Please sign in to start selling your games.
        </p>
      </div>
    );
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const results = await searchGames(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGameSelect = (game: any) => {
    setSelectedGame(game);
    setFormData({
      ...formData,
      title: `${game.name} - ${formData.condition} Condition`
    });
    setStep('create');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGame) return;

    setLoading(true);
    try {
      await marketplaceService.createListing({
        game_id: selectedGame.id,
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        original_price: formData.original_price ? parseFloat(formData.original_price) : null,
        platform: formData.platform,
        condition: formData.condition,
        game_type: formData.game_type,
        is_multiplayer: formData.is_multiplayer,
        includes_dlc: formData.includes_dlc,
        contact_info: {
          method: formData.contact_method,
          value: formData.contact_value
        }
      });
      
      // Reset form and go back to search
      setStep('search');
      setSelectedGame(null);
      setSearchQuery('');
      setSearchResults([]);
      setFormData({
        title: '',
        description: '',
        price: '',
        original_price: '',
        platform: 'PC',
        condition: 'Like New',
        game_type: 'Physical',
        is_multiplayer: false,
        includes_dlc: false,
        contact_method: 'email',
        contact_value: ''
      });
      
      alert('Listing created successfully!');
    } catch (error) {
      console.error('Error creating listing:', error);
      alert('Failed to create listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'create' && selectedGame) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold flex items-center text-shadow">
            <Plus className="w-8 h-8 mr-3 text-green-400" />
            Create Listing
          </h2>
          <button
            onClick={() => setStep('search')}
            className="px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors"
          >
            Back to Search
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Game Preview */}
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold mb-4">Selected Game</h3>
            <div className="flex items-center space-x-4">
              <img
                src={selectedGame.background_image}
                alt={selectedGame.name}
                className="w-20 h-12 object-cover rounded-lg"
              />
              <div>
                <h4 className="font-semibold text-white">{selectedGame.name}</h4>
                <p className="text-sm text-gray-400">
                  Released: {new Date(selectedGame.released).getFullYear()}
                </p>
              </div>
            </div>
          </div>

          {/* Listing Form */}
          <div className="glass-card p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Listing Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Original Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.original_price}
                    onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Platform</label>
                  <select
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
                  >
                    <option value="PC">PC</option>
                    <option value="PlayStation 5">PlayStation 5</option>
                    <option value="PlayStation 4">PlayStation 4</option>
                    <option value="Xbox Series X/S">Xbox Series X/S</option>
                    <option value="Xbox One">Xbox One</option>
                    <option value="Nintendo Switch">Nintendo Switch</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Condition</label>
                  <select
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
                  >
                    <option value="New">New</option>
                    <option value="Like New">Like New</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                  <select
                    value={formData.game_type}
                    onChange={(e) => setFormData({ ...formData, game_type: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
                  >
                    <option value="Physical">Physical</option>
                    <option value="Digital Account">Digital Account</option>
                    <option value="Game Key">Game Key</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400 resize-none"
                  placeholder="Describe the condition, any included items, etc."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Contact Method</label>
                  <select
                    value={formData.contact_method}
                    onChange={(e) => setFormData({ ...formData, contact_method: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
                  >
                    <option value="email">Email</option>
                    <option value="discord">Discord</option>
                    <option value="telegram">Telegram</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Contact Info</label>
                  <input
                    type="text"
                    value={formData.contact_value}
                    onChange={(e) => setFormData({ ...formData, contact_value: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
                    placeholder={
                      formData.contact_method === 'email' ? 'your@email.com' :
                      formData.contact_method === 'discord' ? 'username#1234' :
                      '@username'
                    }
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.is_multiplayer}
                    onChange={(e) => setFormData({ ...formData, is_multiplayer: e.target.checked })}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-300">Multiplayer</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.includes_dlc}
                    onChange={(e) => setFormData({ ...formData, includes_dlc: e.target.checked })}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-300">Includes DLC</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 disabled:opacity-50 rounded-lg font-semibold transition-all duration-200"
              >
                {loading ? 'Creating Listing...' : 'Create Listing'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold gradient-text mb-4">Start Selling Your Games</h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Turn your unused games into cash. Search for your game and create a listing in minutes.
        </p>
      </div>

      {/* Search Section */}
      <div className="glass-card p-8">
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <Search className="w-7 h-7 mr-3 text-green-400" />
          Find Your Game
        </h3>
        
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search for the game you want to sell..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 disabled:opacity-50 rounded-lg font-semibold transition-all duration-200"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Select your game:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {searchResults.slice(0, 6).map((game) => (
                <div
                  key={game.id}
                  onClick={() => handleGameSelect(game)}
                  className="flex items-center space-x-4 p-4 bg-white/5 hover:bg-white/10 rounded-lg cursor-pointer transition-colors border border-white/10 hover:border-green-400/50"
                >
                  <img
                    src={game.background_image}
                    alt={game.name}
                    className="w-16 h-10 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h5 className="font-semibold text-white">{game.name}</h5>
                    <p className="text-sm text-gray-400">
                      {game.released ? new Date(game.released).getFullYear() : 'TBA'}
                    </p>
                  </div>
                  <Plus className="w-5 h-5 text-green-400" />
                </div>
              ))}
            </div>
          </div>
        )}

        {searchQuery && searchResults.length === 0 && !loading && (
          <div className="text-center py-8">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400">No games found. Try a different search term.</p>
          </div>
        )}
      </div>

      {/* Benefits Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 text-center">
          <DollarSign className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-white mb-2">Great Prices</h4>
          <p className="text-gray-400 text-sm">Set your own prices and get the best value for your games</p>
        </div>
        <div className="glass-card p-6 text-center">
          <MessageCircle className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-white mb-2">Direct Contact</h4>
          <p className="text-gray-400 text-sm">Connect directly with buyers through your preferred method</p>
        </div>
        <div className="glass-card p-6 text-center">
          <Eye className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-white mb-2">High Visibility</h4>
          <p className="text-gray-400 text-sm">Your listings are seen by thousands of gaming enthusiasts</p>
        </div>
      </div>
    </div>
  );
}