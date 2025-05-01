import { configureStore } from '@reduxjs/toolkit'
import  getWeatherReducer from './features/getWeatherDataSlice'


export const store = configureStore({
    reducer: {
        weatherData: getWeatherReducer
    },
})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;