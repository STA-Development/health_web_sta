import Config from '@fh-health/utils/envWrapper'

const QBConfig = {
  chatProtocol: {
    active: 2,
  },
  endpoints: {
    api: Config.get('QB_API_DOMAIN'),
    chat: Config.get('QB_CHAT_DOMAIN'),
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
