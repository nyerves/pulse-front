/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_PRODUCTION: boolean
  VITE_PREFIX: string
  VITE_BASE_LANG: 'es' | 'en'
  VITE_MASTER_PASS: string

  VITE_SECRET_KEY: string

  VITE_BASE_API: string
  VITE_BASE_HOST: string  
}
