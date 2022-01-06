import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import PureBlock from '@fh-health/component/pureBlock'
import CircleLoader from '@fh-health/component/utils/circleLoader'
import testResultManager from '@fh-health/manager/testResultManager'
import {useRouter} from 'next/router'
import * as Sentry from '@sentry/nextjs'
import getV3RecaptchaToken from '@fh-health/utils/getV3RecaptchaToken'

const Verify = () => {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const {token} = router.query

  useEffect(() => {
    ;(async () => {
      try {
        const captchaToken = await getV3RecaptchaToken()
        if (captchaToken && token) {
          const response = await testResultManager.checkVerification(captchaToken, token as string)
          if (response) {
            setLoading(false)
          }
        }
      } catch (err) {
        Sentry.captureException(err)
      }
    })()
  }, [token])

  return (
    <div className="pure-block-wrapper">
      {loading ? (
        <CircleLoader className="middle-loader" />
      ) : (
        <PureBlock flow={false} center={false} isNoResults={false}>
          <div className="logo">
            <Image src="/check.svg" width={64} height={64} alt="logo" />
          </div>
          <div>
            <span className="header">Phone Number Verified!</span>
          </div>
          <div>
            <span className="message">
              Your Mobile Phone Number has been verified. Your results will be sent to you via SMS
              as soon as they are available
            </span>
          </div>
        </PureBlock>
      )}
    </div>
  )
}

export default Verify
