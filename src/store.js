import { configureStore } from '@reduxjs/toolkit'
import newsSlice from './RTK/Slices/newsSlice'
import cryptoSlice from './RTK/Slices/cryptoSlice'

export const store = configureStore({
  reducer: {
    news: newsSlice,
    crypto: cryptoSlice
  },
})



