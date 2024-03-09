import React, { useState } from 'react'
import Spinner from '../components/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {BsArrowLeft} from "react-icons/bs"
import { resetPassword } from '../services/operations/auth'

const AddnewPassword = () => {
   const navigate = useNavigate();
  const {id} = useParams()
    const [formData,setFormData]=useState({
        newPassword:"",
        confirmNewPassword:""
    })
    const [showPassword,setShowPassword] = useState(false)
    const [showConfirmPassword,setShowConfirmPassword] = useState(false)
    
    const {loading} = useSelector((state)=>state.auth)
    const dispatch = useDispatch();
    function submitHandler(event) {
        event.preventDefault();
        dispatch(resetPassword(formData.newPassword,formData.confirmNewPassword,id,navigate))
      }

    function changeHandler(event){
        setFormData((prevData)=>{
            return{
                ...prevData,
                [event.target.name]:event.target.value
            }
        })
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
               Welcome to Reset your Password
          </h1>
          {/* <p className=" md:text-lg sm:text-md  text-sm  text-center">
            Hello : Welcome to Reset your Password
          </p> */}
          <form onSubmit={submitHandler} className="flex flex-col gap-5 mt-2">
             
              <label className="flex flex-col gap-2 text-start">
                <p className="md:text-lg text-md">New Password<sup className=" text-pink-700 text-2xl">*</sup></p>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={changeHandler}
                  onClick={()=>setShowPassword(!showPassword)}
                  placeholder="Enter New Password"
                  className="p-2 rounded-md  text-black bg-richblack-600"
                />
              </label>

              <label className="flex flex-col gap-2 text-start">
                <p className="md:text-lg text-md">Confirm New Password<sup className=" text-pink-700 text-2xl">*</sup></p>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  name="confirmNewPassword"
                  value={formData.confirmNewPassword}
                  onChange={changeHandler}
                  onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
                  placeholder="Enter Confirm Password"
                  className="p-2 rounded-md  text-black bg-richblack-600"
                />
              </label>
            
            <button type="submit" className=" bg-yellow-300 text-richblack-900    rounded-md md:py-2 py-1 px-10 ">
              Update Password
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

export default AddnewPassword
