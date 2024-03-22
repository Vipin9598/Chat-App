import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    chatUser:localStorage.getItem("chatUser")? JSON.parse(localStorage.getItem("chatUser")):null,
    posts:localStorage.getItem("posts")? JSON.parse(localStorage.getItem("posts")):null,

};

const profileSlice = createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setUser(state,value){
            state.chatUser = value.payload
            localStorage.setItem("chatUser",JSON.stringify(value.payload))     
        },
        setPost(state,value){
            state.posts = value.payload
            localStorage.setItem("posts",JSON.stringify(value.payload))     
        },
    }
})

export const {setUser,setPost} = profileSlice.actions
export default profileSlice.reducer