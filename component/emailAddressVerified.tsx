import React from 'react'
import Image from 'next/image'
import Card from '@fh-health/component/utils/card'
import {useRouter} from 'next/router'

const EmailAddressVerified = () => {
  const router = useRouter()
  return (
    <div className="pure-block-wrapper">
      <div className="card-wrapper">
        <Card permissions={false}>
          <div className="card__media card__media_sm">
            <Image src="/check.svg" width={64} height={64} alt="logo" />
          </div>
          <div className="card__content">
            <h4 className="card__content-title">Email Address Verified!</h4>
            <p className="card__content-message">
              Your Email Address has been verified. Your results will be sent to you via Email as
              soon as they are available
            </p>
          </div>
          <button type="button" className="button card__button" onClick={() => router.push('/')}>
            Continue
          </button>
        </Card>
        <p className="card-wrapper__message">
          Need help? <br />
          Live Chat available on{' '}
          <a href="https://www.fhhealth.com/" className="em-link">
            fhhealth.com
          </a>
        </p>
      </div>
    </div>
  )
}

export default EmailAddressVerified
