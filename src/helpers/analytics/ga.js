export const pageview = (url) => {
  window.gtag('config', process.env.GOOGLE_ANALYTICS_KEY, {
    page_path: url,
  })
}
