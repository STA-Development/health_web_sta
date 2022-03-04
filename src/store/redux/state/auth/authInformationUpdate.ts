import {createSlice} from '@reduxjs/toolkit'

export const authInformationUpdateSlice = createSlice({
  name: 'authInformationUpdate',
  initialState: {
    value: false,
  },
  reducers: {
    setAuthInformationUpdate: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.value = action.payload
    },
  },
})

export const {setAuthInformationUpdate} = authInformationUpdateSlice.actions

export default authInformationUpdateSlice.reducer
