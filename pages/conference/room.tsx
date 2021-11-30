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

interface ICallListener {
  getUserMedia: (mediaParams: { audio: boolean; video: boolean; options: { muted: boolean; mirror: boolean; }; elemId: string; }, cb: (error: Error) => void) => void
  accept: (extension:  {save_to_history: number, dialog_id: string }) => void
}

interface ICallListenerExtension {
  save_to_history: number
  dialog_id: string
}

interface IRemoteStreamListener {
  attachMediaStream: (streamType: string, remoteStream: object) => {}
}

export default function ConferenceRoomView() {
  const {confDataState, setConfDataState} = UseConfDataStateValue()
  const [dialogId, setDialogId] = useState<string>("")
  const [userToken, setUserToken] = useState<string>("")
  const [messageToSend, setMessageToSend] = useState<string>("")
  const [isConferenceStarted, setIsConferenceStarted] = useState(false)
  const [isConferenceEnded, setIsConferenceEnded] = useState(false)
  const router = useRouter()

  const getRecaptcha = () => {
    const captchaToken = process.env.RECAPTCHA_V3_KEY
    if (captchaToken) {
      return load(captchaToken as string).then((recaptcha: ReCaptchaInstance) => {
        return recaptcha.execute("submit")
      })
    } else {
      console.error("Captcha token is undefined")
    }
  }

  const getMessageValue = (value: string) => {
    setMessageToSend(value)
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

    QB.chat.connect(userCredentials, function(error: object, contactList: object) {
      if (error) {
        console.error(error)
      } else {
        console.info(contactList, "CONTACT LIST")
      }
      try {
        QB.chat.muc.join(dialogJid, function(err: string, result: string) {
          console.info("JOINED ", result, err)
        })
      } catch (e) {
        if (e.name === "ChatNotConnectedError") {
          console.info("CHAT NOT CONNECTED")
        }
      }

      QB.chat.onMessageListener = function (userId: number, message: {body: string}) {
        getMessagesList()
        console.info(message, "UPCOMING MESSAGE")
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
    try {
      QB.chat.send(dialogJid, message)
      getMessagesList()
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

    QB.chat.message.list(chatParams, function(error: object, messages: {items: []}) {
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
      console.log(confCredentials,111)
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

    QB.webrtc.onCallListener = function(session: ICallListener, extension: ICallListenerExtension) {
      setIsConferenceStarted(true)
      session.getUserMedia(mediaParams, function (error: object) {
        if (error) {
          console.error(error)
        } else {
          session.accept(extension)
        }
      })
    }

    QB.webrtc.onRemoteStreamListener = function(session: IRemoteStreamListener, userID: number, remoteStream: object) {
      session.attachMediaStream("videoStream", remoteStream);
    }

    QB.webrtc.onStopCallListener = function() {
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
