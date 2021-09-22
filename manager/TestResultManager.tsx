import {Axios} from "./AxiosInstance"
import axios from "axios"


const testResultManager = {
  getTestResult(token: string, encryptedID: string) {
    return Axios(token).get(`/user/api/public/v1/pcr-test-results/${encryptedID}`)
  },
  getSingleTestResult(token:string, id:string) {
    return Axios().get(`/user/api/v1/pcr-test-results/${id}`)
  },
  getAllTestResults() {
    return Axios().get(`${process.env.NEXT_PUBLIC_APP_RESERVATION_URL}/reservation/api/v1/test-results`)
  }
}
export default testResultManager
