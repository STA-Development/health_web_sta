import React, {FormEvent, useEffect, useState} from "react"
// @ts-ignore
import * as QB from "quickblox/quickblox"
import Image from "next/image"
import {UseConfDataStateValue} from "../../../context/ConferenceContext"
import Message from "./partials/message"
import { IMessage, IQBMessage } from "../../../types/context/CnferenceContext"

interface IChatWrapper {
    getMessageValue: (value: string) => void,
    sendMessage: () => void,
    messageToSend: string
}

export default function ChatWrapper({ getMessageValue, sendMessage, messageToSend }: IChatWrapper) {
    const { confDataState, setConfDataState } = UseConfDataStateValue()
    const [messages, setMessages] = useState<IMessage[]>([])

    const closeMobileChat = () => {
        setConfDataState({
            ...confDataState,
            chatVisibility: false
        })
    }

    const handleSendMessage = (event: FormEvent) => {
        event.preventDefault()
        sendMessage()
    }

    useEffect(() => {
        const shortenedMessages = confDataState.messages?.map((messageData: IQBMessage) => {
            return {
                senderId: messageData.sender_id,
                date: messageData.created_at,
                message: messageData.message
            }
        })
        setMessages(shortenedMessages)
    }, [confDataState.messages])

    return (
      <div className='chat-wrapper'>
          <div className='chat-wrapper__kit-info'>
              <h4>FH @ Home Travel (Kit Name)</h4>
              <p>Patient</p>
              <h5>John Doe</h5>
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
                  {messages?.map((message: IMessage) => (
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
                          <input type='file' id='upload'/>
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
