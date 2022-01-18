import React, {useEffect, useState} from "react"
import PureBlock from "@fh-health/component/pureBlock"
import Image from "next/image"
import CircleLoader from "@fh-health/component/utils/circleLoader"
import Notification from "@fh-health/component/notification"

const CreateProfile = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [createButtonState, setCreateButtonState] = useState<boolean>(false)
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [email, setEmail] = useState<string>("")

  const handleCreateClick = () => {
    setLoading(true)
  }

  useEffect(() => {
    if (firstName && lastName && email) {
      setCreateButtonState(true)
    }
  }, [firstName, lastName, email])

  return (
    <>
      <Notification type="warning">
        Please ensure your First & Last Name are correct, as you will not be able to change this later
      </Notification>
      <div className="pure-block-wrapper pure-block-wrapper_create-profile">
        <div>
          <PureBlock flow center={false} isNoResults={false}>
            <div className="logo">
              <Image src="/logo.svg" width={136} height={16} alt="logo" />
            </div>
            <h4 className="header">Create Your Profile</h4>
            <p className="message">
              Upload a clear picture of yourself and provide a few pieces of information to get started.
            </p>
            <div className="inputGroup inputGroup_create-profile">

              <div className="inputGroup__field">
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

              <div className="inputGroup__field">
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

              <div className="inputGroup__field">
                <label htmlFor="email">
                  <span>
                    Email Address <em>*</em>
                  </span>
                  <input
                    id="email"
                    type="text"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              </div>

              {loading ? (
                <CircleLoader className="middle-loader" />
              ) : (
                <button
                  type="button"
                  onClick={() => handleCreateClick()}
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
