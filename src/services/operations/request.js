import { setUser } from "../../slices/profileSlice"; 
import { setLoading } from "../../slices/authSlice";
import  {setIsBlurred} from "../../slices/authSlice"
import {toast} from "react-hot-toast"
import { apiConnector } from "../apiconnector";

import {manageFriendRequest_API,requestAccept_API,unFriend_API,requestReject_API} from "../apis"

export const manageFriendRequest = async(data,dispatch,chatToken) => {
    const result=null;
    dispatch(setLoading(true))
    const toastId = toast.loading("Loading...")
    try{
        result = await apiConnector("POST",manageFriendRequest_API,data,{
            Authorization: `Bearer ${chatToken}`
        })
        console.log("manageFriendRequest Api response...................",result)
        if(!result.data.success){
            throw new Error(result.data.message)
        }
        dispatch(setUser(result.data.data))
        // toast.success(" Successfully")
    }
    catch(error){
        console.log("manageFriendRequest Api response...................",result)
        toast.error(error.message);
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
    return result;
}

export const acceptRequest = async(data,dispatch,chatToken) => {
    const result=null;
    dispatch(setLoading(true))
    const toastId = toast.loading("Loading...")
    try{
        result = await apiConnector("POST",requestAccept_API,data,{
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
        console.log("acceptRequest Api response...................",result)
        toast.error(error.message);
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
    return result;
}

export const rejectRequest = async(data,dispatch,chatToken) => {
    const result=null;
    dispatch(setLoading(true))
    const toastId = toast.loading("Loading...")
    try{
        result = await apiConnector("POST",requestReject_API,data,{
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
        toast.error(error.message);
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
    return result;
}

export const removeFriend = async(data,dispatch,chatToken) => {
    const result=null;
    dispatch(setLoading(true))
    const toastId = toast.loading("Loading...")
    try{
        result = await apiConnector("POST",unFriend_API,data,{
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
        toast.error(error.message);
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
    return result;
}