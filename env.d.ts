declare namespace NodeJS {
  export interface ProcessEnv {
    DB_URL: string;
    PORT?: string;
    NODE_ENV: 'development' | 'production' | 'staging';
    PRIVATE_KEY: string;
    SENTRY_DSN: string;
  }
}
