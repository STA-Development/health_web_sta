import {useEffect, useState} from "react"
import {UseConfDataStateValue} from "../../../../context/ConferenceContext"
import { IQBMessage } from "../../../../types/context/ConferenceContext"
import MessageError from "./messageError"

export default function Message({ messageInfo }: { messageInfo?: IQBMessage }) {

  const { confDataState } = UseConfDataStateValue()
  const [isMyText, setIsMyText] = useState<boolean>(false)
  const [messageDate, setMessageDate] = useState<string>('')

  const compareSenderIds = () => {
    if (messageInfo?.sender_id === confDataState.myPersonalId) {
      setIsMyText(true)
    } else {
      setIsMyText(false)
    }
  }

  const formatDate = () => {
    const date = new Date(`${messageInfo?.created_at}`)
    const alteredDate = date.toLocaleString()
    const time = alteredDate.split(',')[1]
    const day = alteredDate.split(',')[0].split('/')[1]

    if (new Date().getDate() === parseInt(day)) {
      setMessageDate(`Today, ${time.split(' ')[1].split(':').slice(0, 2).join(':')} ${time.split(' ')[2]}`)
    } else if (new Date().getDate() - parseInt(day) === 1) {
      setMessageDate(`Yesterday, ${time.split(' ')[1].split(':').slice(0, 2).join(':')} ${time.split(' ')[2]}`)
    } else {
      setMessageDate(alteredDate)
    }
  }

  useEffect(() => {
    compareSenderIds()
    formatDate()
  }, [])

  return (
    <div className={isMyText ? 'message message_me' : 'message'}>
      <div className="message__body">
        <span className="message_date">{messageDate}</span>
        <span className="message__text">{messageInfo?.message}</span>
        {isMyText && messageInfo?.hasError && <MessageError text="Couldn’t Send. Click to try again." />}
      </div>
    </div>
  )
}
