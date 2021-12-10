import {useEffect, useState} from 'react'
import {format} from 'date-fns'
import {UseConfDataStateValue} from '@fh-health/context/ConferenceContext'
import {IQBMessage} from 'types/context/ConferenceContext'
import MessageError from './messageError'

export default function Message({messageInfo}: {messageInfo?: IQBMessage}) {
  const {confDataState} = UseConfDataStateValue()
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
    const time = format(date, "hh:mmaaaaa'm'")
    const day = format(date, 'dd-MM-yyyy').split('-')[0]

    if (new Date().getDate() === parseInt(day)) {
      setMessageDate(`Today, ${time}`)
    } else if (new Date().getDate() - parseInt(day) === 1) {
      setMessageDate(`Yesterday, ${time}`)
    } else {
      setMessageDate(date.toLocaleString())
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
        {isMyText && messageInfo?.hasError && (
          <MessageError text="Couldn’t Send. Click to try again." />
        )}
      </div>
    </div>
  )
}
