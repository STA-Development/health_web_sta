export interface IPatientInfo {
  firstName: string
  lastName: string
  testType: string
  kitCode: string
}

export interface IQBMessage {
  sender_id: number
  created_at: Date
  message: string
  hasError: boolean
  attachments: unknown
  attachmentUrl: string
}

export interface IConfState {
  chatVisibility: boolean
  messages: IQBMessage[]
  myPersonalId: number
  waitingToken: string
  patientInfo: IPatientInfo
  error: boolean
  consultationFlow: {
    isConsultationStarted: boolean
    isConferenceStarted: boolean
    isConferenceEnded: boolean
  }
}

export interface ICallListener {
  getUserMedia: (
    mediaParams: {
      audio: boolean
      video: boolean
      options: {muted: boolean; mirror: boolean}
      elemId: string
    },
    cb: (error: Error) => void,
  ) => void
  accept: (extension: {save_to_history: number; dialog_id: string}) => void
  stop: (value: object) => void
  mute: (value: string) => void
  unmute: (value: string) => void
}

export const callSessionInitialState: ICallListener = {
  getUserMedia: () => null,
  accept: () => null,
  stop: () => null,
  mute: () => null,
  unmute: () => null,
}

export interface ICallListenerExtension {
  save_to_history: number
  dialog_id: string
}

export interface IRemoteStreamListener {
  attachMediaStream: (streamType: string, remoteStream: object) => void
}

export type IConfActions =
  | {
      type: 'TOGGLE_CHAT_VIEW'
      view: boolean
    }
  | {
      type: 'SET_PERSONAL_ID'
      id: number
    }
  | {
      type: 'SET_MESSAGES'
      messages: IQBMessage[]
    }
  | {
      type: 'SET_WAITING_TOKEN'
      waitingToken: string
    }
  | {
      type: 'UPDATE_PATIENT_INFO'
      patientInfo: IPatientInfo
    }
  | {
      type: 'SET_MESSAGE_ERROR'
      error: boolean
    }
  | {
      type: 'SET_CONSULTATION_STATE'
      consultationFlow: {
        isConsultationStarted: boolean
        isConferenceStarted: boolean
        isConferenceEnded: boolean
      }
    }

interface RefObject<T> {
  readonly current: T | null
}

export interface IChatWrapper {
  loading: boolean
  sendMessage: () => void
  messageToSend: RefObject<HTMLInputElement>
  clearMessageToSend: () => void
}

export enum Language {
  ENG = 'Eng',
  RUS = 'Rus',
}
