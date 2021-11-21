/* eslint-disable no-console */
const domains = []
try {
  const url = new URL(process.env.APP_DOMAIN)
  domains.push(url.hostname)
} catch (_) {
  console.error(
      `APP_DOMAIN is not defined or is invalid url: ${process.env.APP_DOMAIN}`,
  )
}

// Use default image load for local
let images = {}
// Use public folder with static loaded when building for GCP hosting
if (process.env.NODE_ENV !== "development") {
  images = {
    domains,
    loader: "imgix",
    path: `${process.env.APP_DOMAIN}/public`,
  }
}

module.exports = {
  basePath: "",
  poweredByHeader: false,
  images,
  reactStrictMode: true,
  env: {
    RECAPTCHA_V3_KEY: process.env.RECAPTCHA_V3_KEY,
    APP_VERSION: process.env.APP_VERSION,
    APP_BASE_URL: process.env.APP_BASE_URL,
    APP_DOMAIN: process.env.APP_DOMAIN,
    APP_SOURCE: process.env.APP_SOURCE,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    APP_FIREBASE_STORAGEBUCKET: process.env.APP_FIREBASE_STORAGEBUCKET,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    APP_RESERVATION_URL: process.env.APP_RESERVATION_URL,
    APP_TESTING_MODE: process.env.APP_TESTING_MODE,
    QB_APP_ID: process.env.QB_APP_ID,
    QB_ACCOUNT_KEY: process.env.QB_ACCOUNT_KEY,
    QB_API_DOMAIN: process.env.QB_API_DOMAIN,
    QB_CHAT_DOMAIN: process.env.QB_CHAT_DOMAIN
  },
}
