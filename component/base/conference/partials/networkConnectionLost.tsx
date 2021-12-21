import React from "react"
import NetworkIcon from '../icon/networkIcon'

const NetworkConnectionLost = ({ retry }: {retry: () => void}) => (
  <div className="video-wrapper">
    <div className="video-wrapper__content network-content">
      <NetworkIcon />
      <h4>Cannot Connect to a Local Network</h4>
      <p>
        No Internet connection. Make sure Wi-Fi or
        <br />
        Cellular data is turned on, then try again.
      </p>
      <button
        type="button"
        onClick={retry}
        className="button video-wrapper__button"
      >
        Retry
      </button>
    </div>
  </div>
)

export default NetworkConnectionLost
