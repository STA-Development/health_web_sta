import Config from '@fh-health/utils/envWrapper'

export const pageview = (url) => {
  window.gtag('config', Config.get('GOOGLE_ANALYTICS_KEY'), {
    page_path: url,
  })
}
