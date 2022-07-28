import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    notificationChange(state, action) {
      const notification = action.payload
      state = notification
      return state
    },
    removeNotification(state, action) {
      state = null
      return state
    }
  },
})

export const { notificationChange, removeNotification } = notificationSlice.actions
export const setNotification = (notification, timeInSeconds = 0) => {
  return async dispatch => {
    dispatch(notificationChange(notification))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 1000 * timeInSeconds)
  }
}

export default notificationSlice.reducer