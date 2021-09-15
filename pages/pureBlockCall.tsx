import PureBlock from "../component/pureBlock";
export default function pureBlockCall() {
    return (
        <>
            <div>
                <PureBlock svg="/check.svg" header="Phone Number Verified!" message="Your Mobile Phone Number has been verified. Your results will be sent to you via SMS as soon as they are available"/>
            </div>
        </>
    )
}
