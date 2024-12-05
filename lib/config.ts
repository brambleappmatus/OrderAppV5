export const STORAGE_CONFIG = {
  BUCKET_NAME: 'images',
  FOLDER_NAME: 'products',
  FALLBACK_IMAGE_URL: 'https://github.com/brambleappmatus/images/blob/main/placeholder.png?raw=true',
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ACCEPTED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif'] as const
} as const;

export const SUPABASE_CONFIG = {
  URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
} as const;