export const config = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  },
  gemini: {
    // API key should NOT be here - it's in the Edge Function
    // This is just for reference
  },
};

// Check if credentials are configured (not just placeholder values)
const isConfigured = 
  config.supabase.url && 
  config.supabase.anonKey && 
  config.supabase.url !== 'your-supabase-url' &&
  config.supabase.anonKey !== 'your-supabase-anon-key' &&
  config.supabase.url.includes('supabase.co');

if (!isConfigured) {
  console.warn('⚠️ Supabase not configured. Please update your .env file with valid credentials.');
  console.warn('See README.md for setup instructions.');
}
