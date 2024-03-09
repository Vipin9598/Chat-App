import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { likePost } from "../services/operations/post"
import {toast} from "react-hot-toast"

const PostCard = ({post}) => {
    
    const {chatUser} = useSelector((state)=>state.profile)
    const {chatToken}=useSelector((state)=>state.auth)
    const dispatch = useDispatch()

    async function likeHandler(postId){
        try{
            const result = await likePost(postId,dispatch,chatToken)

        }
        catch(error){
            toast.error(error.message)
        }
    }
  return (
    <div className='flex flex-col p-5 gap-3'>
      <div className='flex  items-center justify-start gap-5'>
        <div className='rounded-full overflow-hidden pl-5 '>
        <img src={post.user.image}  className=' aspect-square h-[30px] rounded-full'/>
        </div>
        <div className=''>
            {`${post.user.firstName} ${post.user.lastName}`}
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <div className=' overflow-hidden rounded-md'>
            <img src={post.post} />
        </div>
        <div className='flex flex-col gap-2'>
            <p>{post.desc}</p>
            <div className='flex gap-4  items-center'>
            {
                 post.likes.includes(chatUser._id) ? (<FaHeart onClick={()=>likeHandler(post._id)}  className='text-red-500 hover:cursor-pointer'/>) : (<FaRegHeart 
                    onClick={()=>likeHandler(post._id)}   className=' hover:cursor-pointer' />)
                 
            }
            <FaComment className='hover:cursor-pointer'/>
            </div>
            <p>{post.likes.length}</p>
            <p className='text-white opacity-75 hover:cursor-pointer'>View All Comment</p>
        </div>
      </div>
    </div>
  )
}

export default PostCard
