import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = 'https://enxxhyedzkatrwiwapzl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVueHhoeWVkemthdHJ3aXdhcHpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyOTY3MjMsImV4cCI6MjA0ODg3MjcyM30.bj-PaEN9tDYSX2zc-I4Vn7WmKtXF1L--tzJm_3IR4WE';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  }
);