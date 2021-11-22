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
  const dialogId = '616708512878560019334225'
  const sessionToken = '91bed4578a7622cd4b9432c3a895a428b200002b'

  const getSession = () => {
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
      limit: 0,
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
  }, [])

  return (
      <div className='conference-wrapper'>
          <VideoWrapper/>
          <ChatWrapper />
      </div>
  )
}