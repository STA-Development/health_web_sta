import Image from 'next/image'

export default function MessageError({ text }: { text?: string }) {

  return (
    <div className="message-error">
      <Image src="/error.svg" width={20} height={20} alt="message error" />
      <span>{text}</span>
    </div>
  )
}
