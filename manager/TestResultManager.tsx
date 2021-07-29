import {Axios} from "./AxiosInstance"

export const getTestResult = (token: string, encryptedID: string) => {
  return Axios(token).get(`/user/api/public/v1/pcr-test-results/${encryptedID}`)
}
