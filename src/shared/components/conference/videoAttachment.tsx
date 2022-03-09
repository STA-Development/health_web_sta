import React from 'react'
import {IUploadedAttachment} from '@fh-health/types/context/ConferenceContext'

const VideoAttachment = ({children, messageInfo, messageDate}: IUploadedAttachment) => (
  <div className="message__body">
    <span className="message_date">{messageDate}</span>
    {messageInfo?.attachmentUrl && (
      <div className="message__attachment message__attachment_video">
        <video controls src={messageInfo?.attachmentUrl} />
      </div>
    )}
    {children}
  </div>
)

export default VideoAttachment
