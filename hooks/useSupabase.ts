import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useSupabase() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initializeSupabase = async () => {
      try {
        // Test the connection
        const { error } = await supabase
          .from('products')
          .select('count')
          .single();

        if (error) throw error;
        setIsInitialized(true);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to initialize Supabase'));
      }
    };

    initializeSupabase();
  }, []);

  return { isInitialized, error };
}