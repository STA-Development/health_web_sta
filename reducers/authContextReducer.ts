import {IAuthActions, IAuthState} from '@fh-health/types/context/AuthContext'
import AuthContextStaticData from '@fh-health/static/authContextStaticData'

const AuthContextReducer = (state: IAuthState, action: IAuthActions) => {
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
    case AuthContextStaticData.UPDATE_PATIENT_ACCOUNT_INFORMATION:
      return {
        ...state,
        patientAccountInformation: action.patientAccountInformation,
      }
    case AuthContextStaticData.UPDATE_PATIENT_ACCOUNT_INFORMATION_CALLED:
      return {
        ...state,
        patientAccountInformationCalled: action.patientAccountInformationCalled,
      }
    case AuthContextStaticData.UPDATE_PATIENT_ACCOUNT_INFORMATION_AND_RESET_CALL_STATE:
      return {
        ...state,
        patientAccountInformationCalled: action.patientAccountInformationCalled,
        patientAccountInformation: action.patientAccountInformation,
      }
    default:
      return state
  }
}

export default AuthContextReducer
