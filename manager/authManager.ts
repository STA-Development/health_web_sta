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
  createUserProfile(firstName: string, lastName: string, email: string) {
    return Axios({
      baseURL: process.env.USER_SERVICE_URL,
    }).post(
      '/user/api/v1/patients',
      {
        firstName,
        lastName,
        email,
      },
      {
        headers: {...authHeader()},
      },
    )
  },
  updateUserEmail(email: string) {
    return Axios({
      baseURL: process.env.USER_SERVICE_URL,
    }).put(
      '/user/api/v1/patients',
      {
        email,
      },
      {
        headers: {...authHeader()},
      },
    )
  },
}

export default authManager
