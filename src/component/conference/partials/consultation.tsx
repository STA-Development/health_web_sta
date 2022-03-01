import Image from 'next/image'
import React, {useState} from 'react'
import {UseConfDataStateValue} from "@fh-health/context/conferenceContext"
import ConferenceContextStaticData from "@fh-health/static/conferenceContextStaticData"

interface ICallActions {
  triggerCallEnd: () => void
  switchAudioState: () => void
}

const Consultation = ({triggerCallEnd, switchAudioState}: ICallActions) => {
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const { setConfDataState } = UseConfDataStateValue()

  const toggleAudioState = () => {
    switchAudioState()
    setIsMuted(!isMuted)
  }

  const showChat = () => {
    setConfDataState({ type: ConferenceContextStaticData.TOGGLE_CHAT_VIEW, view: true })
  }

  const endCallOnMobile = () => {
    triggerCallEnd()
    setConfDataState({
      type: ConferenceContextStaticData.TOGGLE_CHAT_VIEW,
      view: true,
    })
  }

  return (
    <div className="consultation">
      <video autoPlay id="videoStream" playsInline />
      <video autoPlay id="myVideoStream" playsInline />
      <div className="call-menu">
        <div className="call-menu__content">
          <button
            type="button"
            onClick={toggleAudioState}
            className="button call-menu__button call-menu__button_mute"
          >
            {isMuted ? (
              <Image src="/mic-off.svg" alt="mute" width={24} height={38} />
            ) : (
              <Image src="/mic-on.svg" alt="mute" width={24} height={38} />
            )}
          </button>
          <button
            type="button"
            onClick={triggerCallEnd}
            className="button call-menu__button call-menu__button_end"
          >
            <Image src="/end-call.svg" alt="mute" width={32} height={32} />
          </button>
        </div>
      </div>
      <div className="call-menu-mobile">
        <div className="call-menu-mobile__content">
          <div>
            <button
              type="button"
              onClick={showChat}
              className="button call-menu__button call-menu__button_chat call-menu__button_mobile call-menu__button_gray"
            >
              <Image src="/chat-icon.svg" alt="mute" width={24} height={24} />
            </button>
            <span>Chat</span>
          </div>
          <div>
            <button
              type="button"
              onClick={toggleAudioState}
              className="button call-menu__button call-menu__button_mute call-menu__button_mobile call-menu__button_gray"
            >
              {isMuted ? (
                <Image src="/mic-off.svg" alt="mute" width={24} height={38} />
              ) : (
                <Image src="/mic-on.svg" alt="mute" width={24} height={38} />
              )}
            </button>
            <span>Mute</span>
          </div>
          <div>
            <button
              type="button"
              onClick={endCallOnMobile}
              className="button call-menu__button call-menu__button_end call-menu__button_mobile"
            >
              <Image src="/end-call.svg" alt="mute" width={32} height={32} />
            </button>
            <span>Leave</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Consultation
