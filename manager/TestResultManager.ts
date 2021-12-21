import Axios from "./AxiosInstance"

const testResultManager = {
  getTestResult(token: string, encryptedID: string) {
    return Axios({token}).get(`/user/api/public/v1/pcr-test-results/${encryptedID}`, {
      headers: {
        "authorization": `Bearer ${localStorage.accessToken}`
      }
    })
  },
  getSingleTestResult(id:string) {
    return Axios().get(`/user/api/v1/pcr-test-results/${id}`)
  },
  getAllTestResults() {
    return Axios().get(`${process.env.RESERVATION_SERVICE_URL}/reservation/api/v1/test-results`)
  },
  checkVerification(captchaToken: string, smsToken: string) {
    return Axios({token: captchaToken}).put('/user/api/v1/verify', {
      token: smsToken
    })
  }
}
export default testResultManager
