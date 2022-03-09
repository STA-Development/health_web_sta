import React from 'react'
import {IChatWrapper} from '@fh-health/types/context/ConferenceContext'
import ChatWrapper from './chat'

const MobileChatView = ({
  loading,
  sendMessage,
  messageToSend,
  clearMessageToSend,
  handleAttachmentUpload,
  isUploading,
}: IChatWrapper) => (
  <div className="mobile-chat">
    <ChatWrapper
      loading={loading}
      isUploading={isUploading}
      sendMessage={sendMessage}
      messageToSend={messageToSend}
      clearMessageToSend={clearMessageToSend}
      handleAttachmentUpload={handleAttachmentUpload}
    />
  </div>
)

export default MobileChatView
