import {useEffect, useState} from 'react'
import Image from 'next/image'
import PureBlock from '@fh-health/component/pureBlock'
import CircleLoader from '@fh-health/component/utils/CircleLoader'
import {load, ReCaptchaInstance} from 'recaptcha-v3'
import testResultManager from '@fh-health/manager/TestResultManager'
import {useRouter} from 'next/router'
import * as Sentry from '@sentry/nextjs'

export default function Verify() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const {token} = router.query

  const getRecaptcha = async () => {
    const captchaToken = process.env.RECAPTCHA_V3_KEY
    if (captchaToken) {
      return await load(captchaToken as string).then((recaptcha: ReCaptchaInstance) =>
        recaptcha.execute('submit'),
      )
    }
    console.error('Captcha token is undefined')
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
        <PureBlock flow={false}>
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
