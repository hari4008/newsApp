import { configureStore } from '@reduxjs/toolkit'
import newsSlice from './RTK/Slices/newsSlice'

export const store = configureStore({
  reducer: {
    news: newsSlice,
  },
})



