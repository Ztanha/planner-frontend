import { configureStore } from '@reduxjs/toolkit'
import schedulesReducer from "../features/schedules/scheduleSlice.js"

export const store = configureStore({
    reducer: {
        schedules : schedulesReducer,
        // performance : performanceReducer
    },
})

export default store;