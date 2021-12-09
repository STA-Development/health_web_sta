const ResultHeader = (props: { header:string, size?:number }) => (
  <p style={props.size ? { fontSize: `${props.size}px` } : {}} className="result-header">{props.header}</p>
)
export default ResultHeader
