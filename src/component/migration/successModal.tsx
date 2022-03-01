import React from "react"
import Modal from "@fh-health/component/utils/modal"
import Card from "@fh-health/component/utils/card"
import Image from "next/image"

const SuccessModal = ({ closeModal, firstName }: { closeModal: () => void, firstName: string }) => (
  <div className="migration-modal migration-modal_success">
    <Modal>
      <Card permissions>
        <div className="card__media card__media_sm">
          <Image src="/check.svg" alt="kit number" height={64} width={64} />
        </div>
        <div className="card__header">
          <h4 className="card__header-title">Success!</h4>
          <p className="card__header-message">
            Added {firstName} as a new Dependent/Family/Friend
          </p>
        </div>
        <button
          type="button"
          className="button card__button"
          onClick={closeModal}
        >
          Ok
        </button>
      </Card>
    </Modal>
  </div>
)

export default SuccessModal
