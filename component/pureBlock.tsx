import Image from "next/image";
const PureBlock = (props : any) => {
    return (
        <div className={props.flow ? 'contentOutline contentOutline_flow' : 'contentOutline'}>
            <div className={props.flow ? 'content content_flow' : 'content'}>
                {/*<div>
                    <Image src={props.svg} width={64} height={64}></Image>
                </div>
                <div>
                    <span className="header">{props.header}</span>
                </div>
                <div>
                    <span className="message">{props.message}</span>
                </div>*/}
                {props.children}
            </div>
        </div>
    )
}
export default PureBlock
