import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    chatUser:localStorage.getItem("chatUser")? JSON.parse(localStorage.getItem("chatUser")):null,

};

const profileSlice = createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setUser(state,value){
            state.chatUser = value.payload
            localStorage.setItem("user",JSON.stringify(value.payload))     
        },
    }
})

export const {setUser} = profileSlice.actions
export default profileSlice.reducer