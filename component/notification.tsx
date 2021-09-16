import Image from "next/image";
const Notification = (props: any) => {
    return (
        <div className={`notification ${props.type == "warning" ? "notif-warning" : "notif-error"}`} >
            {
                props.type == "warning" && <Image src="/warning.svg" width={32} height={32} alt="Warning Icon" />
            }
            {
                props.type == "error" && <Image src="/error.svg" width={32} height={32} alt="Error Icon" />
            }
            <span>{props.children}</span>
        </div>
    )
}
export default Notification
