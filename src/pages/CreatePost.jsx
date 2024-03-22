import React, { useState } from 'react'
import Upload from '../components/Upload'
import {useForm} from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../services/operations/post'


const CreatePost = () => {
  const {chatToken} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState:{errors} 
} = useForm()

  const submitHandler = async(data)=>{
    console.log(".........data",data)
    const postData = new FormData();
    postData.append("Post",data.Post)
    postData.append("desc",data.desc)

    const result = await createPost(postData,dispatch,chatToken)
  }
  return (
    <div className='w-[100%] h-screen  my-0'>
        <form onSubmit={handleSubmit(submitHandler)} className='w-fit  h-full mx-auto flex flex-col gap-3 justify-center '>
          <Upload name="Post" label= "Post" register={register} setValue={setValue} errors={errors}/>
          
          <input
            type='text'
            name="desc"
            className='text-black  bg-slate-500 px-5 py-2 w-full rounded-md'
            placeholder='Enter Your thoughts regarding post'
            {...register("desc",{required:true})}
          />
          {errors.desc && <p>Description is required</p>}
          <button className='w-full bg-blue-400 py-1 rounded-lg text-lg'>Post</button>
        </form>
    </div>
  )
}

export default CreatePost
