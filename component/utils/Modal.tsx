const Modal = (props: { children?: JSX.Element }) => (
  <div className="modal">
    <div className="modal__content">
      {props.children}
    </div>
  </div>
)

export default Modal
