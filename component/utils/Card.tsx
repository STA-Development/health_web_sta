const Card = ({ children, permissions }: { children?: JSX.Element | JSX.Element[], permissions?: boolean}) => (
  <div className="card">
    <div className={permissions ? "card__body card__body_permissions" : "card__body"}>
      {children}
    </div>
  </div>
)

export default Card
