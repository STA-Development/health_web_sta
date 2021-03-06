import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import {useRouter} from 'next/router'
import authManager from '@fh-health/manager/authManager'
import * as Sentry from '@sentry/nextjs'
import {useDispatch} from 'react-redux'
import authInformationUpdate, {
  setAuthInformationUpdate,
} from '@fh-health/redux/state/auth/authInformationUpdate'
import {updatePatientInformation} from '@fh-health/redux/state/auth/patientInformationSlice'
import useEmailValidation from '@fh-health/hooks/emailValidationHook'
import Card from '@fh-health/components/utils/card'
import Notification from '@fh-health/components/results/notification'
import CircleLoader from '@fh-health/components/utils/circleLoader'
import PureBlock from '@fh-health/components/results/pureBlock'

const CreateProfile = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [createButtonState, setCreateButtonState] = useState<boolean>(false)
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [emailVerifyRequiredView, setEmailVerifyRequiredView] = useState<boolean>(false)
  const router = useRouter()
  const dispatch = useDispatch()
  const {email, isEmailValidated, validateEmail} = useEmailValidation()

  const handleCreateClick = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await authManager.createUserProfile(firstName, lastName, email)
      if (response?.data?.data) {
        dispatch(updatePatientInformation(response?.data?.data))
      }
      const {isEmailVerified} = response.data.data
      if (!isEmailVerified) {
        setLoading(false)
        setEmailVerifyRequiredView(true)
      }
    } catch (err) {
      const {message} = err.response.data.status
      setError(message)
      Sentry.captureException(message || err)
    }
    setLoading(false)
  }

  const handleEmailVerifyViewClick = () => {
    dispatch(setAuthInformationUpdate(!authInformationUpdate))
    router.push('/auth/emailVerification')
  }

  useEffect(() => {
    if (firstName && lastName && isEmailValidated) {
      setCreateButtonState(true)
    } else {
      setCreateButtonState(false)
    }
  }, [firstName, lastName, email])

  useEffect(() => {
    const listener = async (event) => {
      if (event.key === 'Enter' && createButtonState) {
        await handleCreateClick()
      }
    }

    if (createButtonState) {
      document.addEventListener('keyup', listener)
    }

    return () => {
      document.removeEventListener('keyup', listener)
    }
  }, [createButtonState])

  const displayEmailVerifyRequiredView = () => (
    <div className="pure-block-wrapper">
      <div>
        <div className="card-wrapper">
          <Card permissions={false}>
            <div className="card__media card__media_sm">
              <Image src="/check.svg" alt="check" height={64} width={64} />
            </div>
            <div className="card__content">
              <h4 className="card__content-title">Verify your Email</h4>
              <p className="card__content-message">
                This email will be used for login and to recover your data.
              </p>
            </div>
            <button
              type="button"
              className="button card__button"
              onClick={() => handleEmailVerifyViewClick()}
            >
              Verify Email
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
    </div>
  )

  return emailVerifyRequiredView ? (
    displayEmailVerifyRequiredView()
  ) : (
    <>
      <Notification type="warning">
        Please ensure your First & Last Name are correct, as you will not be able to change this
        later
      </Notification>
      <div className="pure-block-wrapper pure-block-wrapper_create-profile">
        <div>
          <PureBlock flow center={false} isNoResults={false}>
            <div className="logo">
              <Image src="/logo.svg" width={136} height={16} alt="logo" />
            </div>
            <h4 className="header">Create Your Profile</h4>
            <p className="message">Please provide a few pieces of information to get started</p>
            <div className="inputGroup inputGroup_create-profile">
              <div
                className={
                  error ? 'inputGroup__field inputGroup__field_error' : 'inputGroup__field'
                }
              >
                <label htmlFor="firstName">
                  <span>
                    First Name <em>*</em>
                  </span>
                  <input
                    type="text"
                    id="firstName"
                    className="input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
              </div>

              <div
                className={
                  error ? 'inputGroup__field inputGroup__field_error' : 'inputGroup__field'
                }
              >
                <label htmlFor="lastName">
                  <span>
                    Last Name <em>*</em>
                  </span>
                  <input
                    type="text"
                    id="lastName"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </div>

              <div
                className={
                  error ? 'inputGroup__field inputGroup__field_error' : 'inputGroup__field'
                }
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
                  onClick={handleCreateClick}
                  className={
                    createButtonState
                      ? 'button inputGroup__button'
                      : 'button inputGroup__button inputGroup__button_disabled'
                  }
                >
                  Create Profile
                </button>
              )}
            </div>
          </PureBlock>
        </div>
      </div>
    </>
  )
}

export default CreateProfile
