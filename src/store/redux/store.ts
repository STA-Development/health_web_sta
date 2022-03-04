import {configureStore} from '@reduxjs/toolkit'
import {IPatientAccountInformation} from '@fh-health/types/context/AuthContext'
import tokenReducer from './state/auth/tokenSlice'
import authCheckedReducer from './state/auth/authCheckedSlice'
import patientInformationReducer from './state/auth/patientInformationSlice'
import authInformationUpdateSlice from './state/auth/authInformationUpdate'

export interface IStore {
  token: {value: string}
  authChecked: {value: boolean}
  patientInformation: {value: IPatientAccountInformation}
  authInformationUpdate: {value: boolean}
}

export default configureStore({
  reducer: {
    token: tokenReducer,
    authChecked: authCheckedReducer,
    patientInformation: patientInformationReducer,
    authInformationUpdate: authInformationUpdateSlice,
  },
})
