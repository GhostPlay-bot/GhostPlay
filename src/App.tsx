import React, { useState, useEffect } from 'react';
import { Search, Menu, X, User, LogOut } from 'lucide-react';
import { useGames } from './hooks/useGames';
import { useAuth } from './hooks/useAuth';
import { GameDetailsModal } from './components/games/GameDetailsModal';
import { AuthModal } from './components/auth/AuthModal';
import { AnimatedBackground } from './components/ui/AnimatedBackground';
import { FloatingParticles } from './components/ui/FloatingParticles';
import { GlowingOrbs } from './components/ui/GlowingOrbs';
import { Sidebar } from './components/ui/Sidebar';
import { HomePage } from './pages/HomePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { TrendingPage } from './pages/TrendingPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { ProfilePage } from './pages/ProfilePage';
import { SellPage } from './pages/SellPage';
import { MarketplacePage } from './pages/MarketplacePage';

type ViewMode = 'grid' | 'list';
type ActiveTab = 'home' | 'categories' | 'trending' | 'favorites' | 'profile' | 'sell' | 'marketplace' | 'docs' | 'faq' | 'community' | 'privacy';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchPage, setSearchPage] = useState(1);
  const [hasMoreSearchResults, setHasMoreSearchResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<any>(null);
  const [gameDetailsOpen, setGameDetailsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  
  const { user, isAuthenticated, signOut } = useAuth();

  const { searchGames, loadMorePopular, hasMorePopular, loadMoreTrending, hasMoreTrending } = useGames();

  // Listen for auth modal open events from sidebar
  useEffect(() => {
    const handleOpenAuthModal = () => {
      setAuthModalOpen(true);
    };

    window.addEventListener('openAuthModal', handleOpenAuthModal);
    return () => {
      window.removeEventListener('openAuthModal', handleOpenAuthModal);
    };
  }, []);

  // Redirect to home if user logs out while on protected tab
  useEffect(() => {
    if (!isAuthenticated && ['favorites', 'profile', 'sell', 'marketplace'].includes(activeTab)) {
      setActiveTab('home');
    }
  }, [isAuthenticated, activeTab]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const results = await searchGames(searchQuery);
      setSearchResults(results);
      setSearchPage(1);
      setHasMoreSearchResults(results.length >= 40);
      setActiveTab('home');
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const loadMoreSearchResults = async () => {
    if (isSearching || !searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const nextPage = searchPage + 1;
      const results = await searchGames(searchQuery);
      setSearchResults(prev => [...prev, ...results]);
      setSearchPage(nextPage);
      setHasMoreSearchResults(results.length >= 40);
    } catch (error) {
      console.error('Load more search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setSearchPage(1);
    setHasMoreSearchResults(false);
  };

  const handleGameClick = (game: any) => {
    setSelectedGame(game);
    setGameDetailsOpen(true);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect to home if user was on a protected tab
      if (['favorites', 'profile', 'sell', 'marketplace'].includes(activeTab)) {
        setActiveTab('home');
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomePage
            searchResults={searchResults}
            onGameClick={handleGameClick}
            viewMode={viewMode}
            setViewMode={setViewMode}
            clearSearch={clearSearch}
            loadMorePopular={loadMorePopular}
            hasMorePopular={hasMorePopular}
            loadMoreSearchResults={loadMoreSearchResults}
            hasMoreSearchResults={hasMoreSearchResults}
          />
        );
      case 'categories':
        return (
          <CategoriesPage
            onGameClick={handleGameClick}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
        );
      case 'trending':
        return (
          <TrendingPage
            onGameClick={handleGameClick}
            viewMode={viewMode}
            setViewMode={setViewMode}
            loadMoreTrending={loadMoreTrending}
            hasMoreTrending={hasMoreTrending}
          />
        );
      case 'favorites':
        return (
          <FavoritesPage
            onGameClick={handleGameClick}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
        );
      case 'profile':
        return (
          <ProfilePage />
        );
      case 'sell':
        return (
          <SellPage />
        );
      case 'marketplace':
        return (
          <MarketplacePage
            onGameClick={handleGameClick}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
        );
      case 'cart':
        return (
          <div className="glass-card p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🛒</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Your Cart is Empty</h3>
            <p className="text-gray-400 mb-6">Add some amazing games to get started!</p>
          </div>
        );
      case 'docs':
        return (
          <div className="glass-card p-8">
            <h3 className="text-2xl font-bold mb-6 text-shadow">Documentation</h3>
            <div className="space-y-4 text-gray-300">
              <p>Welcome to Ghost Play - your ultimate marketplace for used games.</p>
              <h4 className="text-xl font-semibold text-white">Getting Started</h4>
              <ul className="list-disc list-inside space-y-2">
                <li>Browse games and find great deals</li>
                <li>Sell your unused games to other players</li>
                <li>Connect with buyers and sellers safely</li>
                <li>Build your gaming collection for less</li>
              </ul>
            </div>
          </div>
        );
      case 'faq':
        return (
          <div className="glass-card p-8">
            <h3 className="text-2xl font-bold mb-6 text-shadow">Frequently Asked Questions</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">How do I sell my games?</h4>
                <p className="text-gray-300">Go to "Start Selling", search for your game, and create a listing with your details and price.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">How do I buy games?</h4>
                <p className="text-gray-300">Browse the marketplace, find games you want, and contact sellers directly through their preferred method.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Is it safe to buy/sell here?</h4>
                <p className="text-gray-300">We provide a platform for users to connect. Always verify accounts and use secure payment methods.</p>
              </div>
            </div>
          </div>
        );
      case 'community':
        return (
          <div className="glass-card p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Gaming Community</h3>
            <p className="text-gray-400 mb-6">Connect with fellow gamers, buy and sell games, and build your collection together.</p>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 rounded-lg font-semibold transition-all duration-200">
              Join Community
            </button>
          </div>
        );
      case 'privacy':
        return (
          <div className="glass-card p-8">
            <h3 className="text-2xl font-bold mb-6 text-shadow">Privacy Policy</h3>
            <div className="space-y-4 text-gray-300">
              <p>At Ghost Play, we take your privacy seriously and are committed to protecting your personal information.</p>
              <h4 className="text-xl font-semibold text-white">Information We Collect</h4>
              <ul className="list-disc list-inside space-y-2">
                <li>Account information (email, username)</li>
                <li>Game preferences and favorites</li>
                <li>Usage analytics to improve our service</li>
              </ul>
              <h4 className="text-xl font-semibold text-white">How We Use Your Information</h4>
              <ul className="list-disc list-inside space-y-2">
                <li>To provide personalized game recommendations</li>
                <li>To improve our platform and user experience</li>
                <li>To communicate important updates</li>
              </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen dark-gradient-bg text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <AnimatedBackground />
      <FloatingParticles />
      <GlowingOrbs />
      
      {/* Layout Container */}
      <div className="flex min-h-screen relative z-10">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isAuthenticated={isAuthenticated}
          user={user}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:ml-0">
          {/* Top Navigation Bar */}
          <nav className="glass-card sticky top-0 z-30 border-b border-gray-800/50 backdrop-blur-xl">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
                >
                  <Menu className="w-6 h-6" />
                </button>

                {/* Search Bar */}
                <div className="flex-1 max-w-2xl mx-4 lg:mx-8">
                  <form onSubmit={handleSearch} className="relative group">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-green-400 transition-colors" />
                    <input
                      type="text"
                      placeholder="Search games on Ghost Play..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-gray-800/30 border border-gray-700/50 rounded-xl pl-12 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:bg-gray-800/50 transition-all duration-300 backdrop-blur-sm"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={clearSearch}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    {isSearching && (
                      <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                        <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </form>
                </div>

                {/* Desktop Auth Section */}
                <div className="hidden lg:block">
                  {isAuthenticated && user ? (
                    <div className="flex items-center space-x-4">
                      {/* User Profile Button */}
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white border-2 border-green-400/30 hover:border-green-400/60 transition-colors cursor-pointer"
                          style={{ backgroundColor: user.profile?.profile_color || '#22c55e' }}
                          onClick={() => setActiveTab('profile')}
                        >
                          {(user.profile?.display_name || user.profile?.full_name || user.email || 'U').charAt(0).toUpperCase()}
                        </div>
                        <div className="text-sm">
                          <div className="text-white font-medium">
                            {user.profile?.display_name || user.profile?.full_name || 'Gamer'}
                          </div>
                          <div className="text-gray-400 text-xs">
                            {user.email}
                          </div>
                        </div>
                      </div>
                      
                      {/* Sign Out Button */}
                      <button
                        onClick={handleSignOut}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors text-red-400 hover:text-red-300"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setAuthModalOpen(true)}
                      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25"
                    >
                      <User className="w-5 h-5" />
                      <span>Sign In</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </nav>

          {/* Page Content */}
          <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
            {renderTabContent()}
          </main>

          {/* Footer */}
          <footer className="border-t border-gray-800/50 mt-20">
            <div className="px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center neon-glow">
                      <span className="text-xl">👻</span>
                    </div>
                    <h3 className="text-2xl font-bold gradient-text">Ghost Play</h3>
                  </div>
                  <p className="text-gray-400 mb-4 max-w-md">
                    The ultimate marketplace for buying and selling used games at great prices.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-4">Legal</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">DMCA</a></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-gray-800/50 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2024 Ghost Play. All rights reserved. Your trusted gaming marketplace.</p>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Modals */}

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      <GameDetailsModal
        isOpen={gameDetailsOpen}
        onClose={() => setGameDetailsOpen(false)}
        game={selectedGame}
      />
    </div>
  );
}

export default App;