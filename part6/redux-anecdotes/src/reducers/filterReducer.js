import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: null,
  reducers: {
    filterChange(state, action) {
      const filter = action.payload
      state = filter
      return state
    }
  },
})

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer