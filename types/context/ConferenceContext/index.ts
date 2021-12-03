export interface IPatientInfo {
  firstName: string
  lastName: string
  testType: string
  kitCode: string
}

export interface IConfState {
  chatVisibility: boolean,
  messages: IQBMessage[],
  myPersonalId: number,
  waitingToken: string,
  patientInfo: IPatientInfo,
  error: boolean
}

export type IConfActions =
  | {
  type: "TOGGLE_CHAT_VIEW"
  view: boolean
}
  | {
  type: "SET_PERSONAL_ID"
  id: number
}
  | {
  type: "SET_MESSAGES"
  messages: []
}
  | {
  type: "SET_WAITING_TOKEN"
  waitingToken: string
}
  | {
  type: "UPDATE_PATIENT_INFO"
  patientInfo: IPatientInfo
}
  | {
  type: "SET_MESSAGE_ERROR"
  error: boolean
}

export interface IMessage {
  senderId: number,
  date: string,
  message: string
}

export interface IQBMessage {
  sender_id: number,
  created_at: string,
  message: string
}

export interface IChatWrapper {
  getMessageValue: (value: string) => void,
  sendMessage: () => void,
  messageToSend: string
}
