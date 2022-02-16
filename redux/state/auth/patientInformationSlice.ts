import {createSlice} from '@reduxjs/toolkit'

export const patientInformationSlice = createSlice({
  name: 'patientInformation',
  initialState: {
    value: null,
  },
  reducers: {
    updatePatientInformation: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.value = action.payload
    },
  },
})

export const {updatePatientInformation} = patientInformationSlice.actions

export default patientInformationSlice.reducer
