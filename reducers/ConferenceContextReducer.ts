import {IConfActions, IConfState} from '@fh-health/types/context/ConferenceContext'
import {ConferenceContextStaticData} from '@fh-health/static/ConferenceContextStaticData'

export const ConferenceContextReducer = (state: IConfState, action: IConfActions) => {
  switch (action.type) {
    case ConferenceContextStaticData.TOGGLE_CHAT_VIEW:
      return {
        ...state,
        chatVisibility: action.view,
      }
    case ConferenceContextStaticData.SET_PERSONAL_ID:
      return {
        ...state,
        myPersonalId: action.id,
      }
    case ConferenceContextStaticData.SET_MESSAGES:
      return {
        ...state,
        messages: action.messages,
      }
    case ConferenceContextStaticData.SET_WAITING_TOKEN:
      return {
        ...state,
        waitingToken: action.waitingToken,
      }
    case ConferenceContextStaticData.UPDATE_PATIENT_INFO:
      return {
        ...state,
        patientInfo: action.patientInfo,
      }
    case ConferenceContextStaticData.SET_MESSAGE_ERROR:
      return {
        ...state,
        error: action.error,
      }
    case ConferenceContextStaticData.SET_CONSULTATION_STATE:
      return {
        ...state,
        isConsultationStarted: action.isConsultationStarted,
      }
    default:
      return state
  }
}
