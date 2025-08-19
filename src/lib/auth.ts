import { supabase } from './supabase';
import type { User } from '@supabase/supabase-js';

export interface AuthUser extends User {
  profile?: {
    username: string | null;
    full_name: string | null;
    display_name: string | null;
    avatar_url: string | null;
    bio: string | null;
    profile_color: string | null;
  };
}

export const authService = {
  // Sign in with Google
  async signInWithGoogle() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Google sign in failed:', error);
      throw error;
    }
  },

  // Sign out
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error during sign out:', error);
      throw error;
    }
  },

  // Get current user with profile
  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) throw error;
      if (!user) return null;

      // Fetch user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('username, full_name, display_name, avatar_url, bio, profile_color')
        .eq('id', user.id)
        .single();

      return {
        ...user,
        profile,
      };
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  // Update user profile
  async updateProfile(updates: {
    username?: string;
    full_name?: string;
    display_name?: string;
    avatar_url?: string;
    bio?: string;
    profile_color?: string;
  }) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const { data, error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },

  // Listen to auth state changes
  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const user = await this.getCurrentUser();
        callback(user);
      } else {
        callback(null);
      }
    });
  },
};