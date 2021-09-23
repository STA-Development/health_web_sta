import "../styles/scss/main.scss"
import type {AppProps} from "next/app"
import {TestResultContextProvider} from "../context/testResultContext"
import {AuthContextProvider} from "../context/AuthContext";
import FooterMenu from "../component/base/footer/footerMenu";
import HeaderMenu from "../component/base/header/headerMenu";
import Router, {useRouter} from "next/router";
import {useEffect} from "react";

function MyApp({Component, pageProps}: AppProps) {

    const isAuth = useRouter().route.indexOf("auth") <= -1;

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            Router.push('/webPortalResult');
        }
    }, []);

    return (
    <>
      <AuthContextProvider>
          {isAuth && <HeaderMenu />}
          <TestResultContextProvider>
              <Component {...pageProps} />
          </TestResultContextProvider>
          {isAuth && <FooterMenu />}
      </AuthContextProvider>
    </>
  )
}
export default MyApp
