import React, {useEffect, useState} from 'react'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'
import {useDispatch, useSelector} from 'react-redux'
import AuthManager from '@fh-health/manager/authManager'
import * as Sentry from '@sentry/nextjs'
import {useRouter} from 'next/router'
import {updateAuthToken} from '@fh-health/redux/state/auth/tokenSlice'
import {updateAuthChecked} from '@fh-health/redux/state/auth/authCheckedSlice'
import {updatePatientInformation} from '@fh-health/redux/state/auth/patientInformationSlice'
import {IStore} from '@fh-health/redux/store'
import {IPatientAccountInformation} from '@fh-health/types/context/AuthContext'
import firebase from '../../lib/firbase'

interface IDecodedToken {
  exp: number
  token: string
}

const AuthChecker = () => {
  const router = useRouter()
  const token = useSelector((state: IStore) => state.token.value)
  const authChecked = useSelector((state: IStore) => state.authChecked.value)
  const patientInformation = useSelector((state: IStore) => state.patientInformation.value)
  const authInformationUpdate = useSelector((state: IStore) => state.authInformationUpdate.value)
  const currentPage = useRouter().route
  const isPublicPage = currentPage === '/'

  const dispatch = useDispatch()

  const getPatientInformation = async () => {
    try {
      const response = await AuthManager.getPatientInformation()
      return response?.data?.data
    } catch (e) {
      Sentry.captureException(e)
    }
  }

  const onAuthStateChange = () =>
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const firebaseToken = await firebase.auth().currentUser.getIdToken()
        if (firebaseToken && !checkAuthTokenExpiration(firebaseToken)) {
          dispatch(updateAuthToken(firebaseToken))
        }
      }
      dispatch(updateAuthChecked(true))
    })

  const checkAuthTokenExpiration = (authToken: string) => {
    let decodedToken: IDecodedToken
    let isExpired = true
    if (authToken) {
      decodedToken = jwt_decode(authToken)
      isExpired = decodedToken.exp * 1000 < new Date().getTime()
    }
    return isExpired
  }

  const isPageEnterPermitted = (authToken?: string, patientInfo?: IPatientAccountInformation) => {
    if (!(isPublicPage && router.asPath.indexOf('?') === 1)) {
      const firebaseToken = authToken || token
      const patientData = patientInfo || patientInformation

      if (!firebaseToken || checkAuthTokenExpiration(firebaseToken)) {
        router.push('/auth/login')
      } else if (!patientData) {
        router.push('/auth/createProfile')
      } else if (!patientData?.isEmailVerified && patientData?.email) {
        router.push(`/auth/emailVerification`)
      } else if (patientData?.firstName && !patientData?.email) {
        router.push('/auth/updateEmail')
      } else if (patientData?.migrationRequired) {
        router.push(`/migration`)
      } else {
        router.push(`/results/list`)
      }
    }
  }

  const [patientInformationAccessChecked, setPatientInformationAccessChecked] =
    useState<boolean>(false)

  // THIS ONE CHECKS ON PAGE LOAD FOR CORRECT USER REDIRECTING
  useEffect(() => {
    if (authChecked) {
      ;(async () => {
        const data = await getPatientInformation()
        if (data) {
          dispatch(updatePatientInformation(data))
          await isPageEnterPermitted(token, data)
        }
        setPatientInformationAccessChecked(true)
      })()
    }
  }, [authChecked])

  // THIS ONE DOING SAME ONLY FOR LOGIN PURPOSES
  useEffect(() => {
    if (token && patientInformationAccessChecked) {
      ;(async () => {
        const data = await getPatientInformation()
        if (data) {
          dispatch(updatePatientInformation(data))
          isPageEnterPermitted(token, data)
        }
      })()
    }
  }, [token])

  useEffect(() => {
    onAuthStateChange()
  }, [])

  useEffect(() => {
    if (authChecked && patientInformationAccessChecked) {
      isPageEnterPermitted()
    }
  }, [authInformationUpdate, authChecked, patientInformationAccessChecked])

  return <> </>
}

export default AuthChecker
