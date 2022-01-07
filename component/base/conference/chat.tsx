import React, {FormEvent, useEffect, useRef} from "react"
import Image from 'next/image'
import {UseConfDataStateValue} from '@fh-health/context/conferenceContext'
import {IChatWrapper, IQBMessage} from '@fh-health/types/context/ConferenceContext'
import ConferenceHeader from "@fh-health/component/utils/conferenceHeader"
import Message from './partials/message'
import ChatWrapperPreload from './partials/chatWrapperPreload'

const ChatWrapper = ({
  sendMessage,
  loading,
  messageToSend,
  clearMessageToSend
}: IChatWrapper) => {
  const { confDataState } = UseConfDataStateValue()
  const messagesListEl = useRef(null)

  const handleSendMessage = (event: FormEvent) => {
    event.preventDefault()
    sendMessage()
    clearMessageToSend()
  }

  const attachScrollEvent = (event) => {
    const { currentTarget: target } = event
    target.scroll({ top: target.scrollHeight, behavior: "smooth" })
  }

  useEffect(() => {
    if (messagesListEl.current) {
      messagesListEl.current.addEventListener("DOMNodeInserted", attachScrollEvent, false)
    } else {
      return () => messagesListEl.current.removeEeventListener("DOMNodeInserted", attachScrollEvent, false)
    }
  }, [confDataState.messages])

  return loading ? (
    <ChatWrapperPreload />
  ) : (
    <div className="chat-wrapper">
      <div className="chat-wrapper__kit-info">
        <h4>
          {confDataState.patientInfo.testType} ({confDataState.patientInfo.kitCode})
        </h4>
        <p>Patient</p>
        <h5>
          {confDataState.patientInfo.firstName} {confDataState.patientInfo.lastName}
        </h5>
      </div>
      <div className="messenger">
        <div className="messenger__header">chat</div>
        <ConferenceHeader isMobile />
        <div ref={messagesListEl} className="messenger__body">
          {confDataState.messages?.map((message: IQBMessage, index: number) => (
            <Message key={index} messageInfo={message} />
          ))}
        </div>
        <div className="messenger__footer">
          <form onSubmit={handleSendMessage}>
            <div className="button messenger__footer-button">
              <label htmlFor="upload">
                <Image src="/attach.svg" alt="upload" width={31} height={16} />
                <input type="file" id="upload" />
              </label>
            </div>
            <input
              ref={messageToSend}
              className="input messenger__footer-input"
              placeholder="Send Message"
              type="text"
            />
            <div onClick={handleSendMessage} className="button messenger__footer-button">
              <Image src="/send.svg" alt="send" width={24} height={20} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChatWrapper
