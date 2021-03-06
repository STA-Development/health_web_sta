import {useNetworkState} from 'react-use'
import React, {useEffect, useState} from 'react'
import {UseConfDataStateValue} from '@fh-health/contexts/conferenceContext'
import Config from '@fh-health/utils/envWrapper'
import RippleLoader from './icons/rippleLoader'
import NetworkConnectionLost from './networkConnectionLost'
import ConferenceFinalView from './conferenceFinalView'
import Consultation from './consultation'

interface IVideoWrapper {
  triggerCallEnd: () => void
  switchAudioState: () => void
}

const VideoWrapper = ({triggerCallEnd, switchAudioState}: IVideoWrapper) => {
  const condition = useNetworkState()
  const [isOnline, setIsOnline] = useState(true)
  const {confDataState} = UseConfDataStateValue()

  const retryConnecting = () => {
    if (condition.online) {
      setIsOnline(true)
    }
  }

  const returnHome = () => {
    window.location.assign(Config.get('FH_HEALTH_WEBSITE_URL'))
  }

  useEffect(() => {
    if (!condition.online) {
      setIsOnline(false)
    }
  }, [condition.online])

  return (
    <>
      {isOnline && !confDataState.consultationFlow.isConferenceEnded && (
        <div className="video-wrapper">
          {confDataState.consultationFlow.isConferenceStarted ? (
            <Consultation triggerCallEnd={triggerCallEnd} switchAudioState={switchAudioState} />
          ) : (
            <div className="video-wrapper__content">
              <RippleLoader />
              <h4>You are in the waiting room</h4>
              <p>
                Your call will begin as soon as the
                <br />
                Health Professional is ready.
              </p>
              <p>Thank you for your patience!</p>
            </div>
          )}
        </div>
      )}
      {isOnline && confDataState.consultationFlow.isConferenceEnded && (
        <ConferenceFinalView returnHome={returnHome} />
      )}
      {!isOnline && <NetworkConnectionLost retry={retryConnecting} />}
    </>
  )
}

export default VideoWrapper
