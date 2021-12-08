import {useEffect, useState} from "react"
import VideoWrapper from "../../component/base/conference/video"
import ChatWrapper from "../../component/base/conference/chat"
import * as QB from "quickblox/quickblox.js"
import {QBConfig} from "../../utils/quickblox/config"
import {UseConfDataStateValue} from "../../context/ConferenceContext"
import conferenceManager from "../../manager/ConferenceManager"
import {ConferenceContextStaticData} from "../../static/ConferenceContextStaticData"
import MobileChatView from "../../component/base/conference/partials/mobileChatView"
import {load, ReCaptchaInstance} from "recaptcha-v3"
import { useRouter } from 'next/router'
import {useNetworkState} from "react-use"

interface ICallListener {
  getUserMedia: (mediaParams: { audio: boolean, video: boolean, options: { muted: boolean, mirror: boolean }, elemId: string, }, cb: (error: Error) => void) => void
  accept: (extension:  {save_to_history: number, dialog_id: string }) => void,
  stop: (value: object) => void,
  mute: (value: string) => void,
  unmute: (value: string) => void
}

interface ICallListenerExtension {
  save_to_history: number
  dialog_id: string
}

interface IRemoteStreamListener {
  attachMediaStream: (streamType: string, remoteStream: object) => {}
}

const callSessionInitialState = {
  getUserMedia: (mediaParams: { audio: boolean, video: boolean, options: { muted: boolean, mirror: boolean }, elemId: string, }, cb: (error: Error) => void) => {},
  accept: (extension:  {save_to_history: number, dialog_id: string }) => {},
  stop: (value: object) => {},
  mute: (value: string) => {},
  unmute: (value: string) => {}
}

export default function ConferenceRoomView() {
  const {confDataState, setConfDataState} = UseConfDataStateValue()
  const [dialogId, setDialogId] = useState<string>("")
  const [userToken, setUserToken] = useState<string>("")
  const [messageToSend, setMessageToSend] = useState<string>("")
  const [isConferenceStarted, setIsConferenceStarted] = useState<boolean>(false)
  const [isConferenceEnded, setIsConferenceEnded] = useState<boolean>(false)
  const [callSession, setCallSession] = useState<ICallListener>(callSessionInitialState)
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const router = useRouter()
  const condition = useNetworkState()

  const getRecaptcha = async () => {
    const captchaToken = process.env.RECAPTCHA_V3_KEY
    if (captchaToken) {
      const recaptcha: ReCaptchaInstance = await load(captchaToken as string)
      return await recaptcha.execute("submit")
    } else {
      console.error("Captcha token is undefined")
    }
  }

  const getMessageValue = (value: string) => {
    setMessageToSend(value)
  }

  const triggerCallEnd = () => {
    const extension = {}
    callSession.stop(extension)
    setIsConferenceStarted(false)
    setIsConferenceEnded(true)
  }

  const switchAudioState = () => {
    if (isMuted) {
      setIsMuted(false)
      callSession.unmute("audio")
    } else {
      setIsMuted(true)
      callSession.mute("audio")
    }
  }

  const getSession = () => {
    QB.init(userToken, parseInt(`${process.env.QB_APP_ID}`), null, process.env.QB_ACCOUNT_KEY, QBConfig)
    QB.getSession(function(error: object, {session}: {session: {user_id: number}}) {
      if (error) {
        console.error(error)
      } else {
        setConfDataState({ type: ConferenceContextStaticData.SET_PERSONAL_ID, id: session.user_id })
      }
    })
  }

  const connectToChat = () => {
    const userId = QB.chat.helpers.getUserJid(confDataState.myPersonalId, parseInt(`${process.env.APP_ID}`))
    const dialogJid = QB.chat.helpers.getRoomJidFromDialogId(dialogId)
    const userCredentials = {
      jid: userId,
      password: userToken,
    }

    QB.chat.connect(userCredentials, (error: object, contactList: object) => {
      if (error) {
        console.error(error)
      } else {
        console.info(contactList, "CONTACT LIST")
      }
      try {
        QB.chat.muc.join(dialogJid, (err: string, result: string) => {
          if (err) {
            console.error(err)
          } else {
            console.info("JOINED ", result)
          }
        })
      } catch (e) {
        if (e.name === "ChatNotConnectedError") {
          console.info("CHAT NOT CONNECTED")
        }
      }

      QB.chat.onMessageListener = (userId: number, message: object) => {
        if (userId !== confDataState.myPersonalId) {
          getMessagesList()
          console.info(message, "UPCOMING MESSAGE")
        }
      }
    })

    QB.chat.onDisconnectedListener = () => {
      console.info("CHAT DISCONNECTED")
    }
  }

  const sendMessage = () => {
    setMessageToSend("")
    const message = {
      type: "groupchat",
      body: messageToSend,
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
      message: messageToSend,
      hasError: false
    }

    if (!condition.online) {
      setConfDataState({
        type: ConferenceContextStaticData.SET_MESSAGES,
        messages: [...confDataState.messages, {...newMessage, hasError: true}]
      })
    } else {
      setConfDataState({ type: ConferenceContextStaticData.SET_MESSAGES, messages: [...confDataState.messages, newMessage] })
    }

    try {
      QB.chat.send(dialogJid, message)
    } catch (e) {
      if (e.name === "ChatNotConnectedError") {
        console.error(e, "ON_SEND_ERROR")
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
        console.error(error)
      } else {
        setConfDataState({ type: ConferenceContextStaticData.SET_MESSAGES, messages: messages?.items })
      }
    })
  }

  const joinToChat = async () => {
    const captchaToken = await getRecaptcha()
    try {
      const confCredentials = await conferenceManager.joinToDialog(captchaToken as string, confDataState.waitingToken)
      setDialogId(confCredentials.data.data.dialogId)
      setUserToken(confCredentials.data.data.userToken)
    } catch (err) {
      console.error(err)
    }
  }

  const startVideoCall = () => {
    const mediaParams = {
      audio: true,
      video: true,
      options: {
        muted: true,
        mirror: true,
      },
      elemId: "myVideoStream"
    }

    QB.webrtc.onCallListener = (session: ICallListener, extension: ICallListenerExtension) => {
      setIsConferenceStarted(true)
      setCallSession(session)
      session.getUserMedia(mediaParams, function (error: object) {
        if (error) {
          console.error(error)
        } else {
          session.accept(extension)
        }
      })
    }

    QB.webrtc.onRemoteStreamListener = (session: IRemoteStreamListener, userID: number, remoteStream: object) => {
      session.attachMediaStream("videoStream", remoteStream);
    }

    QB.webrtc.onStopCallListener = () => {
      setIsConferenceStarted(false)
      setIsConferenceEnded(true)
    };
  }

  useEffect(() => {
    (async () => {
      if (confDataState.waitingToken.length) {
        await joinToChat()
      } else {
        await router.push(`/conference/join?appointmentToken=${localStorage.getItem("appointmentToken")}`)
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
        getMessageValue={getMessageValue}
        sendMessage={sendMessage}
        messageToSend={messageToSend}
      />
      {confDataState.chatVisibility && <MobileChatView
        getMessageValue={getMessageValue}
        sendMessage={sendMessage}
        messageToSend={messageToSend}
      />}
    </div>
  )
}
