import React from 'react'
import {IChatWrapper} from '@fh-health/types/context/ConferenceContext'
import ChatWrapper from './chat'

const MobileChatView = ({
  loading,
  isUploading,
  sendMessage,
  messageToSend,
  clearMessageToSend,
  attachmentSizeError,
  handleAttachmentUpload,
}: IChatWrapper) => (
  <div className="mobile-chat">
    <ChatWrapper
      loading={loading}
      isUploading={isUploading}
      sendMessage={sendMessage}
      messageToSend={messageToSend}
      clearMessageToSend={clearMessageToSend}
      attachmentSizeError={attachmentSizeError}
      handleAttachmentUpload={handleAttachmentUpload}
    />
  </div>
)

export default MobileChatView
