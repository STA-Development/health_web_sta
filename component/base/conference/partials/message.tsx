import {useEffect, useState} from "react"
import {UseConfDataStateValue} from "../../../../context/ConferenceContext"
import { IMessage } from "../../../../types/context/ConferenceContext"

export default function Message({ messageInfo }: { messageInfo?: IMessage }) {

  const { confDataState } = UseConfDataStateValue()
  const [isMyText, setIsMyText] = useState<boolean>(false)
  const [messageDate, setMessageDate] = useState<string>('')

  const compareSenderIds = () => {
    if (messageInfo?.senderId === confDataState.myPersonalId) {
      setIsMyText(true)
    } else {
      setIsMyText(false)
    }
  }

  const formatDate = () => {
    const date = new Date(`${messageInfo?.date}`)
    const alteredDate = date.toLocaleString()
    const time = alteredDate.split(',')[1]
    const day = alteredDate.split(',')[0].split('/')[1]

    if (new Date().getDate() === parseInt(day)) {
      setMessageDate(`Today, ${time}`)
    } else if (new Date().getDate() - parseInt(day) === 1) {
      setMessageDate(`Yesterday, ${time}`)
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
      </div>
    </div>
  )
}
