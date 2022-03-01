import React, {useState} from "react"
import Modal from "@fh-health/component/utils/modal"
import Card from "@fh-health/component/utils/card"

const PermissionsDenyModal = () => {
  const [refreshModalView, setRefreshModalView] = useState(false);

  const handlePageRefresh = () => {
    window.location.reload()
  }

  const showRefreshModalView = () => {
    setRefreshModalView(true)
  }

  return (
    <Modal>
      {
        refreshModalView ? (
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
        ) : (
          <Card permissions>
            <div className="card__header">
              <h4 className="card__header-title">Denied Access</h4>
              <p className="card__header-message">
                Gain full access to camera and microphone
                <br/>
                permissions through browser settings.
              </p>
            </div>
            <div className="card__content card__content_settings card__content-info">
              <p className="card__content-info__title">
                Follow these steps to recover camera and microphone permissions:
              </p>
              <ol className="card__content-info__list">
                <li>Open Site settings through browser settings.</li>
                <li>Under site settings, locate Permissions and select both Camera and Microphone.</li>
                <li>Make sure the browser is enabled to allow to ask for permissions</li>
                <li>If the permission window does not appear again, locate “FH Health” under blocked site listings and select “allow”.</li>
                <li>Once permissions are granted, select “Return to Waiting Room” button to continue your consultation.</li>
              </ol>
            </div>
            <button
              type="button"
              className="button card__button"
              onClick={showRefreshModalView}
            >
              Try Again
            </button>
          </Card>
        )
      }
    </Modal>
  )
}

export default PermissionsDenyModal
