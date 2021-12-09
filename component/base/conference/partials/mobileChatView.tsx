import {IChatWrapper} from "types/context/ConferenceContext"
import ChatWrapper from "../chat"

export default function MobileChatView(props: IChatWrapper) {

    return (
        <div className='mobile-chat'>
            <ChatWrapper {...props}/>
        </div>
    )
}
