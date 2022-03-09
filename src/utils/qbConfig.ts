const QBConfig = {
  chatProtocol: {
    active: 2,
  },
  endpoints: {
    api: process.env.QB_API_DOMAIN,
    chat: process.env.QB_CHAT_DOMAIN,
  },
  streamManagement: {
    enable: true,
  },
  debug: {
    mode: 1,
    file: null,
  },
  webrtc: {
    answerTimeInterval: 60,
    dialingTimeInterval: 5,
    disconnectTimeInterval: 35,
    statsReportTimeInterval: 5,
  },
}

export default QBConfig
