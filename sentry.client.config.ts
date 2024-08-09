// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import { httpClientIntegration } from '@sentry/integrations';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN,
  debug: false, // Too many logs in the console make it hard for developers to find their own. To debug sentry.io, please enable it manually in local environment.
  environment: process.env.NODE_ENV,
  integrations: [Sentry.replayIntegration(), httpClientIntegration],
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 0.1,

  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0,

  // If the entire session is not sampled, use the below sample rate to sample
  // sessions when an error occurs.
  replaysOnErrorSampleRate: 0.1,

  sampleRate: 0.3,
  allowUrls: [/https?:\/\/[\w.-]*pietrastudio\.com/],
  ignoreErrors: [
    'SyncError',
    'AxiosError',
    'Internal Server Error',
    'ResizeObserver loop limit exceeded',
    'Network Error',
    /[Tt]imeout/,
    'Load failed',
    'disconnected',
    '400',
    '401',
    '403',
    '502',
    'Unable to preload CSS',
    'Request aborted',
    'Unable to connect: Access Token expired or expiration date invalid',
    'Failed to fetch',
  ],
});
