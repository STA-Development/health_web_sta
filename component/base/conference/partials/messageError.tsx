export default function MessageError({ text }: { text?: string }) {

  return (
    <div className="message-error">
      <div className="message-error__img">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
          <path style={{stroke:"none", fillRule:"evenodd", fill:"#ff394d", fillOpacity:1}} d="M20 10c0 5.523-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0s10 4.477 10 10Zm0 0"/>
          <path style={{stroke:"none", fillRule:"nonzero", fill:"#fff", fillOpacity:1}} d="M10 13.188c.527 0 .953.457.953 1.023 0 .566-.426 1.027-.953 1.027-.527 0-.953-.46-.953-1.027 0-.566.426-1.024.953-1.024Zm0-7.95c.395 0 .715.344.715.77v5.129c0 .422-.32.765-.715.765-.395 0-.715-.343-.715-.765v-5.13c0-.425.32-.769.715-.769Zm0 0"/>
        </svg>
      </div>
      <span>{text}</span>
    </div>
  )
}
