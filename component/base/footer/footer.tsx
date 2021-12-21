import React from "react"
import Image from 'next/image'
import {UseTestResultDataStateValue} from '@fh-health/context/testResultContext'

const Footer = () => {
  const {testResultState} = UseTestResultDataStateValue()
  return (
    <div className="footer-wrapper">
      <div className="important-information">
        <p className="important-information__title">Important Information</p>
        <div
          className="content"
          dangerouslySetInnerHTML={{__html: testResultState.testResult.importantInfo}}
        />
      </div>
      <div className="doctor-info">
        <div className="doctor-info__signature">
          <Image priority src="/signage.webp" alt="signage" width="225" height="77px" />
        </div>
        <div className="doctor-info__title">
          Dr. Peter Blecher <br />
          FH Health Physician
        </div>
      </div>
      <div className="legal-notice">
        <h4 className="legal-notice__title">Legal Notice</h4>
        <div
          className="content"
          dangerouslySetInnerHTML={{__html: testResultState.testResult.legalNotes}}
        />
      </div>
    </div>
  )
}

export default Footer
