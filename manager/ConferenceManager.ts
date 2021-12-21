import Axios from './AxiosInstance'

const conferenceManager = {
  getWaitingToken(captchaToken: string, kitCode: string, appointmentToken: string) {
    return Axios({
      token: captchaToken,
      baseURL: process.env.SCHEDULE_SERVICE_URL,
    }).get('/scheduling/api/public/v1/kit-codes', {
      headers: {
        'appointment-token': appointmentToken,
        'kit-code': kitCode
      },
    })
  },

  getAppointmentInfo(captchaToken: string, appointmentToken: string) {
    return Axios({
      token: captchaToken,
      baseURL: process.env.SCHEDULE_SERVICE_URL,
    }).get('/scheduling/api/public/v1/appointment', {
      headers: {
        'appointment-token': appointmentToken,
      },
    })
  },

  joinToDialog(captchaToken: string, waitingToken: string) {
    return Axios({
      token: captchaToken,
      baseURL: process.env.SCHEDULE_SERVICE_URL,
    }).put('/scheduling/api/public/v1/appointment/waiting', {
      waitingToken,
    })
  },
}

export default conferenceManager
