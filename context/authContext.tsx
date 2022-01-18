import React, {createContext, useContext, useMemo, useReducer} from 'react'
import {IAuthActions, IAuthState} from '@fh-health/types/context/AuthContext'
import AuthContextReducer from '@fh-health/reducers/authContextReducer'

const initialState: IAuthState = {
  authToken: '',
  reCaptchaVerifier: '',
  phoneNumber: '',
  patientAccountInformation: {
    isEmailVerified: null,
    organizations: [
      {
        firebaseOrganizationId: null,
        patientId: null,
      },
    ],
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

  return <AuthContext.Provider value={contextValues}>{children}</AuthContext.Provider>
}

export default AuthContextProvider

export const UseAuthDataStateValue = () => useContext(AuthContext)
