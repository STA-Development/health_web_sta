import Image from "next/image"
import {useState} from "react"

interface ICallActions {
  triggerCallEnd: () => void,
  switchAudioState: () => void
}

export default function Consultation({ triggerCallEnd, switchAudioState }: ICallActions) {
  const [isMuted, setIsMuted] = useState<boolean>(false)

  const toggleAudioState = () => {
    switchAudioState()
    setIsMuted(!isMuted)
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
    </div>
  )
}
