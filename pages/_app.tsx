import "../styles/scss/main.scss"
import type {AppProps} from "next/app"
import {TestResultContextProvider} from "../context/testResultContext"
import {AuthContextProvider} from "../context/AuthContext";

function MyApp({Component, pageProps}: AppProps) {
  return (
    <>
      <AuthContextProvider>
          <TestResultContextProvider>
              <Component {...pageProps} />
          </TestResultContextProvider>
      </AuthContextProvider>
    </>
  )
}
export default MyApp
