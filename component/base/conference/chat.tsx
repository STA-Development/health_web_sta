import Image from "next/image"

export default function ChatWrapper() {

    return (
        <div className='chat-wrapper'>
            <div className='chat-wrapper__kit-info'>
                <h4>FH @ Home Travel (Kit Name)</h4>
                <p>Patient</p>
                <h5>John Doe</h5>
            </div>
            <div className='messenger'>
                <div className='messenger__header'>
                    chat
                </div>
                <div className='messenger__body'>

                </div>
                <div className='messenger__footer'>
                    <div className='button messenger__footer-button'>
                        <label htmlFor='upload'>
                            <Image src='/attach.svg' width={31} height={16}/>
                        </label>
                        <input type='file' id='upload'/>
                    </div>
                    <input className='input messenger__footer-input' placeholder='Send Message' type="text"/>
                    <div className='button messenger__footer-button'>
                        <Image src='/send.svg' width={24} height={20}/>
                    </div>
                </div>
            </div>
        </div>
    )
}