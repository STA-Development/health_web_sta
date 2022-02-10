import React from 'react'
import Modal from '@fh-health/component/utils/modal'
import Card from '@fh-health/component/utils/card'
import Image from 'next/image'
import doesObjectContainFalsyValue from '@fh-health/utils/falsyValuesOfObject'
import useMediaPermissions from "@fh-health/hooks/mediaHook"

const PermissionsModal = ({ closeModal, openDenyModal }: {closeModal: () => void, openDenyModal: () => void}) => {
  const {checkedItems, updateVideoCheckboxValue, updateAudioCheckboxValue} = useMediaPermissions()

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
              onClick={updateVideoCheckboxValue}
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
              onClick={updateAudioCheckboxValue}
            />
          </div>
        </div>
        <button
          type="button"
          className={`button card__button ${
            doesObjectContainFalsyValue(checkedItems) ? 'button_disabled card__button_disabled' : ''
          }`}
          onClick={handleMediaAcceptance}
        >
          Return to Waiting Room
        </button>
      </Card>
    </Modal>
  )
}

export default PermissionsModal
