import React from "react"
import Modal from "@fh-health/component/utils/modal"
import Card from "@fh-health/component/utils/card"
import Image from "next/image"

const AllSetModal = ({ closeModal }: { closeModal: () => void }) => (
  <div className="migration-modal migration-modal_success">
    <Modal>
      <Card permissions>
        <div className="card__media card__media_sm">
          <Image src="/check.svg" alt="kit number" height={64} width={64} />
        </div>
        <div className="card__header">
          <h4 className="card__header-title">You&apos;re all set!</h4>
        </div>
        <button
          type="button"
          className="button card__button"
          onClick={closeModal}
        >
          Continue
        </button>
      </Card>
    </Modal>
  </div>
)

export default AllSetModal
