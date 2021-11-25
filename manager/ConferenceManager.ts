import { Axios } from "./AxiosInstance"

const conferenceManager = {
  getWaitingToken(captchaToken: string, kitCode: string, appointmentToken: string) {
    return Axios({
      token: captchaToken,
      baseURL: process.env.SCHEDULE_BASE_URL,
    }).get(`/scheduling/api/public/v1/kit-codes/${kitCode}`, {
      headers: {
        'appointment-id': appointmentToken
      },
    })
  },

  joinToDialog(waitingToken: string) {
    return Axios({
      baseURL: process.env.SCHEDULE_BASE_URL
    }).put('/scheduling/api/public/v1/appointment/waiting', {
      waitingToken
    })
  }
}

export default conferenceManager