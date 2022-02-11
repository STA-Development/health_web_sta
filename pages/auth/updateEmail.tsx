import React, {useEffect, useState} from 'react'
import PureBlock from '@fh-health/component/results/pureBlock'
import Image from 'next/image'
import CircleLoader from '@fh-health/component/utils/circleLoader'
import * as Sentry from '@sentry/nextjs'
import authManager from '@fh-health/manager/authManager'
import {UseAuthDataStateValue} from '@fh-health/context/authContext'
import AuthContextStaticData from '@fh-health/static/authContextStaticData'
import {useRouter} from 'next/router'
import useEmailValidation from '@fh-health/hooks/emailValidationHook'

const UpdateEmail = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const router = useRouter()
  const {authDataState, setAuthDataState} = UseAuthDataStateValue()
  const {email, isEmailValidated, validateEmail} = useEmailValidation()

  const handleEmailUpdate = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await authManager.updateUserEmail(email)
      if (response?.data?.data) {
        setAuthDataState({
          type: AuthContextStaticData.UPDATE_PATIENT_ACCOUNT_INFORMATION,
          patientAccountInformation: response.data.data,
        })
      }
    } catch (err) {
      const {message} = err.response.data.status
      setError(message)
      Sentry.captureException(message || err)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (authDataState.patientAccountInformation.email) {
      router.push('/auth/emailVerification')
    }
  }, [authDataState.patientAccountInformation.email])

  useEffect(() => {
    if (!authDataState.patientAccountInformation.firstName) {
      setAuthDataState({
        type: AuthContextStaticData.UPDATE_PATIENT_ACCOUNT_INFORMATION_CALLED,
        patientAccountInformationCalled: true,
      })
    }
  }, [])

  return (
    <div className="pure-block-wrapper pure-block-wrapper_create-profile">
      <div>
        <PureBlock flow center={false} isNoResults={false}>
          <div className="logo">
            <Image src="/logo.svg" width={136} height={16} alt="logo" />
          </div>
          <h4 className="header">Update your email</h4>
          <p className="message">
            An email will be sent to the new email address to verify the address change.
          </p>
          <div className="inputGroup inputGroup_create-profile">
            <div
              className={error ? 'inputGroup__field inputGroup__field_error' : 'inputGroup__field'}
            >
              <label htmlFor="email">
                <span>
                  Email Address <em>*</em>
                </span>
                <input
                  id="email"
                  type="text"
                  className="input"
                  value={email}
                  onChange={(e) => validateEmail(e.target.value)}
                />
              </label>
            </div>

            <div className="inputGroup__create-error">{error}</div>

            {loading ? (
              <CircleLoader className="middle-loader" />
            ) : (
              <button
                type="button"
                onClick={handleEmailUpdate}
                className={
                  isEmailValidated
                    ? 'button inputGroup__button'
                    : 'button inputGroup__button inputGroup__button_disabled'
                }
              >
                Update Email
              </button>
            )}
          </div>
        </PureBlock>
      </div>
    </div>
  )
}

export default UpdateEmail
