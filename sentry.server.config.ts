// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
const isProd = process.env.NODE_ENV === 'production';

Sentry.init({
  dsn: SENTRY_DSN,
  debug: !isProd,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1, // Capture 100% of the transactions, reduce in production!
  sampleRate: 0.3,

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: process.env.NODE_ENV === 'development',
});
