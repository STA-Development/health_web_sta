import React from "react"

const Modal = ({children}: { children: JSX.Element }) => (
  <div className="modal">
    <div className="modal__content">
      {children}
    </div>
  </div>
)

export default Modal
