import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { likePost } from "../services/operations/post"
import {toast} from "react-hot-toast"
import { addComment } from '../services/operations/post';
import ViewCommentModal from './ViewCommentModal';
import Embed from 'react-embed';
import MediaDisplay from './MediaDisplay';

const PostCard = ({post}) => {
    const {chatUser} = useSelector((state)=>state.profile)
    const {chatToken}=useSelector((state)=>state.auth)
    const [commentModalData,setCommentModalData] = useState(null)
    const dispatch = useDispatch()
    const [comment,setComment] = useState("")
    const changeHandler = (e) => {
      setComment(e.target.value);
    }
 
    async function likeHandler(postId){
        try{
            const result = await likePost(postId,dispatch,chatToken)


        }
        catch(error){
            toast.error(error.message)
        }
    }

    const commentHandler = async() => {
      const postId = post._id;
      const result = await addComment({comment,postId},dispatch,chatToken)
      setComment("");
    }
  return (
    <div className='flex flex-col p-5 gap-3 relative '>
      <div className='flex  items-center justify-start gap-5'>
        <div className='rounded-full overflow-hidden  '>
        <img src={post.user.image}  className=' aspect-square h-[30px] rounded-full'/>
        </div>
        <div className=''>
            {`${post.user.firstName} ${post.user.lastName}`}
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <div className=' overflow-hidden rounded-md h-[24rem]'>
            <MediaDisplay url={post.post} />
        </div>
        <div className='flex flex-col gap-2'>
            <p>{post.desc}</p>
            <div className='flex gap-4  items-center'>
            {
                 post.likes.includes(chatUser._id) ? (<FaHeart onClick={()=>likeHandler(post._id)}  className='text-red-500 hover:cursor-pointer'/>) : (<FaRegHeart 
                    onClick={()=>likeHandler(post._id)}   className=' hover:cursor-pointer' />)
                 
            }
            <FaComment className='hover:cursor-pointer' onClick={()=>setCommentModalData(post)}/>
            </div>
            <p>{post.likes.length}</p>
            <p className='text-white opacity-75 hover:cursor-pointer' onClick={()=>setCommentModalData(post)}>View All Comment {post.comments.length}</p>
            <div  className='relative w-[100%]'>
            <input  placeholder='Add a comment' onChange={changeHandler}  value={comment}          className='px-2 py-1 w-full rounded-lg relative bg-slate-700'>  
              </input>
              {
                comment.length>0 && <button className='absolute right-5 top-1 ' onClick={commentHandler}>Post</button>
              }
            </div>
        </div>
      </div>

      {
        commentModalData && <ViewCommentModal post={commentModalData} setCommentModalData={setCommentModalData}/>
      }
    </div>
  )
}

export default PostCard
