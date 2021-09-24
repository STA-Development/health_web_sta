import "../styles/scss/main.scss"
import type {AppProps} from "next/app"
import {TestResultContextProvider} from "../context/testResultContext"
import jwt_decode from "jwt-decode";
import {AuthContextProvider} from "../context/AuthContext";
import FooterMenu from "../component/base/footer/footerMenu";
import HeaderMenu from "../component/base/header/headerMenu";
import Router, {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {localStore} from "../utils/storage";

interface decodedToken {
    exp: number
    token: string
}

function MyApp({Component, pageProps}: AppProps) {

    const currentPage = useRouter().route
    const isAuth = useRouter().route.indexOf("auth") <= -1;
    const isPublic = currentPage === '/';

    useEffect(() => {
        const token = localStore(localStorage).getItem('accessToken')
        let decodedToken: decodedToken
        let isExpired
        if (token) {
            decodedToken = jwt_decode(token)
            isExpired = decodedToken.exp * 1000 < new Date().getTime()
        }
        if ((!localStore(localStorage).getItem('accessToken') && !isPublic) || (isExpired && !isPublic)) {
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
                {isAuth && <FooterMenu/>}
            </AuthContextProvider>
        </>
    )
}

export default MyApp
