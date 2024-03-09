import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/Spinner'
import { Link, useNavigate } from 'react-router-dom'
import {BsArrowLeft} from "react-icons/bs"
import { signUp } from '../services/operations/auth'

const Otp = () => {
    const {loading} = useSelector((state)=>state.auth)
    const [otp,setOtp] = useState("")
    const dispatch=useDispatch();
    const navigate = useNavigate()
    const {signUpData} = useSelector((state)=>state.auth)
    const submitHandler = async(event) => {
        event.preventDefault();
        const data = {...signUpData,providedOTP:otp}
        await dispatch(signUp(data,navigate));

    }
  return (
    <div className="text-richblack-100 h-screen w-full sm:mx-0  mx-1  flex-shrink-0  flex justify-center items-center">
    <div className="xl:max-w-[27%] lg:max-w-[32%] md:max-w-[40%] sm:max-w-[45%] max-w-[265px]"  >
      {loading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col gap-5 w-full ">
          <h1 className="md:text-3xl  sm:text-2xl text-xl font-semibold text-center">
               Enter OTP 
          </h1>
          
          <form onSubmit={submitHandler} className="flex flex-col gap-5 mt-2">
             
              <label className="flex flex-col gap-2 text-start">
                <p className="md:text-lg text-md">Enter OTP<sup className=" text-pink-700 text-2xl">*</sup></p>
                <input
                  type= "text"
                  required
                  name="otp"
                  value={otp}
                  onChange={(event)=>setOtp(event.target.value)}
                  placeholder="Enter otp"
                  className="p-2 rounded-md  text-black bg-richblack-600"
                />
              </label>
            
            <button type="submit" className=" bg-yellow-300 text-richblack-900    rounded-md md:py-2 py-1 px-10 ">
              Create Account
            </button>
          </form>

          <div>
            <Link to="/login" className="flex gap-2   items-center text-richblack-50">
              <BsArrowLeft/>
              <p>Back to Login</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  </div>
  )
}

export default Otp
