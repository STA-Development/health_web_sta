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
  },
  migrateSelectedPatients(patients: object[]) {
    return Axios({
      baseURL: process.env.USER_SERVICE_URL,
    }).post(
      '/user/api/v1/patients/migrate',
      {
        migrations: patients
      },
      {
      headers: {
        ...authHeader(),
      },
    })
  }
}

export default migrationManager
