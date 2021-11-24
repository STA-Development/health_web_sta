import {useEffect, useState} from "react"
import VideoWrapper from "../../component/base/conference/video";
import ChatWrapper from "../../component/base/conference/chat";
// @ts-ignore
import * as QB from 'quickblox/quickblox.js'
import { QBConfig } from "../../utils/quickblox/config"
import {UseConfDataStateValue} from "../../context/ConferenceContext"
import {IQBMessage} from "../../types/context/CnferenceContext"
import {load, ReCaptchaInstance} from "recaptcha-v3"
const kitCode = 'OZC5JK'

export default function ConferenceRoomView() {
  const { confDataState, setConfDataState } = UseConfDataStateValue()
  const [dialogId, setDialogId] = useState<string>('')
  const [userToken, setUserToken] = useState<string>('')
  const [messageToSend, setMessageToSend] = useState<string>('')

  const getRecaptcha = async () => {
    const captchaToken = process.env.RECAPTCHA_V3_KEY
    if (captchaToken) {
      return await load(captchaToken as string).then((recaptcha: ReCaptchaInstance) => {
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
    console.log(userToken)
    QB.init(userToken, parseInt(`${process.env.QB_APP_ID}`), null, process.env.QB_ACCOUNT_KEY, QBConfig)
    QB.getSession(function(error: object, { session }: { session: { user_id: number } }) {
      if (error) {
        console.log(error)
      } else {
        setConfDataState({
          ...confDataState,
          myPersonalId: session.user_id
        })
      }
    })
  }

  const connectToChat = () => {
    const userId = QB.chat.helpers.getUserJid(confDataState.myPersonalId, parseInt(`${process.env.APP_ID}`))
    const dialogJid = QB.chat.helpers.getRoomJidFromDialogId(dialogId)
    const userCredentials = {
      jid: userId,
      password: userToken
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
        });
      } catch (e) {
        if (e.name === 'ChatNotConnectedError') {
          console.log("CHAT NOT CONNECTED")
        }
      }

      function onMessage(userId: number, message: { body: string }) {
        getMessagesList()
        console.log(message, "UPCOMING MESSAGE")
      }

      QB.chat.onMessageListener = onMessage;
    });

    QB.chat.onDisconnectedListener = () => {
      console.log("CHAT DISCONECTED")
    };
  }

  const sendMessage = () => {
    setMessageToSend('')
    const message = {
      type: "groupchat",
      body: messageToSend,
      extension: {
        save_to_history: 1,
        dialog_id: dialogId
      },
      markable: 1
    }

    const dialogJid = QB.chat.helpers.getRoomJidFromDialogId(dialogId)
    try {
      QB.chat.send(dialogJid, message)
      getMessagesList()
    } catch (e) {
      if (e.name === 'ChatNotConnectedError') {
        console.log(e, 'ON_SEND_ERROR')
      }
    }
  }

  const getMessagesList = () => {
    const chatParams = {
      chat_dialog_id: dialogId,
      limit: 0,
      mark_as_read: 0,
      skip: 0
    }

    QB.chat.message.list(chatParams, function(error: object, messages: { items: IQBMessage[] }) {
      if (error) {
        console.log(error)
      } else {
        setConfDataState({
          ...confDataState,
          messages: messages?.items
        })
      }
    });
  }

  /*const getData = async () => {
    const captchaToken = await getRecaptcha()
    try {
      const result = await conferenceManager.getWaitingToken(captchaToken, kitCode)
      const waitingToken = result.data.data.waitingToken
      console.log(waitingToken, 'W-TOKEN')
      if (waitingToken) {
        const confCredentials = await conferenceManager.getConferenceCredentials(waitingToken)
        setDialogId(confCredentials.data.data.dialogId)
        setUserToken(confCredentials.data.data.userToken)
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    (async () => {
      await getData()
    })()
  }, [])*/

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
    <div className='conference-wrapper'>
      <VideoWrapper/>
      <ChatWrapper
        getMessageValue={getMessageValue}
        sendMessage={sendMessage}
        messageToSend={messageToSend}
      />
    </div>
  )
}
