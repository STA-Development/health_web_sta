import "../styles/scss/main.scss"
import type {AppProps} from "next/app"
import {TestResultContextProvider} from "../context/testResultContext"
import jwt_decode from "jwt-decode";
import {AuthContextProvider} from "../context/AuthContext";
import FooterMenu from "../component/base/footer/footerMenu";
import HeaderMenu from "../component/base/header/headerMenu";
import Router, {useRouter} from "next/router";
import {useEffect} from "react";

interface decodedToken {
    exp: number
    token: string
}

function MyApp({Component, pageProps}: AppProps) {

    const isAuth = useRouter().route.indexOf("auth") <= -1;
    const isPublic = useRouter().route === '/';

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        let decodedToken:decodedToken
        let isExpired
        if(token) {
            decodedToken = jwt_decode(token)
            isExpired = decodedToken.exp < new Date().getTime()
        }
        if ((!localStorage.getItem('accessToken') && !isPublic) || isExpired) {
            Router.push('/auth/login');
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
