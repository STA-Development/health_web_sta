import Config from '@fh-health/utils/envWrapper'
import Axios from './axiosInstance'

const baseURL = Config.get('USER_SERVICE_URL')

const authManager = {
  getPatientInformation() {
    return Axios({
      baseURL,
    }).get('/user/api/v1/patients')
  },
  sendEmailVerification() {
    return Axios({
      baseURL,
    }).put('/user/api/v1/patients/email/verify', {})
  },
  verifyUserEmail(data: {patientId: string; organizationId: string; code: string}) {
    return Axios({
      baseURL,
    }).put('/user/api/v1/patients/email/verified', {
      patientId: data.patientId,
      organizationId: data.organizationId,
      code: data.code,
    })
  },
  createUserProfile(firstName: string, lastName: string, email: string) {
    return Axios({
      baseURL,
    }).post('/user/api/v1/patients', {
      firstName,
      lastName,
      email,
    })
  },
  updateUserEmail(email: string) {
    return Axios({
      baseURL,
    }).put('/user/api/v1/patients', {
      email,
    })
  },
}

export default authManager
