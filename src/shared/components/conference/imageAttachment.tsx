import React from 'react'
import {IUploadedAttachment} from '@fh-health/types/context/ConferenceContext'

const ImageAttachment = ({children, messageInfo, messageDate}: IUploadedAttachment) => (
  <div className="message__body">
    <span className="message_date">{messageDate}</span>
    {messageInfo?.attachmentUrl && (
      <div
        className="message__attachment message__attachment_image"
        style={{backgroundImage: `url(${messageInfo.attachmentUrl})`}}
      />
    )}
    {children}
  </div>
)

export default ImageAttachment
