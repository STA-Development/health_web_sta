import Image from "next/image"

interface ICallActions {
  triggerCallEnd?: () => void,
  switchAudioState?: () => void
}

export default function Consultation({ triggerCallEnd, switchAudioState }: ICallActions) {

  return (
    <div className="consultation">
      <video id="videoStream"/>
      <video id="myVideoStream"/>
      <div className="call-menu">
          <div className="call-menu__content">
            <button
              onClick={switchAudioState}
              className="button call-menu__button call-menu__button_mute"
            >
              <Image src="/mic.svg" alt="mute" width={24} height={38}/>
            </button>
            <button
              onClick={triggerCallEnd}
              className="button call-menu__button call-menu__button_end"
            >
              <Image src="/telephone.svg" alt="mute" width={32} height={32}/>
            </button>
          </div>
      </div>
    </div>
  )
}
