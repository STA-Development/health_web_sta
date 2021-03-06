import React, {useState} from 'react'
import Image from 'next/image'
import ConferenceContextStaticData from '@fh-health/static/conferenceContextStaticData'
import {UseConfDataStateValue} from '@fh-health/contexts/conferenceContext'
import {Language} from '@fh-health/types/context/ConferenceContext'

const ConferenceHeader = ({isMobile}: {isMobile: boolean}) => {
  const [currentLanguage] = useState<string>(Language.ENG)
  const {confDataState, setConfDataState} = UseConfDataStateValue()

  const toggleMobileChat = () => {
    setConfDataState({
      type: ConferenceContextStaticData.TOGGLE_CHAT_VIEW,
      view: !confDataState.chatVisibility,
    })
  }

  return (
    <header
      className={
        confDataState.consultationFlow.isConsultationStarted
          ? `conference-header conference-header_mobile-hidden ${
              isMobile ? 'conference-header_mobile' : ''
            }`
          : `conference-header ${isMobile ? 'conference-header_mobile' : ''}`
      }
    >
      <button
        type="button"
        className="button conference-header__logout conference-header__logout_mobile"
      >
        <Image src="/chat-logout.svg" alt="logout" width={24} height={24} />
      </button>
      <div className="conference-header__logo">
        <Image src="/group.svg" alt="FH HEALTH" width={136} height={16} />
      </div>
      <div className="conference-header__items">
        <div className="lang-switcher">
          <div className="button lang-switcher_btn">
            <div className="lang-switcher__current-lang">
              <span>{currentLanguage}</span>
              <div className="arrow-icon" />
            </div>
          </div>
        </div>
        <button
          type="button"
          className="button conference-header__logout
          conference-header__items-button"
        >
          <Image src="/chat-logout.svg" alt="logout" width={24} height={24} />
        </button>
        <button
          type="button"
          className="button conference-header__items-button conference-header__chat-button"
          onClick={toggleMobileChat}
        >
          {confDataState.chatVisibility ? (
            <Image src="/cross.svg" width={24} height={24} alt="close" />
          ) : (
            <Image src="/chat-icon.svg" alt="open chat" width={24} height={24} />
          )}
        </button>
      </div>
    </header>
  )
}

export default ConferenceHeader
