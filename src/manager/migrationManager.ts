import Config from '@fh-health/utils/envWrapper'
import Axios from './axiosInstance'

const baseURL = Config.get('USER_SERVICE_URL')

const migrationManager = {
  getPatientsList() {
    return Axios({
      baseURL,
    }).get('/user/api/v1/patients/unconfirmed')
  },
  getDependentsList() {
    return Axios({
      baseURL,
    }).get('/user/api/v1/patients/dependants')
  },
  migrateSelectedPatients(patients: object[]) {
    return Axios({
      baseURL,
    }).post('/user/api/v1/patients/migrate', {
      migrations: patients,
    })
  },
}

export default migrationManager
