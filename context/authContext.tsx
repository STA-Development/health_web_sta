import React, {createContext, useContext, useEffect, useMemo, useReducer} from 'react'
import {IAuthActions, IAuthState} from '@fh-health/types/context/AuthContext'
import AuthContextReducer from '@fh-health/reducers/authContextReducer'
import AuthManager from '@fh-health/manager/authManager'
import * as Sentry from '@sentry/nextjs'
import AuthContextStaticData from '@fh-health/static/authContextStaticData'

const initialState: IAuthState = {
  authToken: '',
  reCaptchaVerifier: '',
  phoneNumber: '',
  patientAccountInformation: {
    firstName: null,
    email: null,
    isEmailVerified: null,
    migrationRequired: null,
    organizations: [
      {
        firebaseOrganizationId: null,
        patientId: null,
      },
    ],
  },
  patientAccountInformationCalled: false,
  isOnFlow: false,
  getPatientInformation: async () => {
    try {
      const response = await AuthManager.getPatientInformation()
      return response?.data?.data
    } catch (e) {
      Sentry.captureException(e)
    }
  },
}

const initialAuthContext: {
  authDataState: IAuthState
  setAuthDataState: React.Dispatch<IAuthActions>
} = {
  authDataState: initialState,
  setAuthDataState: () => ({}),
}

const AuthContext = createContext(initialAuthContext)

const AuthContextProvider = ({children}: {children: JSX.Element | JSX.Element[]}) => {
  const [authDataState, setAuthDataState] = useReducer(AuthContextReducer, initialState)
  const contextValues = useMemo(() => ({authDataState, setAuthDataState}), [authDataState])

  useEffect(() => {
    if (authDataState.patientAccountInformationCalled) {
      ;(async () => {
        const response = await authDataState.getPatientInformation()
        if (response) {
          setAuthDataState({
            type: AuthContextStaticData.UPDATE_PATIENT_ACCOUNT_INFORMATION_AND_RESET_CALL_STATE,
            patientAccountInformation: response,
            patientAccountInformationCalled: false,
          })
        }
      })()
    }
  }, [authDataState.patientAccountInformationCalled])
  return <AuthContext.Provider value={contextValues}>{children}</AuthContext.Provider>
}

export default AuthContextProvider

export const UseAuthDataStateValue = () => useContext(AuthContext)
