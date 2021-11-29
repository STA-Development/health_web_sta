export const QBConfig = {
  chatProtocol: {
    active: 2
  },
  endpoints: {
    api: process.env.QB_API_DOMAIN,
    chat: process.env.QB_CHAT_DOMAIN
  },
  streamManagement: {
    enable: true
  },
  debug: {
    mode: 1,
    file: null
  }
}
