import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../features/userInfo/userInfoSlice.js";
import schedulesReducer from "../features/schedules/scheduleSlice.js"

export const store = configureStore({
    reducer: {
        user: userReducer,
        schedules : schedulesReducer,
        // performance : performanceReducer
    },
})

export default store;