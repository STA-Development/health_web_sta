import React from "react"
import Modal from "@fh-health/component/utils/modal"
import Card from "@fh-health/component/utils/card"

const MigrationInitialModal = ({ closeModal }: { closeModal: () => void }) => (
  <div className="migration-modal">
    <Modal>
      <Card permissions>
        <div className="card__header">
          <h4 className="card__header-title">Migrate Your Results</h4>
          <p className="card__header-message">
            Looks like you have used our services before. We&apos;ll need your help to migrate the existing results.
          </p>
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

export default MigrationInitialModal
