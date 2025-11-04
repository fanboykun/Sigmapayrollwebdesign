/**
 * Supabase Client Configuration
 * Client-side Supabase instance untuk authentication dan database operations
 */

import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Hardcoded project info - these values come from Supabase dashboard
const projectId = 'gketmjcxsnzrrzwfrxfw';
const publicAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrZXRtamN4c256cnJ6d2ZyeGZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMzgwNTEsImV4cCI6MjA3NzYxNDA1MX0.kjHxmLRjVyt8cSq9HXuz12TOVk32FdRY0ylbRju_gjw';

// Supabase URL dari project info
const supabaseUrl = `https://${projectId}.supabase.co`;

// Create Supabase client dengan anon key untuk client-side operations
export const supabase = createSupabaseClient(supabaseUrl, publicAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
});

// Helper function to create a new client instance (if needed)
export const createClient = () => {
  return createSupabaseClient(supabaseUrl, publicAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    },
  });
};
