import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import MediaDisplay from "../components/MediaDisplay";
import ViewCommentModal from "../components/ViewCommentModal";
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const { chatUser } = useSelector((state) => state.profile);
  const [commentModalData,setCommentModalData] = useState(null)
  const navigate = useNavigate()
  console.log("/............../",chatUser)
  const videoRef = useRef(null);
  const check = (url) => {
    return /\.(jpeg|jpg|gif|png)$/i.test(url);
  };
  return (
    <div className="flex flex-col items-center max-h-screen pt-12 px-2 ">
      {/* //for center allignmwent */}
      <div className="xl:w-[70%] lg:w-[80%] md:w-[90%] mx-auto flex flex-col gap-5">
        <div className="w-full mx-auto flex justify-center sm:gap-10 gap-5 items-center py-5 border-b">
          <img src={chatUser.image} className="rounded-full sm:h-[8rem] h-[4rem] aspect-square" />
          <div className="flex flex-col gap-2 sm:text-lg text-sm">
            <div className=" flex sm:gap-5 gap-3 items-center ">
              <p>
                {chatUser.firstName} {chatUser.lastName}
              </p>
              <button className="px-2 py-1 bg-slate-600 rounded-lg"  onClick={()=>navigate("/edit-profile")}>Edit Profile</button>
            </div>
            <div className="flex sm:gap-5 gap-3">
              <p>{chatUser.posts.length} Posts</p>
              <p>{chatUser.friends.length} friends</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <p className=" text-lg py-5">All Posts</p>
          <div className=" grid sm:grid-cols-2 profilePost grid-cols-1 lg:grid-cols-3 gap-2 pb-10">
            {chatUser.posts.map((post) =>
              check(post.post) ? (
                <div className="h-[20rem] rounded-md overflow-hidden cursor-pointer">
                  <img src={post.post} onClick={()=>setCommentModalData(post)} className="h-full w-full object-cover" />
                </div>
              ) : (
                <video
                  controls={false}
                  ref={videoRef}
                  onClick={()=>setCommentModalData(post)}
                  className="rounded-md cursor-pointer w-full h-[20rem] object-cover hover:cursor-pointer"
                >
                  <source src={post.post} type="video/mp4" />
                  
                </video>
              )
            )}
          </div>
        </div>
      </div>
      {
        commentModalData && <ViewCommentModal post={commentModalData} setCommentModalData={setCommentModalData}/>
      }
    </div>
  );
};

export default Profile;
