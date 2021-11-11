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
import ConferenceHeader from "../component/utils/ConferenceHeader";
import {ConferenceContextProvider} from "../context/ConferenceContext";

interface decodedToken {
    exp: number
    token: string
}

function MyApp({Component, pageProps}: AppProps) {

    const currentPage = useRouter().route
    const isAuth = useRouter().route.indexOf("auth") <= -1;
    const isConference = useRouter().route.includes("conference")
    const isInChat = useRouter().route.includes("room")
    const isPublic = currentPage === '/';
    const router = useRouter()
    const { query, isReady } = useRouter()
    // eslint-disable-next-line react-hooks/exhaustive-deps

    useEffect(() => {
        const token = localStore(localStorage).getItem('accessToken')
        let decodedToken: decodedToken
        let isExpired
        if (token) {
            decodedToken = jwt_decode(token)
            isExpired = decodedToken.exp * 1000 < new Date().getTime()
        }
        if (isReady) {
            if (!isConference && (!localStore(localStorage).getItem('accessToken') && !isPublic) || (!isConference && isExpired && !isPublic)) {
                Router.push('/auth/login');
            }
            if (currentPage == '/' && router.asPath.indexOf('?')) {
                Router.push('/results/list')
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPublic]);

    return (
        <>
            <AuthContextProvider>
                <ConferenceContextProvider>
                    {isAuth && !isPublic && !isConference && <HeaderMenu />}
                    {isInChat && <ConferenceHeader/>}
                    <TestResultContextProvider>
                        <div className={isConference ? 'main-content main-content_conference' : 'main-content'}>
                            <Component {...pageProps} />
                        </div>
                    </TestResultContextProvider>
                    {isAuth && !isConference && <FooterMenu/>}
                </ConferenceContextProvider>
            </AuthContextProvider>
        </>
    )
}

export default MyApp
