import {Axios} from "./AxiosInstance"

const testResultManager = {
  getTestResult(token: string, encryptedID: string) {
    return Axios(token).get(`/user/api/public/v1/pcr-test-results/${encryptedID}`)
  },
  getAllTestResults() {
    return Axios().get(`/reservation/api/v1/test-results`)
  }
}
export default testResultManager
