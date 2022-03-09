import {createSlice} from '@reduxjs/toolkit'

export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    value: '',
  },
  reducers: {
    updateAuthToken: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.value = action.payload
    },
  },
})

export const {updateAuthToken} = tokenSlice.actions

export default tokenSlice.reducer
