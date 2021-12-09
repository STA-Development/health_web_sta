import Image from 'next/image'

const Notification = (props: { type: string, children: string }) => (
  <div className={`notification ${props.type === 'warning' ? 'notify-warning' : 'notify-error'}`}>
    {
                props.type === 'warning' && <div className="notification-wrapper"><Image src="/warning.svg" width={32} height={32} alt="Warning Icon" /></div>
            }
    {
                props.type === 'error' && <div className="notification-wrapper"><Image src="/error.svg" width={32} height={32} alt="Error Icon" /></div>
            }
    <span>{props.children}</span>
  </div>
)
export default Notification
