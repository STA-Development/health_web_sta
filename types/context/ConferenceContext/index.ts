export interface IConfState {
  chatVisibility: boolean,
  messages: IQBMessage[],
  myPersonalId: number,
  waitingToken: string,
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
