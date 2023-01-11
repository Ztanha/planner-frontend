import {createSlice} from "@reduxjs/toolkit";
export const userInfoSlice = createSlice({
    name: 'user',
    initialState: {
        email:'',
        id:'',
        name:''
    },
    reducers : {
      userLoaded : (state,action) =>{
          state.email = action.payload.email;
          state.id = action.payload.id;
          state.name = action.payload.name;
      },
    }
})

export const { userLoaded } = userInfoSlice.actions;
export default  userInfoSlice.reducer