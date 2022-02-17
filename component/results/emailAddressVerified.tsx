import React from 'react'
import Image from 'next/image'
import Card from '@fh-health/component/utils/card'
import {useRouter} from 'next/router'
import {useDispatch} from 'react-redux'
import {updatePatientInformation} from '@fh-health/redux/state/auth/patientInformationSlice'
import {getPatientInformation} from '@fh-health/component/base/authChecker'

const EmailAddressVerified = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const handleEmailVerifiedClick = async () => {
    const data = await getPatientInformation()
    dispatch(
      updatePatientInformation({
        ...data,
        isEmailVerified: true,
      }),
    )
    if (data?.migrationRequired) {
      router.push('/migration')
    } else {
      router.push('/results/list')
    }
  }

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
          <button
            type="button"
            className="button card__button"
            onClick={() => handleEmailVerifiedClick()}
          >
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
