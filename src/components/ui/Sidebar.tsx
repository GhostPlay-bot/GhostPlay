import React from 'react';
import { 
  Home, 
  Grid, 
  TrendingUp, 
  Heart, 
  User, 
  DollarSign,
  Store,
  FileText, 
  HelpCircle, 
  Users, 
  Shield, 
  Gamepad2,
  X,
  LogIn,
} from 'lucide-react';
import type { AuthUser } from '../../lib/auth';

type ActiveTab = 'home' | 'categories' | 'trending' | 'favorites' | 'profile' | 'sell' | 'marketplace' | 'docs' | 'faq' | 'community' | 'privacy';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  isAuthenticated: boolean;
  user: AuthUser | null;
}

export function Sidebar({ isOpen, onClose, activeTab, onTabChange, isAuthenticated, user }: SidebarProps) {

  // Public navigation items (always visible)
  const publicNavigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'categories', label: 'Categories', icon: Grid },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'docs', label: 'Docs', icon: FileText },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'privacy', label: 'Privacy', icon: Shield },
  ];

  // Protected navigation items (only visible when authenticated)
  const protectedNavigationItems = [
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'sell', label: 'Start Selling', icon: DollarSign },
    { id: 'marketplace', label: 'Marketplace', icon: Store },
  ];

  const handleTabClick = (tabId: string) => {
    onTabChange(tabId as ActiveTab);
    onClose();
  };

  const handleAuthAction = () => {
    // This will be handled by the parent component
    onClose();
    // Trigger auth modal opening
    const event = new CustomEvent('openAuthModal');
    window.dispatchEvent(event);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-80 sidebar-glass z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:z-30`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800/50">
          <div className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300 shadow-lg neon-glow">
              <Gamepad2 className="w-7 h-7 text-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">Ghost Play</h1>
              <p className="text-xs text-gray-400">Gaming Platform</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6">
          <nav className="px-4 space-y-2">
            {/* Public Navigation Items */}
            {publicNavigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 group ${
                    isActive
                      ? 'bg-gradient-to-r from-green-400/20 via-blue-500/20 to-purple-600/20 text-green-400 shadow-lg neon-glow border border-green-400/30'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/30 hover:border-gray-700/50 border border-transparent'
                  }`}
                >
                  <Icon className={`w-5 h-5 transition-all duration-300 ${
                    isActive ? 'text-green-400 animate-pulse' : 'group-hover:text-white'
                  }`} />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  )}
                </button>
              );
            })}

            {/* Divider */}
            {isAuthenticated && (
              <div className="my-4 border-t border-gray-800/50" />
            )}

            {/* Protected Navigation Items */}
            {isAuthenticated ? (
              protectedNavigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 group ${
                      isActive
                        ? 'bg-gradient-to-r from-green-400/20 via-blue-500/20 to-purple-600/20 text-green-400 shadow-lg neon-glow border border-green-400/30'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800/30 hover:border-gray-700/50 border border-transparent'
                    }`}
                  >
                    <Icon className={`w-5 h-5 transition-all duration-300 ${
                      isActive ? 'text-green-400 animate-pulse' : 'group-hover:text-white'
                    }`} />
                    <span className="font-medium">{item.label}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    )}
                  </button>
                );
              })
            ) : (
              <button
                onClick={handleAuthAction}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 group bg-gradient-to-r from-green-400/10 to-blue-500/10 hover:from-green-400/20 hover:to-blue-500/20 text-green-400 border border-green-400/30 hover:border-green-400/50"
              >
                <LogIn className="w-5 h-5 transition-all duration-300 group-hover:animate-pulse" />
                <span className="font-medium">Sign In to Access More</span>
              </button>
            )}
          </nav>
        </div>

        {/* User Section */}
        <div className="border-t border-gray-800/50 p-4">
          {isAuthenticated && user ? (
            <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white border-2 border-green-400/30"
                style={{ backgroundColor: user.profile?.profile_color || '#22c55e' }}
              >
                {(user.profile?.display_name || user.profile?.full_name || user.email || 'U').charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">
                  {user.profile?.display_name || user.profile?.full_name || 'Gamer'}
                </div>
                <div className="text-xs text-gray-400 truncate">
                  {user.email}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <button
                onClick={handleAuthAction}
                className="w-full px-4 py-3 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}