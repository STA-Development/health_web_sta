export interface IConfState {
  chatVisibility: boolean,
  messages: IQBMessage[],
  myPersonalId: number,
  waitingToken: string,
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
