import Image from 'next/image'
import React, {useRef, useState} from 'react'
import {useClickAway} from 'react-use'
import * as Sentry from '@sentry/nextjs'
import {useRouter} from 'next/router'
import {useDispatch} from 'react-redux'
import {updatePatientInformation} from '@fh-health/redux/state/auth/patientInformationSlice'
import {updateAuthToken} from '@fh-health/redux/state/auth/tokenSlice'
import firebase from '@fh-health/lib/firbase'

const HeaderMenu = () => {
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)
  const [isProfileMenuOpen, setData] = useState(false)
  const currentPage = useRouter().route
  const showBackIcon = currentPage.includes('my')
  const dispatch = useDispatch()

  const openMenu = () => {
    setData(!isProfileMenuOpen)
  }

  const handlePreviousPageClick = () => {
    router.push('/results/list')
  }

  const handleLogoutClick = async () => {
    try {
      await firebase.auth().signOut()
      localStorage.removeItem('selectedKitId')
      dispatch(updatePatientInformation(null))
      dispatch(updateAuthToken(''))
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
