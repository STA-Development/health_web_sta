import Image from "next/image"

export default function ErrorNotification({ isError, setErrorState }: { isError?: boolean, setErrorState: (value: boolean) => void }) {

  return (
    <div className="chat-error-notification">
      <div className={isError ? "error-notification error-notification_active" : "error-notification"}>
        <Image src="/error.svg" width={24} height={24} />
        <p>Something went wrong</p>
        <span
          className="error-notification__close"
          onClick={() => setErrorState(false)}
        >
        <Image src="/cross.svg" width={24} height={24} />
      </span>
      </div>
    </div>
  )
}
