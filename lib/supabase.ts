import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://enxxhyedzkatrwiwapzl.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVueHhoeWVkemthdHJ3aXdhcHpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyOTY3MjMsImV4cCI6MjA0ODg3MjcyM30.bj-PaEN9tDYSX2zc-I4Vn7WmKtXF1L--tzJm_3IR4WE';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);