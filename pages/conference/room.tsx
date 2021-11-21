import {useEffect} from "react"
import VideoWrapper from "../../component/base/conference/video";
import ChatWrapper from "../../component/base/conference/chat";
// @ts-ignore
import * as QB from 'quickblox/quickblox.js'
import { QBConfig } from "../../utils/quickblox/config"
import {UseConfDataStateValue} from "../../context/ConferenceContext"
import {IQBMessage} from "../../types/context/CnferenceContext"

export default function ConferenceRoomView() {
  const { confDataState, setConfDataState } = UseConfDataStateValue()
  const dialogId = '618d82f02878560035338175'
  const sessionToken = '3db4847ec9214ad348a03ddc9bac60b52200002b'

  const getSession = async () => {
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

  const getMessagesList = () => {
    const chatParams = {
      chat_dialog_id: dialogId,
      limit: 30,
      mark_as_read: 0,
      skip: 0,
      sort_asc: 'date_sent'
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

  useEffect(() => {
    if (QB.chat) {
      getMessagesList()
    }
  }, [confDataState.myPersonalId])

  useEffect(() => {
    QB.init(sessionToken, parseInt(`${process.env.QB_APP_ID}`), null, process.env.QB_ACCOUNT_KEY, QBConfig)
    getSession()

    // const chatParams = {
    //   chat_dialog_id: dialogId,
    //   limit: 30,
    //   mark_as_read: 0,
    //   skip: 0,
    //   sort_asc: 'date_sent'
    // }
    //
    // QB.chat.message.list(chatParams, function(error: object, messages: object) {
    //   if (error) {
    //     console.log(error)
    //   } else {
    //     console.log(messages)
    //   }
    // });

  }, [])

  return (
      <div className='conference-wrapper'>
          <VideoWrapper/>
          <ChatWrapper/>
      </div>
  )
}