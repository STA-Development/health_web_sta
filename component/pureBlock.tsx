import Image from "next/image";
const PureBlock = (props : any) => {
    return (
        <div className="contentOutline">
            <div className="content">
                <div>
                    <Image src={props.svg} width={64} height={64}></Image>
                </div>
                <div>
                    <span className="header">{props.header}</span>
                </div>
                <div>
                    <span className="message">{props.message}</span>
                </div>
            </div>
        </div>
    )
}
export default PureBlock
