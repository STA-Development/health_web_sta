import {IAuthActions, IAuthState} from '@fh-health/types/context/AuthContext'
import AuthContextStaticData from '@fh-health/static/authContextStaticData'

const AuthContextReducer = (state: IAuthState, action: IAuthActions) => {
  switch (action.type) {
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

export default AuthContextReducer
