// Database access is now handled by the backend API
// All data requests go through the backend hooks instead of direct Supabase calls

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Only create client if credentials exist
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

if (supabase) {
  console.log('✅ Supabase client created for real-time features');
} else {
  console.warn('⚠️ Supabase not configured - real-time updates disabled');
}