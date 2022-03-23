import CircleLoader from '@fh-health/components/utils/circleLoader'
import React, {useEffect, useState} from 'react'
import Card from '@fh-health/components/utils/card'
import Image from 'next/image'
import {useRouter} from 'next/router'
import * as Sentry from '@sentry/nextjs'
import {AxiosResponse} from 'axios'
import googleV3RecaptchaToken from '@fh-health/utils/getV3RecaptchaToken'
import testResultManager from '@fh-health/manager/testResultManager'

const Verify = () => {
  const router = useRouter()
  const {query} = router
  const {token} = query
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isVerified, setIsVerified] = useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      if (token && typeof token === 'string') {
        try {
          const recaptchaToken = await googleV3RecaptchaToken()
          const {data}: AxiosResponse = await testResultManager.checkVerification(
            recaptchaToken,
            token,
          )
          if (data?.data?.isVerified?.status) {
            setIsVerified(data.data.isVerified.status)
          }
          setIsLoading(false)
        } catch (err) {
          Sentry.captureException(err)
          setIsVerified(false)
          setIsLoading(false)
        }
      }
    })()
  }, [token])

  const handleContinueClick = () => {
    router.push('/auth/login')
  }

  if (isLoading || !token) {
    if (!token) {
      return
    }

    return (
      <div className="pure-block-wrapper">
        <CircleLoader className="middle-loader" />
      </div>
    )
  }

  return (
    <div className="pure-block-wrapper">
      <main>
        <div className="card-wrapper">
          <Card permissions={false}>
            <div className="card__media card__media_sm">
              <Image
                src={isVerified ? '/check.svg' : '/error-cross.svg'}
                alt="check"
                height={64}
                width={64}
              />
            </div>
            <div className="card__content">
              <h4 className="card__content-title">
                {isVerified ? 'Phone Number Verified!' : 'Access Code Expired'}
              </h4>
              <p className="card__content-message">
                {isVerified
                  ? 'Your Mobile Phone Number has been verified. Your results will be sent to you via SMS assoon as they are available'
                  : 'QR code link has expired. Please contact us through the chat or fhhealth.com for any questions or concerns.'}
              </p>
            </div>
            {isVerified && (
              <button type="button" className="button card__button" onClick={handleContinueClick}>
                Continue
              </button>
            )}
          </Card>
          <p className="card-wrapper__message">
            Need help? <br />
            Live Chat available on{' '}
            <a href="https://www.fhhealth.com/" className="em-link">
              fhhealth.com
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}

export default Verify
