import {useEffect, useState} from "react"
import {UseConfDataStateValue} from "../../../../context/ConferenceContext"
import { IMessage } from "../../../../types/context/CnferenceContext"

export default function Message({ messageInfo }: { messageInfo?: IMessage }) {

  const { confDataState } = UseConfDataStateValue()
  const [isMyText, setIsMyText] = useState<boolean>(false);

  const compareSenderIds = () => {
    if (messageInfo?.senderId === confDataState.myPersonalId) {
      setIsMyText(true)
    } else {
      setIsMyText(false)
    }
  }

  useEffect(() => {
    compareSenderIds()
  }, [])

  return (
    <div className={isMyText ? 'message message_me' : 'message'}>
      <div className="message__body">
        <span className="message_date">{messageInfo?.date}</span>
        <span className={isMyText ? 'message__text message__text_me' : 'message__text'}>{messageInfo?.message}</span>
      </div>
    </div>
  )
}
