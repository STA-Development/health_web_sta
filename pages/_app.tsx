import "../styles/scss/main.scss"
import type { AppProps } from 'next/app'
import "../styles/scss/main.scss"
import "../styles/Home.module.css"

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp
