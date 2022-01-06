import {load, ReCaptchaInstance} from 'recaptcha-v3'
import * as Sentry from '@sentry/nextjs'

const googleV3RecaptchaToken = async () => {
  if (process.env.RECAPTCHA_V3_KEY) {
    return load(process.env.RECAPTCHA_V3_KEY).then((recaptcha: ReCaptchaInstance) =>
      recaptcha.execute('submit'),
    )
  }
  Sentry.captureException('Missing RECAPTCHA V3 KEY')
  return ''
}

export default googleV3RecaptchaToken
