import React from "react"
import {IChatWrapper} from '@fh-health/types/context/ConferenceContext'
import ChatWrapper from '../chat'

const MobileChatView = ({loading, sendMessage, messageToSend, clearMessageToSend}: IChatWrapper) => (
    <div className="mobile-chat">
      <ChatWrapper
        loading={loading}
        sendMessage={sendMessage}
        messageToSend={messageToSend}
        clearMessageToSend={clearMessageToSend}
      />
    </div>
  )


export default MobileChatView