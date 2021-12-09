import {IAuthActions, IAuthState} from '@fh-health/types/context/AuthContext'
import {AuthContextStaticData} from '@fh-health/static/AuthContextStaticData'

export const AuthContextReducer = (state: IAuthState, action: IAuthActions) => {
  switch (action.type) {
    case AuthContextStaticData.UPDATE_AUTH_TOKEN:
      return {
        ...state,
        authToken: action.token,
      }
    case AuthContextStaticData.UPDATE_RE_CAPTCHA:
      return {
        ...state,
        reCaptchaVerifier: action.reCaptchaVerifier,
      }
    case AuthContextStaticData.UPDATE_PHONE_NUMBER:
      return {
        ...state,
        phoneNumber: action.phoneNumber,
      }
    default:
      return state
  }
}
