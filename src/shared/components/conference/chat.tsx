import React, {FormEvent, useEffect, useRef, useState} from 'react'
import Image from 'next/image'
import {UseConfDataStateValue} from '@fh-health/contexts/conferenceContext'
import {IChatWrapper, IQBMessage} from '@fh-health/types/context/ConferenceContext'
import ConferenceHeader from '@fh-health/components/utils/conferenceHeader'
import CircleLoader from '@fh-health/components/utils/circleLoader'
import Message from './message'
import ChatWrapperPreload from './chatWrapperPreload'

const ChatWrapper = ({
  sendMessage,
  loading,
  isUploading,
  messageToSend,
  clearMessageToSend,
  attachmentSizeError,
  handleAttachmentUpload,
}: IChatWrapper) => {
  const {confDataState} = UseConfDataStateValue()
  const messagesListEl = useRef(null)
  const [controlledMessage, setControlledMessage] = useState<string>('')

  const handleSendMessage = (event: FormEvent) => {
    event.preventDefault()

    if (controlledMessage) {
      sendMessage()
      clearMessageToSend()
      setControlledMessage('')
    }
  }

  const attachScrollEvent = (event) => {
    const {currentTarget: target} = event
    target.scroll({top: target.scrollHeight, behavior: 'smooth'})
  }

  useEffect(() => {
    if (messagesListEl.current) {
      messagesListEl.current.addEventListener('DOMNodeInserted', attachScrollEvent, false)
    } else {
      return () =>
        messagesListEl.current.removeEeventListener('DOMNodeInserted', attachScrollEvent, false)
    }
  }, [confDataState.messages])

  return loading ? (
    <ChatWrapperPreload />
  ) : (
    <div className="chat-wrapper">
      {attachmentSizeError && (
        <div className="attachment-error">
          <p>{attachmentSizeError}</p>
        </div>
      )}
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
            <div
              className={
                process.env.ATTACHMENT_UPLOAD === 'true'
                  ? 'button messenger__footer-button'
                  : 'button messenger__footer-button messenger__footer-button_disabled'
              }
            >
              <label htmlFor="upload">
                <Image src="/attach.svg" alt="upload" width={31} height={16} />
                <input
                  type="file"
                  id="upload"
                  accept="image/gif, image/jpeg, image/vnd.sealedmedia.softseal.jpg, video/*, image/png, text/*, application/vnd.sealed.doc, application/pdf, application/vnd.sealed.xls, application/zip, audio/opus, image/heic"
                  onChange={(e) => handleAttachmentUpload(e)}
                />
              </label>
            </div>
            <input
              ref={messageToSend}
              onChange={(event) => setControlledMessage(event.target.value)}
              className="input messenger__footer-input"
              placeholder="Send Message"
              type="text"
            />
            <div
              onClick={handleSendMessage}
              className={
                controlledMessage
                  ? 'button messenger__footer-button'
                  : 'button messenger__footer-button messenger__footer-button_disabled'
              }
            >
              <Image src="/send.svg" alt="send" width={24} height={20} />
            </div>
          </form>
        </div>
      </div>
      {isUploading && (
        <div className="attachment-preload">
          <CircleLoader className="middle-loader" />
        </div>
      )}
    </div>
  )
}

export default ChatWrapper
