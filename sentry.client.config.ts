import * as Sentry from '@sentry/nextjs'
import Config from '@fh-health/utils/envWrapper'

const SENTRY_DSN = Config.get('SENTRY_DSN') || Config.get('NEXT_PUBLIC_SENTRY_DSN')
Sentry.init({
  dsn: SENTRY_DSN || 'URL',
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
  environment: Config.get('SENTRY_ENVIRONMENT'),
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
})
