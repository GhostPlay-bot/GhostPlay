import { useState, useEffect } from 'react';
import { authService } from '../lib/auth';
import type { AuthUser } from '../lib/auth';

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        const user = await authService.getCurrentUser();
        setUser(user);
        setIsAuthenticated(!!user);
      } catch (error) {
        console.error('Error initializing auth:', error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth state changes
    const { data: { subscription } } = authService.onAuthStateChange(async (user) => {
      setUser(user);
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const result = await authService.signIn(email, password);
      return { user: result.user, error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { user: null, error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      setLoading(true);
      const result = await authService.signUp(email, password, fullName);
      return { user: result.user, error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { user: null, error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await authService.signOut();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error signing out:', error);
      // Clear state even if signOut fails
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: any) => {
    try {
      const updatedProfile = await authService.updateProfile(updates);
      // Refresh user data
      const refreshedUser = await authService.getCurrentUser();
      setUser(refreshedUser);
      return { user: refreshedUser, error: null };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { user: null, error };
    }
  };

  return {
    user,
    loading,
    isAuthenticated,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };
}