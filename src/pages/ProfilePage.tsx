import React, { useState, useEffect } from 'react';
import { User, Edit3, Save, X, Camera, Palette } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function ProfilePage() {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    display_name: '',
    full_name: '',
    bio: '',
    profile_color: '#22c55e'
  });

  useEffect(() => {
    if (user?.profile) {
      setFormData({
        display_name: user.profile.display_name || '',
        full_name: user.profile.full_name || '',
        bio: user.profile.bio || '',
        profile_color: user.profile.profile_color || '#22c55e'
      });
    }
  }, [user]);

  if (!isAuthenticated) {
    return (
      <div className="text-center py-20">
        <User className="w-24 h-24 text-gray-600 mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-gray-400 mb-4">Sign In Required</h3>
        <p className="text-gray-500 mb-6">
          Please sign in to view and manage your profile.
        </p>
      </div>
    );
  }


  const handleSave = async () => {
    setLoading(true);
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (user?.profile) {
      setFormData({
        display_name: user.profile.display_name || '',
        full_name: user.profile.full_name || '',
        bio: user.profile.bio || '',
        profile_color: user.profile.profile_color || '#22c55e'
      });
    }
    setIsEditing(false);
  };

  const colorOptions = [
    '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b',
    '#ef4444', '#06b6d4', '#84cc16', '#f97316', '#6366f1'
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="glass-card p-8">
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-3xl font-bold flex items-center text-shadow">
            <User className="w-8 h-8 mr-3 text-blue-400" />
            My Profile
          </h2>
          
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors text-blue-400"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 disabled:opacity-50 rounded-lg transition-colors text-green-400"
              >
                <Save className="w-4 h-4" />
                <span>{loading ? 'Saving...' : 'Save'}</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors text-red-400"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>

        <div className="flex items-start space-x-8">
          {/* Avatar Section */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div 
                className="w-32 h-32 rounded-2xl flex items-center justify-center text-4xl font-bold text-white border-4 border-white/10 shadow-lg"
                style={{ backgroundColor: formData.profile_color }}
              >
                {(formData.display_name || formData.full_name || user?.email || 'U').charAt(0).toUpperCase()}
              </div>
              {isEditing && (
                <button className="absolute -bottom-2 -right-2 p-2 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors">
                  <Camera className="w-4 h-4 text-white" />
                </button>
              )}
            </div>
            
            {/* Color Picker */}
            {isEditing && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Palette className="w-4 h-4 inline mr-1" />
                  Avatar Color
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() => setFormData({ ...formData, profile_color: color })}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        formData.profile_color === color 
                          ? 'border-white scale-110' 
                          : 'border-white/30 hover:border-white/60'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1 space-y-6">
            {/* Display Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Display Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.display_name}
                  onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your display name"
                />
              ) : (
                <div className="text-2xl font-bold text-white">
                  {user?.profile?.display_name || user?.profile?.full_name || 'Anonymous Gamer'}
                </div>
              )}
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your full name"
                />
              ) : (
                <div className="text-lg text-gray-300">
                  {user?.profile?.full_name || 'Not specified'}
                </div>
              )}
            </div>

            {/* Email (read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <div className="text-lg text-gray-300">
                {user?.email}
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
              {isEditing ? (
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 resize-none"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <div className="text-gray-300 whitespace-pre-wrap">
                  {user?.profile?.bio || 'No bio added yet.'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Gaming Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 text-center">
          <div className="text-3xl font-bold text-green-400 mb-2">0</div>
          <div className="text-gray-400">Favorite Games</div>
        </div>
        <div className="glass-card p-6 text-center">
          <div className="text-3xl font-bold text-blue-400 mb-2">0</div>
          <div className="text-gray-400">Games Listed</div>
        </div>
        <div className="glass-card p-6 text-center">
          <div className="text-3xl font-bold text-purple-400 mb-2">0</div>
          <div className="text-gray-400">Reviews Written</div>
        </div>
      </div>
    </div>
  );
}