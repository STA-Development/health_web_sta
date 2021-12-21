import React from "react"

const ConferenceFinalView = ({ returnHome }: {returnHome: () => void}) => (
    <div className="video-wrapper">
      <div className="video-wrapper__content network-content">
        <h4>Your Consultation Has Ended</h4>
        <p>
          Thank you for chatting with our FH Health
          <br />
          Physician today. Please book with us again soon!
        </p>
        <button
          type="button"
          onClick={returnHome} className="button video-wrapper__button"
        >
          Return to Home
        </button>
      </div>
    </div>
  )

export default ConferenceFinalView
