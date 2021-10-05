import {Axios} from "./AxiosInstance"

const testResultManager = {
  getTestResult(token: string, encryptedID: string) {
    return Axios(token).get(`/user/api/public/v1/pcr-test-results/${encryptedID}`)
  },
  getSingleTestResult(id:string) {
    return Axios().get(`/user/api/v1/pcr-test-results/${id}`)
  },
  getAllTestResults() {
    return Axios().get(`${process.env.APP_RESERVATION_URL}/reservation/api/v1/test-results`)
  },
  checkVerification(captchaToken: string, smsToken: string) {
    return Axios(captchaToken).put('/user/api/v1/verify', {
      token: smsToken
    })
  }
}
export default testResultManager
