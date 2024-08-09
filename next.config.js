// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require('@sentry/nextjs');
const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withLess = require('next-with-less');
const { version } = require('./package.json');
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = (phase) => {
  const env = {
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV,
    NEXT_PUBLIC_STORAGE_PREFIX: process.env.NEXT_PUBLIC_STORAGE_PREFIX,
    NEXT_PUBLIC_API_HOST: process.env.NEXT_PUBLIC_API_HOST,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  };
  /** @type {import('next').NextConfig} */
  const config = {
    output: 'standalone',
    reactStrictMode: true,
    poweredByHeader: false,
    productionBrowserSourceMaps: true,
    env,
    compress: isProd,
    transpilePackages: ['antd', '@ant-design', 'rc-util', 'rc-pagination', 'rc-picker'],
    publicRuntimeConfig: env,
    compiler: {
      // Remove `console.*` output except `console.error`
      removeConsole: isProd
        ? {
            exclude: ['error'],
          }
        : false,
      // Uncomment this to suppress all logs.
      // removeConsole: true,
    },
    lessLoaderOptions: {
      // cssModules: true,
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: {},
      },
    },
    // Disable css--modules component styling
    webpack(config) {
      //  Source: https://cwtuan.blogspot.com/2022/10/disable-css-module-in-nextjs-v1231-sept.html
      config.module.rules.forEach((rule) => {
        const { oneOf } = rule;
        if (oneOf) {
          oneOf.forEach((one) => {
            if (!`${one.issuer?.and}`.includes('_app')) return;
            one.issuer.and = [path.resolve(__dirname)];
          });
        }
      });
      return config;
    },
    experimental: {
      webpackBuildWorker: true,
      instrumentationHook: true,
    },
  };
  return withBundleAnalyzer(
    withSentryConfig(withLess(config), {
      debug: !isProd,
      hideSourceMaps: true,
      environment: process.env.NODE_ENV,
      release: `parsec-next-app-${process.env.NODE_ENV}@${version}`,
    }),
  );
};

module.exports = nextConfig;
