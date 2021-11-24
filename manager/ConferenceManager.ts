import { Axios } from "./AxiosInstance"
import {AxiosResponse} from "axios"

const conferenceManager = {
  getWaitingToken(captchaToken?: string, kitCode?: string) {
    return Axios({
      token: captchaToken,
      baseURL: process.env.SCHEDULE_BASE_URL
    }).get(`/scheduling/api/public/v1/kit-codes/${kitCode}`)
  },

  getConferenceCredentials(waitingToken: AxiosResponse<string>) {
    return Axios({
      baseURL: process.env.SCHEDULE_BASE_URL
    }).put('/scheduling/api/public/v1/appointment/waiting', {
      waitingToken
    })
  }
}

export default conferenceManager