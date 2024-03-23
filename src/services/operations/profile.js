import { setUser } from "../../slices/profileSlice"; 
import { setLoading } from "../../slices/authSlice";
import {toast} from "react-hot-toast"
import { apiConnector } from "../apiconnector";
import {updateProfile_API,updateImage_API,deleteAccount_API,GetAllUser_API,userDetails_API,updatePassword_API} from "../apis"



export const updateProfile = async(data,dispatch,chatToken) => {
    let result=null;
    dispatch(setLoading(true))
    const toastId = toast.loading("Loading...")
    try{
        result = await apiConnector("POST",updateProfile_API,data,{
            Authorization: `Bearer ${chatToken}`
        })
        console.log("updateProfile Api response...................",result)
        if(!result.data.success){
            throw new Error(result.data.message)
        }
        dispatch(setUser(result.data.data))
        toast.success("Profile Updated Successfully")
    }
    catch(error){
        console.log("updateProfile Api response...................",result)
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

export const updateImage = async(data,dispatch,chatToken) => {
    let result=null;
    dispatch(setLoading(true))
    const toastId = toast.loading("Loading...")
    try{
        result = await apiConnector("POST",updateImage_API,data,{
            Authorization: `Bearer ${chatToken}`
        })
        console.log("updateImage Api response...................",result)
        if(!result.data.success){
            throw new Error(result.data.message)
        }
        dispatch(setUser(result.data.data))
        toast.success("Image UpDated Successfully")
    }
    catch(error){
        console.log("updateImage Api response...................",result)
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

export const deleteAccount = async(id,dispatch,navigate,chatToken) => {
    
    let result=null;
    dispatch(setLoading(true))
    const toastId = toast.loading("Loading...")
    try{
        result = await apiConnector("POST",deleteAccount_API,{id},{
            Authorization: `Bearer ${chatToken}`
        })
        console.log("deleteAccount Api response...................",result)
        if(!result.data.success){
            throw new Error(result.data.message)
        }
        
        localStorage.removeItem("chatToken")
        localStorage.removeItem("chatUser")
        toast.success("Account Deleted")
        navigate("/login")
    }
    catch(error){
        console.log("deleteAccount Api response...................",error)
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

export const userDetail = async(data,dispatch,chatToken) => {
    let result=null;
    dispatch(setLoading(true))
    const toastId = toast.loading("Loading...")
    try{
        result = await apiConnector("POST",userDetails_API,data,{
            Authorization: `Bearer ${chatToken}`
        })
        console.log("userDetail Api response...................",result)
        if(!result.data.success){
            throw new Error(result.data.message)
        }
        // dispatch(setUser(result.data.data))
        // toast.success("Image UpDated Successfully")
    }
    catch(error){
        console.log("userDetail Api response...................",result)
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

export const getAllUser = async(dispatch,chatToken) => {
    let result=null;
    dispatch(setLoading(true))
    const toastId = toast.loading("Loading...")
    try{
        result = await apiConnector("GET",GetAllUser_API,null,{
            Authorization: `Bearer ${chatToken}`
        })
        console.log("getAllUser Api response...................",result)
        if(!result.data.success){
            throw new Error(result.data.message)
        }
    }
    catch(error){
        console.log("getAllUser Api response...................",result)
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

export const updatePassword = async(data,dispatch,chatToken) => {
    let result=null;
    dispatch(setLoading(true))
    const toastId = toast.loading("Loading...")
    try{
        result = await apiConnector("POST",updatePassword_API,data,{
            Authorization: `Bearer ${chatToken}`
        })
        console.log("updatePassword Api response...................",result)
        if(!result.data.success){
            throw new Error(result.data.message)
        }
        dispatch(setUser(result.data.data))
        toast.success("Password UpDated Successfully")
    }
    catch(error){
        console.log("updatePassword Api response...................",result)
        toast.error(error.message);
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
    return result;
}

