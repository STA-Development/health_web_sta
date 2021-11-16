import VideoWrapper from "../../component/base/conference/video";
import ChatWrapper from "../../component/base/conference/chat";

export default function ConferenceRoomView() {

    return (
        <div className='conference-wrapper'>
            <VideoWrapper/>
            <ChatWrapper/>
        </div>
    )
}