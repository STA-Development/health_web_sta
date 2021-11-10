import { useState } from "react"
import Image from "next/image"

enum Language {
    ENG = 'Eng',
    RUS = 'Rus'
}

const ConferenceHeader = () => {

    const [currentLanguage, setCurrentLanguage] = useState(Language.ENG)

    return (
        <header className='chat-header'>
            <div className='chat-header__logo'>
                <Image src='/group.svg' alt='FH HEALTH' width={136} height={16}/>
            </div>
            <div className='chat-header__items'>
                <div className='lang-switcher'>
                    <div className='button lang-switcher_btn'>
                        <div className='lang-switcher__current-lang'>
                            <span>{currentLanguage}</span>
                            <div className='arrow-icon'/>
                        </div>
                    </div>
                </div>
                <button className='button chat-header__logout'>
                    <Image src='/chat-logout.svg' alt='logout' width={24} height={24}/>
                </button>
            </div>
        </header>
    )
}

export default ConferenceHeader;
