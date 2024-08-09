import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
const isProd = process.env.NODE_ENV === 'production';

export function register() {
  Sentry.init({
    dsn: SENTRY_DSN,
    debug: !isProd,
    environment: process.env.NODE_ENV,
    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 0.1,
    sampleRate: 0.3,
  });
}
