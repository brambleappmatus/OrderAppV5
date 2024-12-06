export const STORAGE_CONFIG = {
  BUCKET_NAME: 'images',
  FOLDER_NAME: 'products',
  FALLBACK_IMAGE_URL: 'https://github.com/brambleappmatus/images/blob/main/placeholder.png?raw=true',
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ACCEPTED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif'] as const
} as const;

export const SUPABASE_CONFIG = {
  URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  STORAGE: {
    ENDPOINT: 'https://enxxhyedzkatrwiwapzl.supabase.co/storage/v1/s3',
    ACCESS_KEY: '87041c02a4d7e84a203362df9786b892',
    SECRET_KEY: '99c0609a8e9cf32eead51b0229e346d5bde130b6d5a7c40349f1423423a5f35b'
  }
} as const;