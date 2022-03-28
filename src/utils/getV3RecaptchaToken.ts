import {getInstance, load} from 'recaptcha-v3'
import * as Sentry from '@sentry/nextjs'
import Config from '@fh-health/utils/envWrapper'

const RECAPTCHA_KEY = Config.get('RECAPTCHA_V3_KEY')
const initiateV3Recaptcha = async () => {
  if (RECAPTCHA_KEY) {
    return load(Config.get('RECAPTCHA_V3_KEY'))
  }
  Sentry.captureException('Missing RECAPTCHA V3 KEY')
  return ''
}

const googleV3RecaptchaToken = async () => {
  if (RECAPTCHA_KEY) {
    const recaptchaInstance = getInstance()

    if (!recaptchaInstance) {
      const newRecaptchaInstance = await initiateV3Recaptcha()
      if (newRecaptchaInstance) {
        return newRecaptchaInstance.execute('submit')
      }
      Sentry.captureException('RECAPTCHA INSTANCE CREATION FAILED')
      return ''
    }
    return recaptchaInstance.execute('submit')
  }
}

export default googleV3RecaptchaToken
