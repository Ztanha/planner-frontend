import {createSlice} from "@reduxjs/toolkit";
export const scheduleSlice = createSlice({
    name: 'schedules',
    initialState:{
        data:''
    },
    reducers:{
        schedulesLoaded : (state, action)=>{
            state.data = action.payload
        }
    }
})
export const {schedulesLoaded} = scheduleSlice.actions;
export default scheduleSlice.reducer
