import React, {useEffect, useState} from 'react'
import Modal from '@fh-health/components/utils/modal'
import Card from '@fh-health/components/utils/card'
import Image from 'next/image'
import {UseConfDataStateValue} from '@fh-health/contexts/conferenceContext'

const MobileFinalViewModal = () => {
  const {confDataState} = UseConfDataStateValue()
  const [mobileModalView, setMobileModalView] = useState<boolean>(false)

  const closeModal = () => setMobileModalView(false)

  useEffect(() => {
    if (confDataState.consultationFlow.isConferenceEnded) {
      setMobileModalView(true)
    }
  }, [confDataState.consultationFlow.isConferenceEnded])

  return (
    <div
      className={
        mobileModalView ? 'chat-wrapper-modal chat-wrapper-modal_visible' : 'chat-wrapper-modal'
      }
    >
      <Modal>
        <Card permissions={false}>
          <button type="button" onClick={closeModal} className="button card__close">
            <Image src="/cross.svg" width={24} height={24} alt="close" />
          </button>
          <div className="card__content">
            <h4 className="card__content-title">Your Consultation Has Ended</h4>
            <p className="card__content-message">
              Thank you for chatting with our FH Health
              <br />
              Physician today. Please book with us
              <br />
              again soon!
            </p>
          </div>
          <button type="button" onClick={closeModal} className="button card__button">
            Close
          </button>
        </Card>
      </Modal>
    </div>
  )
}

export default MobileFinalViewModal
