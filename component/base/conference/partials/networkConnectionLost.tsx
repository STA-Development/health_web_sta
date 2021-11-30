import NetworkIcon from "../icon/networkIcon";

export default function NetworkConnectionLost({ retry }: {retry?: any}) {

    return (
        <div className='video-wrapper'>
            <div className='video-wrapper__content network-content'>
                <NetworkIcon />
                <h4>Cannot Connect to a Local Network</h4>
                <p>
                    No Internet connection. Make sure Wi-Fi or
                    <br/>
                    Cellular data is turned on, then try again.
                </p>
                <button onClick={retry} className='button video-wrapper__button'>
                    Retry
                </button>
            </div>
        </div>
    )
}