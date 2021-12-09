const Card = (props: { children?: JSX.Element | JSX.Element[]}) => (
  <div className="card">
    <div className="card__body">
      {props.children}
    </div>
  </div>
)

export default Card
