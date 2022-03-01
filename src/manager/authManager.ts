import Axios from './axiosInstance'

const authManager = {
  getPatientInformation() {
    return Axios({
      baseURL: process.env.USER_SERVICE_URL,
    }).get('/user/api/v1/patients')
  },
  sendEmailVerification() {
    return Axios({
      baseURL: process.env.USER_SERVICE_URL,
    }).put('/user/api/v1/patients/email/verify', {})
  },
  verifyUserEmail(data: {patientId: string; organizationId: string; code: string}) {
    return Axios({
      baseURL: process.env.USER_SERVICE_URL,
    }).put('/user/api/v1/patients/email/verified', {
      patientId: data.patientId,
      organizationId: data.organizationId,
      code: data.code,
    })
  },
  createUserProfile(firstName: string, lastName: string, email: string) {
    return Axios({
      baseURL: process.env.USER_SERVICE_URL,
    }).post('/user/api/v1/patients', {
      firstName,
      lastName,
      email,
    })
  },
  updateUserEmail(email: string) {
    return Axios({
      baseURL: process.env.USER_SERVICE_URL,
    }).put('/user/api/v1/patients', {
      email,
    })
  },
}

export default authManager
