import {useEffect, useState} from "react"
import VideoWrapper from "../../component/base/conference/video"
import ChatWrapper from "../../component/base/conference/chat"
import * as QB from "quickblox/quickblox.js"
import {QBConfig} from "../../utils/quickblox/config"
import {UseConfDataStateValue} from "../../context/ConferenceContext"
import conferenceManager from "../../manager/ConferenceManager"
import {ConferenceContextStaticData} from "../../static/ConferenceContextStaticData"
import MobileChatView from "../../component/base/conference/partials/mobileChatView"

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
      console.info("CHAT DISCONECTED")
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

    QB.chat.message.list(chatParams, function(error: object, messages: {items: []}) {
      if (error) {
        console.error(error)
      } else {
        setConfDataState({ type: ConferenceContextStaticData.SET_MESSAGES, messages: messages?.items })
      }
    })
  }

  const joinToChat = async () => {
    try {
      const confCredentials = await conferenceManager.joinToDialog(confDataState.waitingToken)
      setDialogId(confCredentials.data.data.dialogId)
      setUserToken(confCredentials.data.data.userToken)
    } catch (err) {
      console.error(err)
    }
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
      {confDataState.chatVisibility && <MobileChatView
        getMessageValue={getMessageValue}
        sendMessage={sendMessage}
        messageToSend={messageToSend}
      />}
    </div>
  )
}
