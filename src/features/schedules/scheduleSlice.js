import {createSlice} from "@reduxjs/toolkit";
export const scheduleSlice = createSlice({
    name: 'schedules',
    initialState:[],
    reducers:{
        schedulesLoaded : (state, action)=>{
            state.schedules = action.payload
        }
    }
})
export const {schedulesLoaded} = scheduleSlice.actions;
export default scheduleSlice.reducer
