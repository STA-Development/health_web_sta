import {createSlice} from '@reduxjs/toolkit'

export const authCheckedSlice = createSlice({
  name: 'authChecked',
  initialState: {
    value: false,
  },
  reducers: {
    updateAuthChecked: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.value = action.payload
    },
  },
})

export const {updateAuthChecked} = authCheckedSlice.actions

export default authCheckedSlice.reducer
