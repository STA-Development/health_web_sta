import Image from "next/image";
const PureBlock = (props : any) => {
    return (
        <div className={props.flow ? 'contentOutline contentOutline_flow' : 'contentOutline'}>
            <div className={props.flow ? 'content content_flow' : 'content'}>
                {props.children}
            </div>
        </div>
    )
}
export default PureBlock
