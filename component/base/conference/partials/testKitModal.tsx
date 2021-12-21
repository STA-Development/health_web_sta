import React from "react"
import Image from 'next/image'
import Modal from '@fh-health/component/utils/modal'
import Card from '@fh-health/component/utils/card'

const KitNumberModal = ({ closeModal }: { closeModal: () => void }) => (
    <Modal>
      <Card permissions={false}>
        <button
          type="button"
          onClick={closeModal} className="button card__close"
        >
          <Image src="/cross.svg" width={24} height={24} alt="close" />
        </button>
        <div className="card__media card__media_with-bg">
          <Image src="/kit-number-preview.svg" width={51} height={51} alt="Kit Number" />
        </div>
        <div className="card__content">
          <h4 className="card__content-title">Locate Kit Number</h4>
          <p className="card__content-message">
            To find your kit number, please look at the card in your kit that says “Test Kit
            Number”.
          </p>
        </div>
        <button
          type="button"
          onClick={closeModal}
          className="button card__button"
        >
          Ok
        </button>
      </Card>
    </Modal>
  )

export default KitNumberModal
