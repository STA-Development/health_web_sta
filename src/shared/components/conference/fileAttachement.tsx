import React from 'react'
import Image from 'next/image'
import {IUploadedAttachment} from '@fh-health/types/context/ConferenceContext'

const FileAttachment = ({children, messageDate, messageInfo}: IUploadedAttachment) => (
  <div className="message__body">
    <span className="message_date">{messageDate}</span>
    <span className="message__text message__text_attachment">
      <Image src="/attach.svg" width={45} height={25} />
      <a target="_blank" rel="noreferrer noopener" href={messageInfo.attachmentUrl}>
        {messageInfo.attachments[0]?.name || 'Download'}
      </a>
    </span>
    {children}
  </div>
)

export default FileAttachment
