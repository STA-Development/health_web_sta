import "../styles/scss/main.scss"
import type { AppProps } from 'next/app'
import {TestResultContextProvider} from "../context/testResultContext";

function MyApp({ Component, pageProps }: AppProps) {
  return(
      <>
        <TestResultContextProvider>
          <Component {...pageProps} />
          </TestResultContextProvider>
        </>
      )


}
export default MyApp
