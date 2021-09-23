import React, {createContext, useContext, useReducer} from "react"
import {IAuthActions, IAuthState} from "../types/context/AuthContext"
import {AuthContextReducer} from "../reducers/AuthContextReducer"
import {load, ReCaptchaInstance} from "recaptcha-v3"

const initialState: IAuthState = {
    authToken: "",
    reCaptchaVerifier: "",
    phoneNumber: "",
    getGoogleV3RecaptchaToken: async () => {
        if (process.env.NEXT_PUBLIC_RECAPTCHA_V3_KEY) {

            const googleV3RecaptchaToken = await load(process.env.NEXT_PUBLIC_RECAPTCHA_V3_KEY).then(
                (recaptcha: ReCaptchaInstance) => {
                    return recaptcha.execute("submit")
                },
            )
            return googleV3RecaptchaToken
        }
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

export function AuthContextProvider({children}: any) {
    const [authDataState, setAuthDataState] = useReducer(AuthContextReducer, initialState)

    return (
        <AuthContext.Provider value={{authDataState, setAuthDataState}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UseAuthDataStateValue = () => useContext(AuthContext)
