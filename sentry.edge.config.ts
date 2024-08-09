// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
const isProd = process.env.NODE_ENV === 'production';

Sentry.init({
  dsn: SENTRY_DSN,
  debug: !isProd,
  environment: process.env.NODE_ENV,
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 0.1,
  sampleRate: 0.3,
});
