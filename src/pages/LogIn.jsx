import React, { useState } from 'react'
import {AiOutlineEye} from "react-icons/ai"
import {AiOutlineEyeInvisible} from "react-icons/ai"
import {toast} from "react-hot-toast"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/operations/auth';

const LogIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading} = useSelector((state)=>state.auth)
    const [formData,setFormData] = useState({
        email:"",password:""
    })
    const [showpassword,setshowpassword] = useState(false)

    function changeHandler(event) {
        setFormData((prevdata) => {
          return {
            ...prevdata,
            [event.target.name]: event.target.value,
          };
        });
      }

      
    async function submitHandler(event){
      // const {email,password} = formData
        event.preventDefault();
        dispatch(login(formData,navigate))
        // console.log("formData printing ",result)
    }
  return (
    <div className="sm:w-9/12 w-11/12 min-h-screen mx-auto my-auto flex flex-col justify-center items-center">
        <div className='mb-20 sm:text-2xl'>
            <p className='font-bold'>Log In To Chat-App :</p>
        </div>
        <form onSubmit={submitHandler} className='lg:w-[50%] sm:w-[80%] w-full h-auto  flex flex-col gap-5 relative' >
      <label className='text-richblack-200'>
        <p>Email Address <sup className='text-red-500'>*</sup></p>
        <input 
            type='email'
            required
            placeholder='Enter Email Here'
            name='email'
            value={formData.email}
            onChange={changeHandler}
            className='w-full  text-white rounded-full sm:text-lg px-3 mt-1 py-1 placeholder:text-richblack-500 placeholder:opacity-80 border-b border-white bg-slate-900'
        />

      </label>

      <label  className='text-richblack-200 relative'>
        <p>Password <sup className='text-red-500'>*</sup></p>
        <input 
            type={showpassword?"text":"password"}
            required
            placeholder='Enter Password'
            name='password'
            value={formData.password}
            onChange={changeHandler}
            className='w-full rounded-full text-white sm:text-lg px-3 mt-1 py-1  placeholder:text-richblack-500 placeholder:opacity-80 border-b border-white bg-slate-900'
        />
        <span
          onClick={() => setshowpassword(!showpassword)}
          className=" absolute right-2 text-blue-100 top-8 "
        >
          {showpassword ? <AiOutlineEyeInvisible className="text-white text-2xl" /> : <AiOutlineEye className="text-white text-2xl" />}
        </span>
      </label>

      <button disabled={loading} className='text-white bg-yellow-300 rounded-full mt-3 py-1' type='submit'>Sign In</button>

      <div  >
      <button disabled={loading} className='absolute bottom-[-20%] sm:right-[12rem] right-[9rem] sm:text-lg  underline ' onClick={()=>navigate("/signup")}>
        Create Account
      </button>

      <button disabled={loading} className='absolute bottom-[-20%] right-2  underline sm:text-lg' onClick={()=>navigate("/forgot-password")}>
        Forgot Password
      </button>
      </div>

    </form>
    </div>
  )
}

export default LogIn
