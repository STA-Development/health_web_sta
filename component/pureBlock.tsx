const PureBlock = (props : {flow: boolean, center?:boolean, children: object}) => {
    return (
        <div className={`${props.flow ? 'contentOutline contentOutline_flow' : 'contentOutline'} ${props.center ? 'centerX' : ''}`}>
            <div className={props.flow ? 'content content_flow' : 'content'}>
                {props.children}
            </div>
        </div>
    )
}
export default PureBlock
