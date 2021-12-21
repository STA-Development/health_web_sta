import React from "react"
import Image from 'next/image'

const Notification = ({ type, children }: { type: string, children: string }) => (
  <div className={`notification ${type === 'warning' ? 'notify-warning' : 'notify-error'}`}>
    {type === 'warning' && <div className="notification-wrapper"><Image src="/warning.svg" width={32} height={32} alt="Warning Icon" /></div>}
    {type === 'error' && <div className="notification-wrapper"><Image src="/error.svg" width={32} height={32} alt="Error Icon" /></div>}
    <span>{children}</span>
  </div>
)

export default Notification
