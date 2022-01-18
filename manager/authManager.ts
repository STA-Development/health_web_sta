import Axios, {authHeader} from './axiosInstance'

const authManager = {
  getPatientInformation() {
    return Axios({
      baseURL: process.env.USER_SERVICE_URL,
    }).get('/user/api/v1/patients', {
      headers: {
        ...authHeader(),
      },
    })
  },
  sendEmailVerification() {
    return Axios({
      baseURL: process.env.USER_SERVICE_URL,
    }).put(
      '/user/api/v1/patients/email/verify',
      {},
      {
        headers: {...authHeader()},
      },
    )
  },
  verifyUserEmail(data: {patientId: string; organizationId: string; code: string}) {
    return Axios({
      baseURL: process.env.USER_SERVICE_URL,
    }).put(
      '/user/api/v1/patients/email/verified',
      {
        patientId: data.patientId,
        organizationId: data.organizationId,
        code: data.code,
      },
      {
        headers: {...authHeader()},
      },
    )
  },
}

export default authManager
