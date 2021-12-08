import Image from "next/image"
import React from "react"

export default function ChatWrapperPreload() {

  return (
    <div className='preload chat-wrapper'>
      <div className='chat-wrapper__kit-info'>
        <span className="preload__style preload__lines preload__lines_md preload__lines_width-11" />
        <p>Patient</p>
        <span className="preload__style preload__lines preload__lines_md preload__lines_width-7" />
      </div>
      <div className='messenger'>
        <div className='messenger__header'>
          chat
        </div>
        <div className='messenger__body'>
          <div className="message">
            <span className="preload__style preload__lines preload__lines_lg preload__lines_width-3" />
          </div>
          <div className="message message_me">
            <span className="preload__style preload__lines preload__lines_lg preload__lines_width-3" />
          </div>
          <div className="message">
            <span className="preload__style preload__lines preload__lines_lg preload__lines_width-3" />
          </div>
          <div className="message">
            <span className="preload__style preload__lines preload__lines_lg preload__lines_width-3" />
          </div>
          <div className="message message_me">
            <span className="preload__style preload__lines preload__lines_lg preload__lines_width-3" />
          </div>
        </div>
        <div className='messenger__footer'>
          <form>
            <div className='button messenger__footer-button'>
              <label htmlFor='upload'>
                <Image src='/attach.svg' alt='upload' width={31} height={16}/>
              </label>
            </div>
            <input
              className='input messenger__footer-input'
              placeholder='Send Message'
              type="text"
            />
            <div
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
