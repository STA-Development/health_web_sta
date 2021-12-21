import React, {memo, useEffect} from "react"
import 'styles/scss/main.scss'
import type {AppProps} from 'next/app'
import TestResultContextProvider from '@fh-health/context/testResultContext'
import jwt_decode from 'jwt-decode'
import AuthContextProvider from '@fh-health/context/AuthContext'
import FooterMenu from '@fh-health/component/base/footer/footerMenu'
import HeaderMenu from '@fh-health/component/base/header/headerMenu'
import Router, {useRouter} from 'next/router'
import {localStore} from 'utils/storage'
import ConferenceHeader from '@fh-health/component/utils/ConferenceHeader'
import ConferenceContextProvider from '@fh-health/context/ConferenceContext'
import * as ga from '../helpers/analytics/ga'

interface IDecodedToken {
  exp: number
  token: string
}

const virtualTestFlowRoutesPrefix = 'conference'

const MyApp = ({Component, pageProps}: AppProps) => {
  const currentPage = useRouter().route
  const isAuth = useRouter().route.indexOf('auth') <= -1
  const isConference = useRouter().route.includes('conference')
  const isInChat = useRouter().route.includes('room')
  const isPublic = currentPage === '/'
  const router = useRouter()
  const {isReady} = useRouter()

  useEffect(() => {
    const token = localStore(localStorage).getItem('accessToken')
    const isAuthorized = token
    let decodedToken: IDecodedToken
    let isExpired
    if (token) {
      decodedToken = jwt_decode(token)
      isExpired = decodedToken.exp * 1000 < new Date().getTime()
    }
    if (isReady) {
      if (
        (!isConference && !isAuthorized && !isPublic) ||
        (!isConference && isExpired && !isPublic)
      ) {
        Router.push('/auth/login')
      }
      if (currentPage === '/' && router.asPath.indexOf('?')) {
        Router.push('/results/list')
      }
    }
  }, [isPublic])

  useEffect(() => {
    if (process.env.VIRTUAL_TEST_MODE === 'true') {
      if (!currentPage.includes(virtualTestFlowRoutesPrefix)) {
        window.location.assign(process.env.FH_HEALTH_WEBSITE_URL)
      }
    }
  }, [currentPage])

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <AuthContextProvider>
      <ConferenceContextProvider>
        {isAuth && !isPublic && !isConference && <HeaderMenu />}
        {isInChat && <ConferenceHeader />}
        <TestResultContextProvider>
          <div className={isConference ? 'main-content main-content_conference' : 'main-content'}>
            <Component {...pageProps} />
          </div>
        </TestResultContextProvider>
        {isAuth && !isConference && <FooterMenu />}
      </ConferenceContextProvider>
    </AuthContextProvider>
  )
}

export default memo(MyApp)
