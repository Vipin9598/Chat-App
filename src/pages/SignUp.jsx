import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { setSignUpData } from "../slices/authSlice";
import { sendOtp } from "../services/operations/auth";

const SignUp = () => {
    const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading} = useSelector((state)=>state.auth)
  const [accountType, setAccountType] = useState("Student");
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function changeHandler(event) {
    setformData((prevdata) => {
      return {
        ...prevdata,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function submitHandler(event) {
    event.preventDefault();
    console.log("aa gyae send krne")
    if (formData.password != formData.confirmPassword) {
      toast.error("Password Not Matched");
      return;
    }
    const otp = Math.floor(Math.random()*9999);
    const data = {...formData,generatedOTP:otp}
    console.log(data)
    await dispatch(setSignUpData(data));
    await dispatch(sendOtp(formData.email, otp,navigate));
  }

  const [showPassword, setshowPassword] = useState(false);
  const [showconfirmPassword, setshowconfirmPassword] = useState(false);
  return (
    <div className="sm:w-9/12 w-11/12 pb-10 mx-auto min-h-screen pt-5 flex flex-col justify-center items-center ">
      <div className="flex flex-col sm:justify-center sm:w-auto w-full gap-2  ">
        <p className="text-center mb-16 md:text-2xl sm:text-xl font-bold text-yellow-500 ">Welcome To Chat App</p>
        {/* <div className="px-2 py-1 rounded-full text-richblack-300 bg-slate-900 w-fit flex gap-1 mb-1">
          <button
            className={`px-4 py-1 rounded-full ${
              accountType === "Student"
                ? "bg-slate-700"
                : "bg-slate-900"
            }`}
            onClick={() => {
              setAccountType("Student");
            }}
          >
            Student
          </button>
          <button
            className={`px-4 py-1 rounded-full ${
              accountType === "Instructor"
              ? "bg-slate-700"
              : "bg-slate-900"
            }`}
            onClick={() => {
              setAccountType("Instructor");
            }}
          >
            Instructor
          </button>
        </div> */}
        <form onSubmit={submitHandler} className="flex flex-col  gap-2">
          <div className="flex gap-5 sm:flex-row flex-col justify-between  ">
            <label className=" flex flex-col gap-1 ">
              <p className=" text-richblack-200 md:text-xl sm:text-lg text-md">
                First Name <sup className=" text-white">*</sup>
              </p>
              <input
                type="text"
                placeholder="Enter First Name"
                required
                name="firstName"
                value={formData.firstName}
                onChange={changeHandler}
                className="w-full rounded-full px-3 mt-1 sm:text-xl py-1 placeholder:text-richblack-500 placeholder:opacity-80 border-b border-white bg-slate-900"
              />
            </label>

            <label className="flex flex-col gap-1">
              <p className=" text-richblack-200 md:text-xl sm:text-lg text-md">
                Last Name <sup className="text-white">*</sup>
              </p>
              <input
                type="text"
                placeholder="Enter Last Name"
                required
                name="lastName"
                value={formData.lastName}
                onChange={changeHandler}
                className="w-full rounded-full px-3 mt-1 py-1 sm:text-xl placeholder:text-richblack-500 placeholder:opacity-80 border-b border-white bg-slate-900"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1">
            <p className=" text-richblack-200 md:text-xl sm:text-lg text-md">
              Email Address<sup>*</sup>
            </p>
            <input
              type="email"
              placeholder="Enter email here"
              required
              name="email"
              value={formData.email}
              onChange={changeHandler}
              className=" rounded-full px-3 mt-1 py-1 sm:text-xl placeholder:text-richblack-500 placeholder:opacity-80 border-b border-white bg-slate-900"
            />
          </label>
          <div className="flex gap-5 sm:flex-row justify-between flex-col signUpPassword ">
            <label className="  flex flex-col gap-1 relative ">
              <p className=" text-richblack-200 md:text-xl sm:text-lg text-md">
                Password <sup>*</sup>
              </p>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                required
                name="password"
                value={formData.password}
                onChange={changeHandler}
                className="w-full rounded-full px-3 mt-1 sm:text-xl py-1 placeholder:text-richblack-500 placeholder:opacity-80 border-b border-white bg-slate-900"
              />
              <span
                onClick={() => setshowPassword(!showPassword)}
                className="absolute top-11 right-4 text-white"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="text-richblack-5 text-xl" />
                ) : (
                  <AiOutlineEye className="text-richblack-5 text-xl" />
                )}
              </span>
            </label>

            <label className=" flex flex-col gap-1 relative ">
              <p className=" text-richblack-200  md:text-xl sm:text-lg text-md">
                Confirm Password <sup>*</sup>
              </p>
              <input
                type={showconfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                required
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={changeHandler}
                className="w-full rounded-full px-3 mt-1 sm:text-xl py-1 placeholder:text-richblack-500 placeholder:opacity-80 border-b border-white bg-slate-900"
              />
              <span
                onClick={() => setshowconfirmPassword(!showconfirmPassword)}
                className="absolute top-11 right-4 text-white"
              >
                {showconfirmPassword ? (
                  <AiOutlineEyeInvisible className="text-richblack-5 text-xl" />
                ) : (
                  <AiOutlineEye className="text-richblack-5 text-xl" />
                )}
              </span>
            </label>
          </div>

          <button
            disabled={loading}
            className="text-white bg-yellow-300 rounded-full mt-2  py-1"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
