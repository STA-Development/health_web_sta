import React, {memo, useEffect, useState} from 'react'
import 'styles/scss/main.scss'
import type {AppProps} from 'next/app'
import {useRouter} from 'next/router'
import {Provider} from 'react-redux'
import TestResultContextProvider from '@fh-health/contexts/testResultContext'
import AuthContextProvider from '@fh-health/contexts/authContext'
import ConferenceContextProvider from '@fh-health/contexts/conferenceContext'
import store from '@fh-health/redux/store'
import FooterMenu from '@fh-health/components/base/footer/footerMenu'
import HeaderMenu from '@fh-health/components/base/header/headerMenu'
import ConferenceHeader from '@fh-health/components/utils/conferenceHeader'
import AuthChecker from '@fh-health/components/base/authChecker'
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
