import Config from '@fh-health/utils/envWrapper'
import Axios from './axiosInstance'

const baseURL = Config.get('SCHEDULE_SERVICE_URL')

const conferenceManager = {
  getWaitingToken(captchaToken: string, kitCode: string, appointmentToken: string) {
    return Axios({
      token: captchaToken,
      baseURL,
    }).get('/scheduling/api/public/v1/kit-codes', {
      headers: {
        'appointment-token': appointmentToken,
        'kit-code': kitCode,
      },
    })
  },

  getAppointmentInfo(captchaToken: string, appointmentToken: string) {
    return Axios({
      token: captchaToken,
      baseURL,
    }).get('/scheduling/api/public/v1/appointment', {
      headers: {
        'appointment-token': appointmentToken,
      },
    })
  },

  joinToDialog(captchaToken: string, waitingToken: string) {
    return Axios({
      token: captchaToken,
      baseURL,
    }).put('/scheduling/api/public/v1/appointment/waiting', {
      waitingToken,
    })
  },
}

export default conferenceManager
