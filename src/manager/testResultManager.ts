import Config from '@fh-health/utils/envWrapper'
import Axios from './axiosInstance'

const testResultManager = {
  getTestResult(token: string, encryptedID: string) {
    return Axios({token}).get(`/user/api/public/v1/pcr-test-results/${encryptedID}`)
  },
  getSingleTestResult(id: string) {
    return Axios().get(`/user/api/v1/pcr-test-results/${id}`)
  },
  getAllTestResults() {
    return Axios().get(`${Config.get('RESERVATION_SERVICE_URL')}/reservation/api/v1/test-results`)
  },
  checkVerification(captchaToken: string, smsToken: string) {
    return Axios({token: captchaToken}).put('/user/api/v1/verify', {
      token: smsToken,
    })
  },
}
export default testResultManager
