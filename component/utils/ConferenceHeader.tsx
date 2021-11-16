import { useState } from "react"
import Image from "next/image"
import MobileChatView from "../base/conference/partials/mobileChatView";
import {UseConfDataStateValue} from "../../context/ConferenceContext";

enum Language {
    ENG = 'Eng',
    RUS = 'Rus'
}

const ConferenceHeader = () => {
    const [currentLanguage, setCurrentLanguage] = useState<string>(Language.ENG)

    const { confDataState, setConfDataState } = UseConfDataStateValue()

    const openMobileChat = () => {
        setConfDataState({
            chatVisibility: true
        })
    }

    return (
        <header className='conference-header'>
            <button className='button conference-header__logout conference-header__logout_mobile'>
                <Image src='/chat-logout.svg' alt='logout' width={24} height={24}/>
            </button>
            <div className='conference-header__logo'>
                <Image src='/group.svg' alt='FH HEALTH' width={136} height={16}/>
            </div>
            <div className='conference-header__items'>
                <div className='lang-switcher'>
                    <div className='button lang-switcher_btn'>
                        <div className='lang-switcher__current-lang'>
                            <span>{currentLanguage}</span>
                            <div className='arrow-icon'/>
                        </div>
                    </div>
                </div>
                <button className='button conference-header__logout conference-header__items-button'>
                    <Image src='/chat-logout.svg' alt='logout' width={24} height={24}/>
                </button>
                <button
                    className='button conference-header__items-button conference-header__chat-button'
                    onClick={openMobileChat}
                >
                    <Image src='/chat-icon.svg' alt='open chat' width={24} height={24}/>
                </button>
            </div>
            {confDataState.chatVisibility && <MobileChatView/>}
        </header>
    )
}

export default ConferenceHeader;
