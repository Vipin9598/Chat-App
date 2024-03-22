import React, { useEffect, useState } from "react";
import { fetchAllPost } from "../services/operations/post";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import PostCard from "../components/PostCard";
import { getAllUser } from "../services/operations/profile";
import { acceptRequest, manageFriendRequest, rejectRequest, removeFriend } from "../services/operations/request";

const Main = () => {
  const dispatch = useDispatch();
  const { chatToken } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState(null);
  const { chatUser,posts } = useSelector((state) => state.profile);

  const friendHandler = async (friendId) => {
    const result = await manageFriendRequest(friendId, dispatch, chatToken);
  };

  const acceptFriendRequest = async(friendId) => {
    const result = await acceptRequest(friendId,dispatch,chatToken)
  }

  const rejectFriendRequest = async(friendId) => {
    const result = await rejectRequest(friendId,dispatch,chatToken)
  }

  const removefriend = async(friendId)=>{
    const result = await removeFriend(friendId,dispatch,chatToken)
  }

  useEffect(() => {
    async function fetchPost(){
      setLoading(true);
      let result = await fetchAllPost(dispatch, chatToken);
      const suggestedFriend = await getAllUser(dispatch, chatToken);
      console.log(".....................",suggestedFriend)
      if(result && suggestedFriend){
        var friendList = suggestedFriend.data.data
      const index = friendList.findIndex((data)=>data._id == chatUser._id)
      if(index!==-1){
        friendList.splice(index,1)
      }
      }
      
      setFriends(friendList);
      setLoading(false);
    }
    fetchPost();
  }, []);

  const isFriend = (id) => {
    return chatUser.friends.some((user) => user._id === id);
  };

  return (
    <div className="flex flex-col items-center max-h-screen">
      {loading  ? (
        <Spinner />
      ) : (
        <div className="flex  justify-evenly w-full">
          <div className=" lg:w-[40%] md:w-[55%] sm:w-[70%] ">
            { posts && posts.map((post, index) => (
              <PostCard post={post} key={index} />
            ))}
          </div>

          <div className="md:flex hidden flex-col gap-5 pt-5">
            <div className=" md:flex flex-col  hidden gap-5  border border-slate-400 rounded-lg h-fit  p-5 md:pl-10 mr-5">
              <p>Friend Suggestion</p>
              <div className="flex flex-col gap-2">
                {friends && friends.map((friend,index) => (
                  <div key={index}>
                    <div className="flex  gap-5">
                      <div className="rounded-full overflow-hidden  ">
                        <img
                          src={friend.image}
                          className=" aspect-square h-[35px] rounded-full"
                        />
                      </div>
                      <div>
                        <p>{`${friend.firstName} ${friend.lastName}`}</p>
                        <p
                          className="text-blue-400 hover:cursor-pointer"
                        >
                          {isFriend(friend._id) ? (
                            <span onClick={() => removefriend(friend._id)}>Remove Friend</span>
                          ) : (
                            <span onClick={() => friendHandler(friend._id)}>Add Friend</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

           {chatUser?.requestReview?.length>0 &&
             <div className=" md:flex flex-col   hidden gap-5  border border-slate-400 rounded-lg h-fit  p-5 md:pl-10 mr-5">
             <p>Friend Request Review</p>
             {chatUser &&
               chatUser.requestReview.map((friend)=>(
                 <div>
                 <div className="flex  gap-5">
                   <div className="rounded-full overflow-hidden  ">
                     <img
                       src={friend.image}
                       className=" aspect-square h-[35px] rounded-full"
                     />
                   </div>
                   <div>
                     <p>{`${friend.firstName} ${friend.lastName}`}</p>
                     <div className="flex gap-5">
                     <p
                       className="text-blue-400 hover:cursor-pointer"
                       onClick={() => acceptFriendRequest(friend._id)}
                     >
                       Accept
                     </p>
                     <p
                       className="text-blue-400 hover:cursor-pointer"
                       onClick={() => rejectFriendRequest(friend._id)}
                     >
                       Delete
                     </p>
                     </div>
                   </div>
                 </div>
               </div>
               ))
             }      
         </div>
           }

            { chatUser?.requestSent?.length >0 &&
              <div className=" md:flex flex-col   hidden gap-5  border border-slate-400 rounded-lg h-fit  p-5 md:pl-10 mr-5">
              <p>Friend Request Sent</p>
              {
                chatUser.requestSent.map((friend)=>(
                  <div>
                  <div className="flex  gap-5">
                    <div className="rounded-full overflow-hidden  ">
                      <img
                        src={friend.image}
                        className=" aspect-square h-[35px] rounded-full"
                      />
                    </div>
                    <div>
                      <p>{`${friend.firstName} ${friend.lastName}`}</p>
                      <div className="flex gap-5">
                      <p
                        className="text-blue-400 hover:cursor-pointer"
                        onClick={() => friendHandler(friend._id)}
                      >
                        Delete
                      </p>
                
                      </div>
                    </div>
                  </div>
                </div>
                ))
              }      
          </div>
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
