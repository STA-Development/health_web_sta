import React, {memo, useEffect, useState} from 'react'
import 'styles/scss/main.scss'
import type {AppProps} from 'next/app'
import TestResultContextProvider from '@fh-health/context/testResultContext'
import AuthContextProvider from '@fh-health/context/authContext'
import FooterMenu from '@fh-health/component/base/footer/footerMenu'
import HeaderMenu from '@fh-health/component/base/header/headerMenu'
import {useRouter} from 'next/router'
import ConferenceHeader from '@fh-health/component/utils/conferenceHeader'
import ConferenceContextProvider from '@fh-health/context/conferenceContext'
import {Provider} from 'react-redux'
import AuthChecker from '@fh-health/component/base/authChecker'
import store from '@fh-health/redux/store'
import * as ga from '../helpers/analytics/ga'

// const virtualTestFlowRoutesPrefix = 'conference'

const MyApp = ({Component, pageProps}: AppProps) => {
  const currentPage = useRouter().route
  const isConference = useRouter().route.includes('conference')
  const isInChat = useRouter().route.includes('room')
  const isAuthRoutes = useRouter().route.includes('auth')
  const isMigrationRoutes = useRouter().route.includes('migration')
  const isPublic = currentPage === '/'
  const router = useRouter()
  const [isAuthChecked, setIsAuthChecked] = useState<boolean>(false)
  const isLayoutVisible = !isPublic && !isAuthRoutes && !isMigrationRoutes && !isConference
  store.subscribe(listener)

  function select(state) {
    return state.authChecked.value
  }

  function listener() {
    const authChecked = select(store.getState())
    setIsAuthChecked(authChecked)
  }

  // useEffect(() => {
  //   if (process.env.VIRTUAL_TEST_MODE === 'true') {
  //     if (!currentPage.includes(virtualTestFlowRoutesPrefix)) {
  //       window.location.assign(process.env.FH_HEALTH_WEBSITE_URL)
  //     }
  //   }
  // }, [currentPage])

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
    <Provider store={store}>
      <AuthContextProvider>
        <ConferenceContextProvider>
          <AuthChecker />
          {isAuthChecked && (
            <>
              {isLayoutVisible && <HeaderMenu />}
              {isInChat && <ConferenceHeader isMobile={false} />}
              <TestResultContextProvider>
                <div
                  className={isConference ? 'main-content main-content_conference' : 'main-content'}
                >
                  <Component {...pageProps} />
                </div>
              </TestResultContextProvider>
              {isLayoutVisible && <FooterMenu />}
            </>
          )}
        </ConferenceContextProvider>
      </AuthContextProvider>
    </Provider>
  )
}

export default memo(MyApp)
