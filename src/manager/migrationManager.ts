import Axios from './axiosInstance'

const migrationManager = {
  getPatientsList() {
    return Axios({
      baseURL: process.env.USER_SERVICE_URL,
    }).get('/user/api/v1/patients/unconfirmed')
  },
  getDependentsList() {
    return Axios({
      baseURL: process.env.USER_SERVICE_URL,
    }).get('/user/api/v1/patients/dependants')
  },
  migrateSelectedPatients(patients: object[]) {
    return Axios({
      baseURL: process.env.USER_SERVICE_URL,
    }).post('/user/api/v1/patients/migrate', {
      migrations: patients,
    })
  },
}

export default migrationManager
