import React from "react"
import Modal from "@fh-health/component/utils/modal"
import Card from "@fh-health/component/utils/card"

const PermissionDenyModal = () => {
  const handlePageRefresh = () => {
    window.location.reload()
  }

  return (
    <Modal>
      <Card permissions>
        <div className="card__header">
          <h4 className="card__header-title">Denied Access</h4>
          <p className="card__header-message">
            Recover camera and microphone
            <br/>
            permissions to continue your consultation.
          </p>
        </div>
        <div className="card__content card__content-info">
          <p className="card__content-info__title">
            Follow these steps to recover camera and microphone permissions:
          </p>
          <ol className="card__content-info__list">
            <li>Tap “Refresh” Button to refresh your browser </li>
            <li>Select “Allow” access to both your camera and microphone permissions </li>
            <li>Once permissions are granted, select “Return to Waiting Room” button to return back to your consultation.</li>
          </ol>
        </div>
        <button
          type="button"
          className="button card__button"
          onClick={handlePageRefresh}
        >
          Refresh
        </button>
      </Card>
    </Modal>
  )
}

export default PermissionDenyModal
