/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_EMAIL_KEY: string;
  readonly VITE_ERROR_KEY: string;
  readonly VITE_TOKEN_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
