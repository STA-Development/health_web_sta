/* eslint-disable no-console */
const domains = []
const {withSentryConfig} = require('@sentry/nextjs')
try {
  const url = new URL(process.env.APP_DOMAIN)
  domains.push(url.hostname)
} catch (_) {
  console.error(`APP_DOMAIN is not defined or is invalid url: ${process.env.APP_DOMAIN}`)
}

// Use default image load for local
let images = {}
// Use public folder with static loaded when building for GCP hosting
if (process.env.NODE_ENV !== 'development') {
  images = {
    domains,
    loader: 'imgix',
    path: `${process.env.APP_DOMAIN}/public`,
  }
}
const SentryWebpackPluginOptions = {
  silent: true,
}
const moduleExports = {
  basePath: '',
  poweredByHeader: false,
  images,
  reactStrictMode: true,
  env: {
    RECAPTCHA_V3_KEY: process.env.RECAPTCHA_V3_KEY,
    APP_VERSION: process.env.APP_VERSION,
    USER_SERVICE_URL: process.env.USER_SERVICE_URL,
    SCHEDULE_SERVICE_URL: process.env.SCHEDULE_SERVICE_URL,
    APP_DOMAIN: process.env.APP_DOMAIN,
    APP_SOURCE: process.env.APP_SOURCE,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    APP_FIREBASE_STORAGEBUCKET: process.env.APP_FIREBASE_STORAGEBUCKET,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    RESERVATION_SERVICE_URL: process.env.RESERVATION_SERVICE_URL,
    APP_TESTING_MODE: process.env.APP_TESTING_MODE,
    QB_APP_ID: process.env.QB_APP_ID,
    QB_ACCOUNT_KEY: process.env.QB_ACCOUNT_KEY,
    QB_API_DOMAIN: process.env.QB_API_DOMAIN,
    QB_CHAT_DOMAIN: process.env.QB_CHAT_DOMAIN,
    VIRTUAL_TEST_MODE: process.env.VIRTUAL_TEST_MODE,
    FH_HEALTH_WEBSITE_URL: process.env.FH_HEALTH_WEBSITE_URL,
    SENTRY_DSN: process.env.SENTRY_DSN,
    GOOGLE_ANALYTICS_KEY: process.env.GOOGLE_ANALYTICS_KEY,
    ACUITY_BOOKINGURL: process.env.ACUITY_BOOKINGURL,
    SENTRY_ENVIRONMENT: process.env.SENTRY_ENVIRONMENT,
  },
  sentry: {
    disableServerWebpackPlugin: true,
    disableClientWebpackPlugin: true,
  },
}
module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions)
