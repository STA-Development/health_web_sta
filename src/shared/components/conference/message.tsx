import React, {useEffect, useState} from 'react'
import {format} from 'date-fns'
import {UseConfDataStateValue} from '@fh-health/contexts/conferenceContext'
import {Attachment, IQBMessage} from '@fh-health/types/context/ConferenceContext'
import ImageAttachment from '@fh-health/components/conference/imageAttachment'
import FileAttachment from '@fh-health/components/conference/fileAttachement'
import VideoAttachment from '@fh-health/components/conference/videoAttachment'
import Config from '@fh-health/utils/envWrapper'
import MessageError from './messageError'

const Message = ({messageInfo}: {messageInfo: IQBMessage}) => {
  const {confDataState} = UseConfDataStateValue()
  const [isMyText, setIsMyText] = useState<boolean>(false)
  const [messageDate, setMessageDate] = useState<string>('')

  const isFileAttachment = !(
    messageInfo.attachmentType?.includes(Attachment.Video) ||
    messageInfo.attachmentType?.includes(Attachment.Image)
  )

  const messageHasAttachment =
    (messageInfo?.attachments.length && messageInfo?.attachments[0]?.uid) ||
    (messageInfo?.attachments.length && messageInfo?.attachments[0]?.id)

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

    if (new Date().getDate() === parseInt(day, 10)) {
      setMessageDate(`Today, ${time}`)
    } else if (new Date().getDate() - parseInt(day, 10) === 1) {
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
      {Config.getBool('FEATURE_ATTACHMENT_UPLOAD') && messageHasAttachment ? (
        <div>
          {isFileAttachment && (
            <FileAttachment messageInfo={messageInfo} messageDate={messageDate}>
              {isMyText && messageInfo?.hasError && (
                <MessageError text="Couldn’t Send. Click to try again." />
              )}
            </FileAttachment>
          )}
          {messageInfo.attachmentType?.includes(Attachment.Image) && (
            <ImageAttachment messageInfo={messageInfo} messageDate={messageDate}>
              {isMyText && messageInfo?.hasError && (
                <MessageError text="Couldn’t Send. Click to try again." />
              )}
            </ImageAttachment>
          )}
          {messageInfo.attachmentType?.includes(Attachment.Video) && (
            <VideoAttachment messageInfo={messageInfo} messageDate={messageDate}>
              {isMyText && messageInfo?.hasError && (
                <MessageError text="Couldn’t Send. Click to try again." />
              )}
            </VideoAttachment>
          )}
        </div>
      ) : (
        <div className="message__body">
          <span className="message_date">{messageDate}</span>
          <span className="message__text">{messageInfo?.message}</span>
          {isMyText && messageInfo?.hasError && (
            <MessageError text="Couldn’t Send. Click to try again." />
          )}
        </div>
      )}
    </div>
  )
}

export default Message
