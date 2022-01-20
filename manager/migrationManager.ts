import Axios, {authHeader} from './axiosInstance'

const migrationManager = {
  getPatientsList() {
    return Axios({
      baseURL: process.env.USER_SERVICE_URL,
    }).get('/user/api/v1/patients/unconfirmed', {
      headers: {
        ...authHeader(),
      },
    })
  }
}

export default migrationManager
