import Image from 'next/image'
import React, {useRef, useState} from 'react'
import {useClickAway} from 'react-use'
import AuthContextStaticData from '@fh-health/static/authContextStaticData'
import * as Sentry from '@sentry/nextjs'
import {useRouter} from 'next/router'
import firebase from 'lib/firbase'
import {UseAuthDataStateValue} from '@fh-health/context/authContext'
import {userCredentials} from '@fh-health/utils/storage'

const HeaderMenu = () => {
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)
  const [isProfileMenuOpen, setData] = useState(false)
  const currentPage = useRouter().route
  const showBackIcon = currentPage.includes('my')
  const {setAuthDataState} = UseAuthDataStateValue()

  const openMenu = () => {
    setData(!isProfileMenuOpen)
  }

  const handlePreviousPageClick = () => {
    router.push('/results/list')
  }

  const handleLogoutClick = async () => {
    try {
      await firebase.auth().signOut()
      setAuthDataState({type: AuthContextStaticData.UPDATE_AUTH_TOKEN, token: ''})
      localStorage.removeItem('selectedKitId')
      userCredentials.accessToken = ''
      router.push('/auth/login')
    } catch (err) {
      Sentry.captureException(err)
    }
  }

  useClickAway(ref, () => {
    setData(false)
  })

  return (
    <header className="main-header">
      <div className="fullWidthMenu">
        <div className="icon">
          {showBackIcon && (
            <Image
              onClick={handlePreviousPageClick}
              src="/back.svg"
              width={12}
              height={12}
              alt="back arrow"
            />
          )}
        </div>
        <div className="main-header__logo">
          <Image
            className="icon"
            src="/group.svg"
            width={136}
            height={16}
            alt="FH HEALTH"
            onClick={() => router.push('/results/list')}
          />
        </div>
        <div ref={ref} className="rectangle-13" onClick={openMenu}>
          <Image src="/profile-user.svg" width={23} height={23} alt="user default avatar" />
          {isProfileMenuOpen && (
            <div onClick={handleLogoutClick} className="logOut">
              Log Out
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default HeaderMenu
