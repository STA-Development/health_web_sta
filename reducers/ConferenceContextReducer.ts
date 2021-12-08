import {IConfActions, IConfState} from "../types/context/ConferenceContext"
import {ConferenceContextStaticData} from "../static/ConferenceContextStaticData"

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
    default:
      return state
  }
}
