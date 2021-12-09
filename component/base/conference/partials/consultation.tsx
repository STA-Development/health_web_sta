import Image from "next/image"
import {useState} from "react"
import {UseConfDataStateValue} from "context/ConferenceContext"
import {ConferenceContextStaticData} from "static/ConferenceContextStaticData"

interface ICallActions {
  triggerCallEnd: () => void,
  switchAudioState: () => void
}

export default function Consultation({ triggerCallEnd, switchAudioState }: ICallActions) {
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const { confDataState, setConfDataState } = UseConfDataStateValue()

  const toggleAudioState = () => {
    switchAudioState()
    setIsMuted(!isMuted)
  }

  const showChat = () => {
    setConfDataState({ type: ConferenceContextStaticData.TOGGLE_CHAT_VIEW, view: true })
  }

  return (
    <div className="consultation">
      <video id="videoStream"/>
      <video id="myVideoStream"/>
      <div className="call-menu">
          <div className="call-menu__content">
            <button
              onClick={toggleAudioState}
              className="button call-menu__button call-menu__button_mute"
            >
              {
                isMuted ? <Image src="/mic-off.svg" alt="mute" width={24} height={38}/> :
                  <Image src="/mic-on.svg" alt="mute" width={24} height={38}/>
              }
            </button>
            <button
              onClick={triggerCallEnd}
              className="button call-menu__button call-menu__button_end"
            >
              <Image src="/end-call.svg" alt="mute" width={32} height={32}/>
            </button>
          </div>
      </div>
      <div className="call-menu-mobile">
        <div className="call-menu-mobile__content">
          <div>
            <button
              onClick={showChat}
              className="button call-menu__button call-menu__button_chat call-menu__button_mobile call-menu__button_gray"
            >
              <Image src="/chat-icon.svg" alt="mute" width={24} height={24}/>
            </button>
            <span>Chat</span>
          </div>
          <div>
            <button
              onClick={toggleAudioState}
              className="button call-menu__button call-menu__button_mute call-menu__button_mobile call-menu__button_gray"
            >
              {
                isMuted ? <Image src="/mic-off.svg" alt="mute" width={24} height={38}/> :
                  <Image src="/mic-on.svg" alt="mute" width={24} height={38}/>
              }
            </button>
            <span>Mute</span>
          </div>
          <div>
            <button
              onClick={triggerCallEnd}
              className="button call-menu__button call-menu__button_end call-menu__button_mobile"
            >
              <Image src="/end-call.svg" alt="mute" width={32} height={32}/>
            </button>
            <span>Leave</span>
          </div>
        </div>
      </div>
    </div>
  )
}
