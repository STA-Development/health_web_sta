import Image from "next/image";
const Notification = (props: { type: string, children: object }) => {
    return (
        <div className={`notification ${props.type == "warning" ? "notify-warning" : "notify-error"}`} >
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
