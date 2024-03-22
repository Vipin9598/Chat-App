import { setUser } from "../../slices/profileSlice"; 
import { setLoading } from "../../slices/authSlice";
// import  {setIsBlurred} from "../../slices/authSlice"
import {toast} from "react-hot-toast"
import { apiConnector } from "../apiconnector";

import {manageFriendRequest_API,requestAccept_API,unFriend_API,requestReject_API} from "../apis"

export const manageFriendRequest = async(friendId,dispatch,chatToken) => {
    let result=null;
    dispatch(setLoading(true))
    const toastId = toast.loading("Loading...")
    try{
        result = await apiConnector("POST",manageFriendRequest_API,{friendId},{
            Authorization: `Bearer ${chatToken}`
        })
        console.log("manageFriendRequest Api response...................",result)
        if(!result.data.success){
            throw new Error(result.data.message)
        }
        dispatch(setUser(result.data.data))
        toast.success(result.data.message)
        // toast.success(" Successfully")
    }
    catch(error){
        console.log("manageFriendRequest Api response...................",result)
        if (error.response && error.response.status === 403) {
            localStorage.removeItem("chatUser");
            localStorage.removeItem("chatToken");
            window.location.href = "/login";
          } else {
            toast.error(error.message);
          }
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
    return result;
}

export const acceptRequest = async(friendId,dispatch,chatToken) => {
    let result=null;
    dispatch(setLoading(true))
    const toastId = toast.loading("Loading...")
    try{
        result = await apiConnector("POST",requestAccept_API,{friendId},{
            Authorization: `Bearer ${chatToken}`
        })
        console.log("acceptRequest Api response...................",result)
        if(!result.data.success){
            throw new Error(result.data.message)
        }
        dispatch(setUser(result.data.data))
        toast.success("You are now friends")
    }
    catch(error){
        result=error
        console.log("acceptRequest Api response...................",result)
        if (error.response && error.response.status === 403) {
            localStorage.removeItem("chatUser");
            localStorage.removeItem("chatToken");
            window.location.href = "/login";
          } else {
            toast.error(error.message);
          }
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
    return result;
}

export const rejectRequest = async(friendId,dispatch,chatToken) => {
    let result=null;
    dispatch(setLoading(true))
    const toastId = toast.loading("Loading...")
    try{
        result = await apiConnector("POST",requestReject_API,{friendId},{
            Authorization: `Bearer ${chatToken}`
        })
        console.log("rejectRequest Api response...................",result)
        if(!result.data.success){
            throw new Error(result.data.message)
        }
        dispatch(setUser(result.data.data))
        toast.success("Request Deleted")
    }
    catch(error){
        console.log("rejectRequest Api response...................",result)
        if (error.response && error.response.status === 403) {
            localStorage.removeItem("chatUser");
            localStorage.removeItem("chatToken");
            window.location.href = "/login";
          } else {
            toast.error(error.message);
          }
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
    return result;
}

export const removeFriend = async(friendId,dispatch,chatToken) => {
    let result=null;
    dispatch(setLoading(true))
    const toastId = toast.loading("Loading...")
    try{
        result = await apiConnector("POST",unFriend_API,{friendId},{
            Authorization: `Bearer ${chatToken}`
        })
        console.log("removeFriend Api response...................",result)
        if(!result.data.success){
            throw new Error(result.data.message)
        }
        dispatch(setUser(result.data.data))
        toast.success("Unfriend Successfully")
    }
    catch(error){
        console.log("removeFriend Api response...................",result)
        if (error.response && error.response.status === 403) {
            localStorage.removeItem("chatUser");
            localStorage.removeItem("chatToken");
            window.location.href = "/login";
          } else {
            toast.error(error.message);
          }
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
    return result;
}