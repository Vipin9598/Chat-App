import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    loading:false,
    isBlurred:false,
    signUpData:null,
    generatedOTP:null,
    chatToken : localStorage.getItem("chatToken")? JSON.parse(localStorage.getItem("chatToken")):null
};

const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setChatToken(state,value){
            state.chatToken = value.payload
        },
        setGeneratedOTP(state,value){
            state.generatedOTP = value.payload
        },
        setLoading(state,value){
            state.loading=value.payload
        },
        setSignUpData(state,value){
            state.signUpData=value.payload
        },
        setIsBlurred(state,value){
            state.isBlurred=value.payload
        }
    }
})

export const {setChatToken,setLoading,setSignUpData,setIsBlurred,setGeneratedOTP} = authSlice.actions
export default authSlice.reducer