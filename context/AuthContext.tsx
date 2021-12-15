import React, {createContext, useContext, useReducer} from 'react'
import {IAuthActions, IAuthState} from '@fh-health/types/context/AuthContext'
import {AuthContextReducer} from '@fh-health/reducers/AuthContextReducer'
import {load, ReCaptchaInstance} from 'recaptcha-v3'

const initialState: IAuthState = {
  authToken: '',
  reCaptchaVerifier: '',
  phoneNumber: '',
  getGoogleV3RecaptchaToken: async () => {
    if (process.env.RECAPTCHA_V3_KEY) {
      const googleV3RecaptchaToken = await load(process.env.RECAPTCHA_V3_KEY).then(
        (recaptcha: ReCaptchaInstance) => recaptcha.execute('submit'),
      )
      return googleV3RecaptchaToken
    }
    console.error('Recaptcha Key is not available')
    return ''
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

export function AuthContextProvider({children}: { children?: JSX.Element | JSX.Element[] }) {
  const [authDataState, setAuthDataState] = useReducer(AuthContextReducer, initialState)

  return (
    <AuthContext.Provider value={{authDataState, setAuthDataState}}>
      {children}
    </AuthContext.Provider>
  )
}

export const UseAuthDataStateValue = () => useContext(AuthContext)
