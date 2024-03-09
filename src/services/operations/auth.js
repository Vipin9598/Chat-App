import {updatePassword_API,resetPasswordToken_API,resetPassword_API,sendOTP_API,LogIn_API ,SignUp_API} from "../apis"

import { apiConnector } from "../apiconnector"
import { toast } from "react-hot-toast"
import { setSignUpData } from "../../slices/authSlice"
import { setIsBlurred } from "../../slices/authSlice"
import {setLoading} from "../../slices/authSlice"
import {setGeneratedOTP} from "../../slices/authSlice"
import {setChatToken} from "../../slices/authSlice"
import { setUser } from "../../slices/profileSlice"



export function sendOtp(email,otp, navigate) {
  
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      
      try {
        const response = await apiConnector("POST", sendOTP_API, {
          email,otp
        })
        console.log("SENDOTP API RESPONSE............", response)
  
        if (!response.data.success) {
        //   toast.error(response.data.message)
          throw new Error(response.data.message)  
        }
  
        toast.success("OTP Sent Successfully")
        navigate("/verify-email")
      } catch (error) {
        console.log("SENDOTP API ERROR............", error)
        toast.error("Could Not Send OTP")
        
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }
  
  export function signUp(data,navigate  ) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", SignUp_API,data)
  
        console.log("SIGNUP API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
          toast.error(response.data.message)
        }
        toast.success("Signup Successful")
        navigate("/login")
      } catch (error) {
        console.log("SIGNUP API ERROR............", error)
        toast.error("Try again after Some time")
        navigate("/login")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }
  
  export function login(formData, navigate) {
    console.log("Calll aa gi uh",formData,LogIn_API)
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      let response;
      try {
         response = await apiConnector("POST", LogIn_API, formData)
  
            console.log("LOGIN API RESPONSE............", response)
  
        if (!response.data.success) {        
          throw new Error(response.data.message)    
        }
        toast.success("Login Successful")
        console.log(response.data.token)
        dispatch(setChatToken(response.data.token))

        const userImage = response.data?.data?.image
          ? response.data.data.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
        dispatch(setUser({ ...response.data.user, image: userImage }))
        localStorage.setItem("chatToken", JSON.stringify(response.data.token))
        localStorage.setItem("chatUser",JSON.stringify(response.data.data))

       
        navigate("/")
      } catch (error) {
        console.log("LOGIN API ERROR............", error)
        console.log("respomse",response)
        toast.error(response?.data?.message)
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }
  
  export function getPasswordResetToken(email, setEmailSent) {
    console.log("aa gye bhai")
    return async (dispatch) => {
      console.log("ander aa gye")
      const toastId = toast.loading("Loading...");
      dispatch(setLoading(true));
  
      try {
        const response = await apiConnector("POST", resetPasswordToken_API, 
          email
        );
  
        console.log("RESETPASSTOKEN RESPONSE............", response);
  
        if (response.status === 200 && response.data.success) {
          toast.success("Reset Email Sent");
          setEmailSent(true);
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        console.log("RESETPASSTOKEN ERROR:", error.response ? error.response.data.message : error.message);
        toast.error("Failed To Send Reset Email: " + (error.response ? error.response.data.message : error.message));
      } finally {
        toast.dismiss(toastId);
        dispatch(setLoading(false));
      }
    };
  }
  
  export function resetPassword(newPassword,confirmNewPassword, token, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", resetPassword_API, {
          newPassword,
          confirmNewPassword,
          token,
        })
  
        console.log("RESETPASSWORD RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("Password Reset Successfully")
        navigate("/login")
      } catch (error) {
        console.log("RESETPASSWORD ERROR............", error)
        toast.error(error.message)
      }
      toast.dismiss(toastId)
      dispatch(setLoading(false))
    }
  }
  
  export function logout(navigate) {
    return (dispatch) => {
      dispatch(setChatToken(null))
      dispatch(setUser(null))
      localStorage.removeItem("chatToken")
      localStorage.removeItem("chatUser")
      toast.success("Logged Out")
      navigate("/login")
    }
  }