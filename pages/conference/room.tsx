import {useEffect, useState} from "react"
import VideoWrapper from "../../component/base/conference/video"
import ChatWrapper from "../../component/base/conference/chat"
// @ts-ignore
import * as QB from "quickblox/quickblox.js"
import QBVideoConferencingClient from "../../utils/quickblox/quickblox-multiparty-video-conferencing-client-0.8.8.min"
import {QBConfig} from "../../utils/quickblox/config"
import {UseConfDataStateValue} from "../../context/ConferenceContext"
import {IQBMessage} from "../../types/context/CnferenceContext"
import conferenceManager from "../../manager/ConferenceManager"
import Script from "next/script"

export default function ConferenceRoomView() {
  const {confDataState, setConfDataState} = UseConfDataStateValue()
  const [dialogId, setDialogId] = useState<string>("")
  const [userToken, setUserToken] = useState<string>("")
  const [messageToSend, setMessageToSend] = useState<string>("")

  const getMessageValue = (value: string) => {
    setMessageToSend(value)
  }

  const getSession = () => {
    QB.init(userToken, parseInt(`${process.env.QB_APP_ID}`), null, process.env.QB_ACCOUNT_KEY, QBConfig)
    QB.getSession(function(error: object, {session}: {session: {user_id: number}}) {
      if (error) {
        console.log(error)
      } else {
        setConfDataState({
          ...confDataState,
          myPersonalId: session.user_id,
        })
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
        console.log(error)
      } else {
        console.log(contactList)
      }
      try {
        QB.chat.muc.join(dialogJid, function(error2: string, result2: string) {
          console.log("JOINED ", result2, error2)
        })
      } catch (e) {
        if (e.name === "ChatNotConnectedError") {
          console.log("CHAT NOT CONNECTED")
        }
      }

      function onMessage(userId: number, message: {body: string}) {
        getMessagesList()
        console.log(message, "UPCOMING MESSAGE")
      }

      QB.chat.onMessageListener = onMessage
    })

    QB.chat.onDisconnectedListener = () => {
      console.log("CHAT DISCONECTED")
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
        console.log(e, "ON_SEND_ERROR")
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

    QB.chat.message.list(chatParams, function(error: object, messages: {items: IQBMessage[]}) {
      if (error) {
        console.log(error)
      } else {
        setConfDataState({
          ...confDataState,
          messages: messages?.items,
        })
      }
    })
  }

  const joinToChat = async () => {
    try {
      const confCredentials = await conferenceManager.joinToDialog(confDataState.waitingToken)
      setDialogId(confCredentials.data.data.dialogId)
      setUserToken(confCredentials.data.data.userToken)
    } catch (err) {
      console.log(err)
    }
  }

  function QBClient() {
    const config = {
      server: ""
    }
    const client = new QBVideoConferencingClient(config)
    console.log(client, "CLIENT")

    client
      .createSession()
      .then(() => {
        console.log("SESSION CREATED")
      })
      .catch((error: object) => {
        if (error) {
          console.error(error, "SESSION ERROR")
        }
      });
  }
  const startVideoCall = () => {
    /*const calleesIds = [4104]
    const sessionType = QB.webrtc.CallType.VIDEO
    const callSession = QB.webrtc.createNewSession(calleesIds, sessionType, null, null)

    const mediaParams = {
      audio: true,
      video: true,
      options: {
        muted: true,
        mirror: true,
      },
      elemId: "myVideoStream"
    }

    callSession.getUserMedia(mediaParams, function (error: object, stream: object) {
      if (error) {
        console.error(error, "VIDEO ERROR")
      } else {
        const extension = {}
        callSession.call(extension, function (error: object) {
          if (error) {
            console.error(error, "CALL ERROR")
          } else {
            console.log(callSession, "CURRENT SESSION")
          }
        })
        // QB.webrtc.onAcceptCallListener = function(session: any, userId: number, extension: object) {
        //   console.log("ACCEPTED")
        // }
        QB.webrtc.onRemoteStreamListener = function(session: any, userID: number, remoteStream: object) {
          console.log("REMOTE LISTENER")
          callSession.attachMediaStream("videoStream", remoteStream);
        }
      }
    })*/
  }

  useEffect(() => {
    (async () => {
      if (confDataState.waitingToken.length) {
        await joinToChat()
      }
    })()
  }, [confDataState.waitingToken])

  useEffect(() => {
    if (QB.chat) {
      connectToChat()
      getMessagesList()
      startVideoCall()
      QBClient()
    }
  }, [confDataState.myPersonalId])

  useEffect(() => {
    if (userToken && dialogId) {
      getSession()
    }
  }, [userToken])

  return (
    <div className="conference-wrapper">
      <VideoWrapper />
      <ChatWrapper
        getMessageValue={getMessageValue}
        sendMessage={sendMessage}
        messageToSend={messageToSend}
      />
      <Script src="https://webrtc.github.io/adapter/adapter-latest.js"/>
    </div>
  )
}
