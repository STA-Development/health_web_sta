import React, {useEffect, useRef, useState} from 'react'
import * as QB from 'quickblox/quickblox'
import * as Sentry from '@sentry/nextjs'
import QBConfig from '@fh-health/utils/qbConfig'
import conferenceManager from '@fh-health/manager/conferenceManager'
import {useRouter} from 'next/router'
import {useNetworkState} from 'react-use'
import getV3RecaptchaToken from '@fh-health/utils/getV3RecaptchaToken'
import ConferenceContextStaticData from '@fh-health/static/conferenceContextStaticData'
import {UseConfDataStateValue} from '@fh-health/contexts/conferenceContext'
import {
  callSessionInitialState,
  ICallListener,
  ICallListenerExtension,
  IQBMessage,
  IRemoteStreamListener,
} from '@fh-health/types/context/ConferenceContext'
import ErrorNotification from '@fh-health/components/conference/errorNotification'
import MobileFinalViewModal from '@fh-health/components/conference/finalViewModal'
import MobileChatView from '@fh-health/components/conference/mobileChatView'
import ChatWrapper from '@fh-health/components/conference/chat'
import VideoWrapper from '@fh-health/components/conference/video'

const ConferenceRoomView = () => {
  const {confDataState, setConfDataState} = UseConfDataStateValue()
  const [dialogId, setDialogId] = useState<string>('')
  const [userToken, setUserToken] = useState<string>('')
  const [callSession, setCallSession] = useState(callSessionInitialState)
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const messageToSend = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const condition = useNetworkState()

  const completeConsultation = () => {
    setConfDataState({
      type: ConferenceContextStaticData.SET_CONSULTATION_STATE,
      consultationFlow: {
        isConsultationStarted: false,
        isConferenceStarted: false,
        isConferenceEnded: true,
      },
    })
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
    messageToSend.current.value = ''
  }

  const getSession = () => {
    try {
      QB.init(
        userToken,
        parseInt(`${process.env.QB_APP_ID}`, 10),
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

  const formatMessagesList = (messages) =>
    messages?.items.map((item: IQBMessage) => {
      const attachment = item.attachments[0]
      const uid = attachment?.uid || attachment?.id
      const attachmentUrl = QB.content.privateUrl(String(uid))

      return {
        ...item,
        attachmentUrl,
        attachmentType: attachment?.type,
      }
    })

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
        const formattedMessages = formatMessagesList(messages)
        setConfDataState({
          type: ConferenceContextStaticData.SET_MESSAGES,
          messages: formattedMessages,
        })
      }
    })
  }

  const connectToChat = () => {
    const userId = QB.chat.helpers.getUserJid(
      confDataState.myPersonalId,
      parseInt(`${process.env.QB_APP_ID}`, 10),
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

      QB.chat.onMessageListener = (
        id: number,
        message: {
          extension: {
            attachments: [{uid: number}]
          }
        },
      ) => {
        if (id !== confDataState.myPersonalId) {
          console.info(message, 'UPCOMING MESSAGE')
          getMessagesList()
        }
      }
    })

    QB.chat.onDisconnectedListener = () => {
      console.info('CHAT DISCONNECTED')
    }
  }

  const handleAttachmentUpload = (event) => {
    setIsUploading(true)

    const attachment = event.target.files[0]
    const dialogJid = QB.chat.helpers.getRoomJidFromDialogId(dialogId)

    const fileParams = {
      name: attachment.name,
      file: attachment,
      type: attachment.type,
      size: attachment.size,
      public: false,
    }

    QB.content.createAndUpload(fileParams, (error, result) => {
      if (error) {
        setIsUploading(false)
        Sentry.captureException(error)
      } else {
        const message = {
          type: 'groupchat',
          body: '[attachment]',
          extension: {
            save_to_history: 1,
            dialog_id: dialogId,
            attachments: [{id: result.uid, type: result.content_type}],
          },
        }
        setIsUploading(false)
        QB.chat.send(dialogJid, message)
      }
    })
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
      attachments: [],
      attachmentUrl: '',
      attachmentType: '',
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

  const joinToChat = async () => {
    setLoading(true)
    const captchaToken = await getV3RecaptchaToken()
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
          muted: false,
          mirror: true,
        },
        elemId: 'myVideoStream',
      }

      QB.webrtc.onCallListener = (session: ICallListener, extension: ICallListenerExtension) => {
        setConfDataState({
          type: ConferenceContextStaticData.SET_CONSULTATION_STATE,
          consultationFlow: {
            isConsultationStarted: true,
            isConferenceStarted: true,
            isConferenceEnded: false,
          },
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
      window.onbeforeunload = () => 'The call will be terminated, are you sure?'
    }
  }, [userToken])

  return (
    <div className="conference-wrapper">
      <VideoWrapper triggerCallEnd={triggerCallEnd} switchAudioState={switchAudioState} />
      <ChatWrapper
        loading={loading}
        isUploading={isUploading}
        sendMessage={sendMessage}
        messageToSend={messageToSend}
        clearMessageToSend={clearMessageToSend}
        handleAttachmentUpload={handleAttachmentUpload}
      />
      {confDataState.chatVisibility && (
        <MobileChatView
          loading={loading}
          isUploading={isUploading}
          sendMessage={sendMessage}
          messageToSend={messageToSend}
          clearMessageToSend={clearMessageToSend}
          handleAttachmentUpload={handleAttachmentUpload}
        />
      )}
      <ErrorNotification isError={isError} setErrorState={setIsError} />
      <MobileFinalViewModal />
    </div>
  )
}

export default ConferenceRoomView
