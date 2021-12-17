import Modal from '@fh-health/component/utils/Modal'
import Card from '@fh-health/component/utils/Card'
import Image from 'next/image'
import {useState} from 'react'
import {doesObjectContainFalsyValue} from '@fh-health/utils/falsyValuesOfObject'

interface IMediaTypes {
  audio: boolean
  video: boolean
}
export default function PermissionsModal({ closeModal, openDenyModal }: {closeModal: () => void, openDenyModal: () => void}) {
  const [checkedItems, setCheckedItems] = useState<IMediaTypes>({
    audio: false,
    video: false,
  })
  const updateMediaCheckboxValue = (updatedMedia: string) => {
    if (updatedMedia === 'video') {
      setCheckedItems({...checkedItems, video: !checkedItems.video})
    } else {
      setCheckedItems({...checkedItems, audio: !checkedItems.audio})
    }
  }


  const handleMediaAcceptance = () => {
    const nav: any = window.navigator
    nav.getUserMedia(
      {
        audio: true,
        video: true,
      },
      (stream) => {
        stream.getTracks().forEach((x) => x.stop())
        if (stream.id) {
          closeModal()
        }
      },
      (err) => {
        console.error(err)
        closeModal()
        openDenyModal()
      },
    )
  }

  return (
    <Modal>
      <Card permissions>
        <div className="card__header">
          <h4 className="card__header-title">Permissions</h4>
          <p className="card__header-message">
            In order to participate in your appointments, we’ll need you to allow the following:
          </p>
        </div>
        <div className="card__content">
          <div className="card__content__item">
            <Image src="/camera.svg" width={40} height={40} alt="camera" />
            <div className="card__content__item-details">
              <h4>Camera</h4>
              <p>So your provider can see you</p>
            </div>
            <div
              className={`checkbox-circle ${checkedItems.video ? 'checkbox-circle_active' : ''}`}
              onClick={() => updateMediaCheckboxValue('video')}
            />
          </div>
          <div className="card__content__item">
            <Image src="/mic.svg" width={40} height={40} alt="microphone" />
            <div className="card__content__item-details">
              <h4>Microphone</h4>
              <p>So your provider can hear you</p>
            </div>
            <div
              className={`checkbox-circle ${checkedItems.audio ? 'checkbox-circle_active' : ''}`}
              onClick={() => updateMediaCheckboxValue('audio')}
            />
          </div>
        </div>
        <button
          className={`button card__button ${
            doesObjectContainFalsyValue(checkedItems) ? 'button_disabled' : ''
          }`}
          onClick={handleMediaAcceptance}
        >
          Return to Waiting Room
        </button>
      </Card>
    </Modal>
  )
}
