import React from 'react'
import Image from 'next/image'
import {UseTestResultDataStateValue} from '@fh-health/contexts/testResultContext'

const Footer = (isPublicUser: {isPublicUser?: boolean}) => {
  const {testResultState} = UseTestResultDataStateValue()

  return (
    <div className="testResult-footer">
      <div className="important-information">
        <p className="important-information__title">Important Information</p>
        <div
          className="important-information__content"
          dangerouslySetInnerHTML={{__html: testResultState.testResult.importantInfo}}
        />
      </div>
      <div className="doctor-info">
        <div className="doctor-info__signature">
          <Image priority src="/signage.webp" alt="signage" width="225" height="77px" />
          <div className="doctor-info__title">
            Dr. Peter Blecher <br />
            FH Health Physician
          </div>
        </div>
        {isPublicUser && testResultState.testResult.couponCode && (
          <>
            <div className="coupon-info">
              <p>Book now and use coupon code:</p>
              <div className="coupon-info__wrapper">
                <div className="coupon-info__code">{testResultState.testResult.couponCode}</div>
                <div className="coupon-info__button">
                  <a
                    target="_blank"
                    href={`${process.env.ACUITY_BOOKINGURL}&certificate=${testResultState.testResult.couponCode}`}
                    rel="noreferrer noopener"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </div>
            <div className="coupon-info coupon-info_mobile">
              <p>Book now and use coupon code:</p>
              <div className="coupon-info__wrapper">
                <div className="coupon-info__code">{testResultState.testResult.couponCode}</div>
                <div className="coupon-info__button">
                  <a
                    target="_blank"
                    href={`${process.env.ACUITY_BOOKINGURL}&certificate=${testResultState.testResult.couponCode}`}
                    rel="noreferrer noopener"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div
        className={`legal-notice ${
          testResultState.testResult.couponCode ? 'legal-notice_coupon-exists' : ''
        }`}
      >
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
