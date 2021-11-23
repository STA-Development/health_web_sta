import RippleLoader from "./icon/rippleLoader";

export default function VideoWrapper() {

    return (
        <div className='video-wrapper'>
            <div className='video-wrapper__content'>
                <RippleLoader/>
                <h4>You are in the waiting room</h4>
                <p>
                    Your call will being as soon as the
                    <br/>
                    Health Professional is ready.
                </p>
                <p>Thank you for your patience!</p>
            </div>
        </div>
    )
}
