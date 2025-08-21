import {useEffect, useState} from 'react';
import {supabase} from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const {data, error} = await supabase.auth.getSession();
                if (error) {
                    // Clear corrupted session data
                    await supabase.auth.signOut();
                    setUser(null);
                } else {
                    setUser(data.session?.user ?? null);
                }
            } catch (error) {
                // Handle any unexpected errors by clearing session
                await supabase.auth.signOut();
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();

        const {data: listener} = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    return {user, loading};
}