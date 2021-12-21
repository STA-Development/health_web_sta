import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import PureBlock from '@fh-health/component/pureBlock'
import CircleLoader from '@fh-health/component/utils/circleLoader'
import {load, ReCaptchaInstance} from 'recaptcha-v3'
import testResultManager from '@fh-health/manager/testResultManager'
import {useRouter} from 'next/router'
import * as Sentry from '@sentry/nextjs'

const Verify = () => {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const {token} = router.query

  const getRecaptcha = async () => {
    try {
      const captchaToken = process.env.RECAPTCHA_V3_KEY
      if (captchaToken) {
        return await load(captchaToken as string).then((recaptcha: ReCaptchaInstance) =>
          recaptcha.execute('submit'),
        )
      }
    } catch (err) {
      console.error('Captcha token is undefined', err)
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        const captchaToken = await getRecaptcha()
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
