import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MediaDisplay from "../components/MediaDisplay";
import ViewCommentModal from "../components/ViewCommentModal";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { IoCloudUploadOutline } from "react-icons/io5";
import { deletePost } from "../services/operations/post";
import { MdOutlineCancel } from "react-icons/md";
import { updateImage,updateProfile } from "../services/operations/profile";
import ConfirmationModal from "../components/ConfirmationModal";

const Profile = () => {
  const { chatUser } = useSelector((state) => state.profile);
  const { chatToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [commentModalData, setCommentModalData] = useState(null);
  const [confirmationModalData, setConfirmationModalData] = useState(null);
  const [userImage, setUserImage] = useState("");//currrent or selected image
  const [newImage, setNewImage] = useState(null);//updated image
  const [updatedProfileData,setUpdatedProfileData] = useState({
    firstName:"",
    lastName:""
  })
  const videoRef = useRef(null);

  useEffect(() => {
    setUserImage(chatUser.image);
  }, []);
  const check = (url) => {
    return /\.(jpeg|jpg|gif|png)$/i.test(url);
  };

  async function deletePostHandler(id) {
    const result = await deletePost(id, dispatch, chatToken);
    setConfirmationModalData(null);
  }
  const fileInputRef = useRef(null);

  const handleEditIconClick = () => {
    fileInputRef.current.click(); // Trigger click event on file input
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUserImage(URL.createObjectURL(file));
      setNewImage(file);
    }
    event.target.value = "";
  };
  function cancelHandler() {
    setUserImage(chatUser.image);
    setNewImage(null);
  }

  async function updateUserImage() {
    const formData = new FormData();
    formData.append("image", newImage);
    const result = await updateImage(formData, dispatch, chatToken);
    setNewImage(null);
  }

  function changeHandler(event){
    setUpdatedProfileData((prevData)=>{
      return({
        ...prevData,[event.target.name]:event.target.value
      })
    })
    console.log(updatedProfileData);
  }

  async function updateProfileDetails(){
    const result = await updateProfile(updatedProfileData,dispatch,chatToken)
  }
  

  return (
    <div className="flex flex-col items-center max-h-screen pt-12 px-2 ">
      {/* //for center allignmwent */}
      <div className="xl:w-[70%] lg:w-[80%] md:w-[90%] mx-auto flex flex-col gap-5">
        <div className="w-full mx-auto flex justify-center sm:gap-10 gap-5 items-center py-5">
          <div className="relative">
            <img
              src={userImage}
              className="rounded-full sm:h-[8rem] h-[4rem] aspect-square"
            />
            {/* <CiEdit onClick={updateImage} className="absolute sm:bottom-0 -bottom-3 right-0 text-xl hover:cursor-pointer" /> */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <CiEdit
              onClick={handleEditIconClick}
              className="absolute sm:bottom-0 -bottom-3 right-0 text-xl hover:cursor-pointer"
            />
            {newImage && (
              <div className="flex gap-4 pt-2">
                <IoCloudUploadOutline
                  onClick={updateUserImage}
                  className="text-xl text-blue-300 hover:cursor-pointer"
                />
                <MdOutlineCancel
                  onClick={cancelHandler}
                  className="text-xl text-blue-300 hover:cursor-pointer"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2 sm:text-lg text-sm">
            <div className=" flex sm:gap-5 gap-3 items-center ">
              <p>
                {chatUser.firstName} {chatUser.lastName}
              </p>
              {/* <button className="px-2 py-1 bg-slate-600 rounded-lg">
                Edit Name
              </button> */}
            </div>
            <div className="flex sm:gap-5 gap-3">
              <p>{chatUser.posts.length} Posts</p>
              <p>{chatUser.friends.length} friends</p>
            </div>
          </div>

          
        </div>
        <div className="pb-5 border-b flex flex-col gap-5">
            <p className="text-xl font-semibold">Update Name</p>
            <div className=" flex sm:flex-row flex-col justify-between">

              <div className="flex flex-col gap-3 sm:w-[40%]">
                <label htmlFor="firstName">First Name</label>
                <input required={true} placeholder={chatUser.firstName} value={updatedProfileData.firstName} name="firstName" onChange={changeHandler}   className="  bg-slate-500 rounded-md placeholder:text-white px-5 py-1"/>
              </div>

              <div className="flex flex-col gap-3  sm:w-[40%]">
                <label htmlFor="lastName">Last Name</label>
                <input  required={true} placeholder={chatUser.lastName} name="lastName" value={updatedProfileData.lastName} onChange={changeHandler} className="  bg-slate-500 rounded-md placeholder:text-white px-5 py-1"/>
              </div>

            </div>
            <div className="w-full flex justify-end">
            <button onClick={updateProfileDetails} className="px-2 py-1 text-black bg-slate-400 w-fit rounded-md ">
              Update Name
            </button>
            </div>
          </div>
        <div className="flex flex-col gap-10">
          <p className=" text-lg py-5">All Posts</p>
          <div className=" grid sm:grid-cols-2 profilePost grid-cols-1 lg:grid-cols-3 gap-2 pb-10">
            {chatUser.posts.map((post) =>
              check(post.post) ? (
                <div className=" relative h-[20rem] rounded-md overflow-hidden cursor-pointer">
                  <img
                    src={post.post}
                    onClick={() => setCommentModalData(post)}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-2 right-2 p-2 rounded-full bg-black hover:scale-105 transition-all duration-150  hover:cursor-pointer">
                    <MdDelete
                      onClick={() =>
                        setConfirmationModalData({
                          text1: "Are You Sure ?",
                          text2: "You want to delete the post",
                          btn1Text: "Delete Post",
                          btn2Text: "Cancel",
                          btn1Handler: () => deletePostHandler(post._id),
                          btn2Handler: () => setConfirmationModalData(null),
                        })
                      }
                      className="  text-red-800 text-xl"
                    />
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <video
                    controls={false}
                    ref={videoRef}
                    onClick={() => setCommentModalData(post)}
                    className="rounded-md cursor-pointer w-full h-[20rem] object-cover hover:cursor-pointer"
                  >
                    <source src={post.post} type="video/mp4" />
                  </video>
                  <div className="absolute top-2 right-2 p-2 rounded-full bg-black hover:scale-105 transition-all duration-150  hover:cursor-pointer">
                    <MdDelete
                      onClick={() =>
                        setConfirmationModalData({
                          text1: "Are You Sure ?",
                          text2: "You want to delete the post",
                          btn1Text: "Delete Post",
                          btn2Text: "Cancel",
                          btn1Handler: () => deletePostHandler(post._id),
                          btn2Handler: () => setConfirmationModalData(null),
                        })
                      }
                      className="  text-red-800 text-xl"
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      {commentModalData && (
        <ViewCommentModal
          post={commentModalData}
          setCommentModalData={setCommentModalData}
        />
      )}

      {confirmationModalData && (
        <ConfirmationModal modalData={confirmationModalData} />
      )}
    </div>
  );
};

export default Profile;
