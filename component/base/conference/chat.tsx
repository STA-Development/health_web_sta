import React, { FormEvent } from "react"
import Image from "next/image"
import {UseConfDataStateValue} from "context/ConferenceContext"
import Message from "./partials/message"
import {IChatWrapper, IQBMessage} from "types/context/ConferenceContext"
import {ConferenceContextStaticData} from "static/ConferenceContextStaticData"
import ChatWrapperPreload from "./partials/chatWrapperPreload"

export default function ChatWrapper({ getMessageValue, sendMessage, messageToSend, loading }: IChatWrapper) {
    const { confDataState, setConfDataState } = UseConfDataStateValue()

    const closeMobileChat = () => {
        setConfDataState({ type: ConferenceContextStaticData.TOGGLE_CHAT_VIEW, view: false })
    }

    const handleSendMessage = (event: FormEvent) => {
        event.preventDefault()
        sendMessage()
    }

    return loading ? (
      <ChatWrapperPreload />
    ) : (
      <div className='chat-wrapper'>
          <div className='chat-wrapper__kit-info'>
              <h4>{confDataState.patientInfo.testType} ({confDataState.patientInfo.kitCode})</h4>
              <p>Patient</p>
              <h5>{confDataState.patientInfo.firstName} {confDataState.patientInfo.lastName}</h5>
          </div>
          <div className='messenger'>
              <div className='messenger__header'>
                  chat
              </div>
              <div className='messenger__header messenger__header_mobile'>
                  <div className='conference-header__logo'>
                      <Image src='/group.svg' alt='FH HEALTH' width={136} height={16}/>
                  </div>
                  <button
                    onClick={closeMobileChat}
                    className='button'
                  >
                      <Image src="/cross.svg" width={24} height={24} alt="close"/>
                  </button>
              </div>
              <div className='messenger__body'>
                  {confDataState.messages?.map((message: IQBMessage) => (
                    <Message
                      key={Math.random()}
                      messageInfo={message}
                    />
                  ))}
              </div>
              <div className='messenger__footer'>
                  <form onSubmit={handleSendMessage}>
                      <div className='button messenger__footer-button'>
                          <label htmlFor='upload'>
                              <Image src='/attach.svg' alt='upload' width={31} height={16}/>
                          </label>
                      </div>
                      <input
                        onChange={(e) => getMessageValue(e.target.value)}
                        value={messageToSend}
                        className='input messenger__footer-input'
                        placeholder='Send Message'
                        type="text"
                      />
                      <div
                        onClick={sendMessage}
                        className='button messenger__footer-button'
                      >
                          <Image src='/send.svg' alt='send' width={24} height={20}/>
                      </div>
                  </form>
              </div>
          </div>
      </div>
    )
}
