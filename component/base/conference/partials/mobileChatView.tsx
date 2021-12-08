import ChatWrapper from "../chat";
import {IChatWrapper} from "../../../../types/context/ConferenceContext"

export default function MobileChatView(props: IChatWrapper) {

    return (
        <div className='mobile-chat'>
            <ChatWrapper {...props}/>
        </div>
    )
}
