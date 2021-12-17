import {useEffect, useState, useRef} from 'react'
import VideoWrapper from '@fh-health/component/base/conference/video'
import ChatWrapper from '@fh-health/component/base/conference/chat'
import * as QB from 'quickblox/quickblox.js'
import * as Sentry from '@sentry/nextjs'
import {QBConfig} from 'utils/quickblox/config'
import {UseConfDataStateValue} from '@fh-health/context/ConferenceContext'
import conferenceManager from '@fh-health/manager/ConferenceManager'
import {ConferenceContextStaticData} from '@fh-health/static/ConferenceContextStaticData'
import MobileChatView from '@fh-health/component/base/conference/partials/mobileChatView'
import {load, ReCaptchaInstance} from 'recaptcha-v3'
import {useRouter} from 'next/router'
import {useNetworkState} from 'react-use'
import ErrorNotification from '@fh-health/component/base/conference/partials/errorNotification'

interface ICallListener {
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

interface ICallListenerExtension {
  save_to_history: number
  dialog_id: string
}

interface IRemoteStreamListener {
  attachMediaStream: (streamType: string, remoteStream: object) => void
}

const callSessionInitialState = {
  getUserMedia: () => null,
  accept: () => null,
  stop: () => null,
  mute: () => null,
  unmute: () => null,
}

export default function ConferenceRoomView() {
  const {confDataState, setConfDataState} = UseConfDataStateValue()
  const [dialogId, setDialogId] = useState<string>('')
  const [userToken, setUserToken] = useState<string>('')
  const [isConferenceStarted, setIsConferenceStarted] = useState<boolean>(false)
  const [isConferenceEnded, setIsConferenceEnded] = useState<boolean>(false)
  const [callSession, setCallSession] = useState<ICallListener>(callSessionInitialState)
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const messageToSend = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const condition = useNetworkState()

  const getRecaptcha = async () => {
    const captchaToken = process.env.RECAPTCHA_V3_KEY
    if (captchaToken) {
      const recaptcha: ReCaptchaInstance = await load(captchaToken as string)
      return await recaptcha.execute('submit')
    }
    Sentry.captureException('Captcha Token Was not found')
    setIsError(true)
  }

  const completeConsultation = () => {
    setIsConferenceStarted(false)
    setConfDataState({
      type: ConferenceContextStaticData.SET_CONSULTATION_STATE,
      isConsultationStarted: false,
    })
    setIsConferenceEnded(true)
  }

  const triggerCallEnd = () => {
    const extension = {}
    callSession.stop(extension)
    completeConsultation()
  }

  const switchAudioState = () => {
    if (isMuted) {
      setIsMuted(false)
      callSession.unmute('audio')
    } else {
      setIsMuted(true)
      callSession.mute('audio')
    }
  }

  const clearMessageToSend = () => {
    messageToSend.current.value = ""
  }

  const getSession = () => {
    try {
      QB.init(
        userToken,
        parseInt(`${process.env.QB_APP_ID}`),
        null,
        process.env.QB_ACCOUNT_KEY,
        QBConfig,
      )
      QB.getSession((error: object, {session}: {session: {user_id: number}}) => {
        if (error) {
          Sentry.captureException(error)
          setIsError(true)
        } else {
          setConfDataState({type: ConferenceContextStaticData.SET_PERSONAL_ID, id: session.user_id})
        }
      })
    } catch (err) {
      Sentry.captureException(err)
      setIsError(true)
    }
  }

  const connectToChat = () => {
    const userId = QB.chat.helpers.getUserJid(
      confDataState.myPersonalId,
      parseInt(`${process.env.APP_ID}`),
    )
    const dialogJid = QB.chat.helpers.getRoomJidFromDialogId(dialogId)
    const userCredentials = {
      jid: userId,
      password: userToken,
    }

    QB.chat.connect(userCredentials, (error: object, contactList: object) => {
      if (error) {
        Sentry.captureException(error)
        setIsError(true)
      } else {
        console.info(contactList, 'CONTACT LIST')
      }
      try {
        QB.chat.muc.join(dialogJid, (err: string, result: string) => {
          if (err) {
            Sentry.captureException(error)
            setIsError(true)
          } else {
            console.info('JOINED ', result)
          }
        })
      } catch (err) {
        if (err.name === 'ChatNotConnectedError') {
          Sentry.captureException('CHAT NOT CONNECTED')
          setIsError(true)
        } else {
          Sentry.captureException(err)
        }
      }

      QB.chat.onMessageListener = (userId: number, message: object) => {
        if (userId !== confDataState.myPersonalId) {
          getMessagesList()
          console.info(message, 'UPCOMING MESSAGE')
        }
      }
    })

    QB.chat.onDisconnectedListener = () => {
      console.info('CHAT DISCONNECTED')
    }
  }

  const sendMessage = () => {
    const message = {
      type: 'groupchat',
      body: messageToSend.current.value,
      extension: {
        save_to_history: 1,
        dialog_id: dialogId,
      },
      markable: 1,
    }

    const dialogJid = QB.chat.helpers.getRoomJidFromDialogId(dialogId)

    const newMessage = {
      sender_id: confDataState.myPersonalId,
      created_at: new Date(),
      message: messageToSend.current.value,
      hasError: false,
    }

    if (!condition.online) {
      setConfDataState({
        type: ConferenceContextStaticData.SET_MESSAGES,
        messages: [...confDataState.messages, {...newMessage, hasError: true}],
      })
    } else {
      setConfDataState({
        type: ConferenceContextStaticData.SET_MESSAGES,
        messages: [...confDataState.messages, newMessage],
      })
    }

    try {
      QB.chat.send(dialogJid, message)
    } catch (err) {
      if (err.name === 'ChatNotConnectedError') {
        Sentry.captureException('ON_SEND_ERROR')
      } else {
        Sentry.captureException(err)
      }
    }
  }

  const getMessagesList = () => {
    const chatParams = {
      chat_dialog_id: dialogId,
      limit: 0,
      mark_as_read: 0,
      skip: 0,
    }

    QB.chat.message.list(chatParams, (error: object, messages: {items: []}) => {
      if (error) {
        Sentry.captureException(error)
        setIsError(true)
      } else {
        setConfDataState({
          type: ConferenceContextStaticData.SET_MESSAGES,
          messages: messages?.items,
        })
      }
    })
  }

  const joinToChat = async () => {
    setLoading(true)
    const captchaToken = await getRecaptcha()
    try {
      const confCredentials = await conferenceManager.joinToDialog(
        captchaToken as string,
        confDataState.waitingToken,
      )
      setDialogId(confCredentials.data.data.dialogId)
      setUserToken(confCredentials.data.data.userToken)
    } catch (err) {
      Sentry.captureException(err)
      setIsError(true)
    }
    setLoading(false)
  }

  const startVideoCall = () => {
    try {
      const mediaParams = {
        audio: true,
        video: true,
        options: {
          muted: true,
          mirror: true,
        },
        elemId: 'myVideoStream',
      }

      QB.webrtc.onCallListener = (session: ICallListener, extension: ICallListenerExtension) => {
        setIsConferenceStarted(true)
        setConfDataState({
          type: ConferenceContextStaticData.SET_CONSULTATION_STATE,
          isConsultationStarted: true,
        })
        setCallSession(session)
        session.getUserMedia(mediaParams, (error: object) => {
          if (error) {
            Sentry.captureException(error)
            setIsError(true)
          } else {
            session.accept(extension)
          }
        })
      }

      QB.webrtc.onRemoteStreamListener = (
        session: IRemoteStreamListener,
        _userID: number,
        remoteStream: object,
      ) => {
        session.attachMediaStream('videoStream', remoteStream)
      }

      QB.webrtc.onStopCallListener = () => {
        completeConsultation()
      }
    } catch (err) {
      Sentry.captureException(err)
    }
  }

  useEffect(() => {
    ;(async () => {
      if (confDataState.waitingToken.length) {
        await joinToChat()
      } else {
        await router.push(
          `/conference/join?appointmentToken=${localStorage.getItem('appointmentToken')}`,
        )
      }
    })()
  }, [confDataState.waitingToken])

  useEffect(() => {
    if (QB.chat) {
      connectToChat()
      getMessagesList()
      startVideoCall()
    }
  }, [confDataState.myPersonalId])

  useEffect(() => {
    if (userToken && dialogId) {
      getSession()
    }
  }, [userToken])

  return (
    <div className="conference-wrapper">
      <VideoWrapper
        isConferenceStarted={isConferenceStarted}
        isConferenceEnded={isConferenceEnded}
        triggerCallEnd={triggerCallEnd}
        switchAudioState={switchAudioState}
      />
      <ChatWrapper
        loading={loading}
        sendMessage={sendMessage}
        messageToSend={messageToSend}
        clearMessageToSend={clearMessageToSend}
      />
      {confDataState.chatVisibility && (
        <MobileChatView
          loading={loading}
          sendMessage={sendMessage}
          messageToSend={messageToSend}
          clearMessageToSend={clearMessageToSend}
        />
      )}
      <ErrorNotification isError={isError} setErrorState={setIsError} />
    </div>
  )
}
