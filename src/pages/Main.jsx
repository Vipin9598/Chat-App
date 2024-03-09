import React, { useEffect, useState } from "react";
import { fetchAllPost } from "../services/operations/post";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import PostCard from "../components/PostCard";
import { getAllUser } from "../services/operations/profile";

const Main = () => {
  const dispatch = useDispatch();
  const { chatToken } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]);
  const {chatUser} = useSelector((state)=>state.profile)
  let result = null;

  useEffect(() => {
    const fetchPost = async () => {
      result = await fetchAllPost(dispatch, chatToken);
      const suggestedFriend = await getAllUser(dispatch,chatToken)
      console.log(suggestedFriend.data.data,"dsbafukh")
      // await setFriends(suggestedFriend.data.data)
      await setPosts(result.data.data);
    };
    fetchPost();
  },[chatUser]);

  return (
    <div className=" flex flex-col items-center max-h-screen">
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex justify-between">
          <div className="md:w-[60%] lg:w-[50%]">
          { posts.map((post, index) => (
            <PostCard post={post} key={index}/>
          ))}
        </div>
        <div className="lg:w-[40%] md:w-[35%] w-0 md:pl-10 "> 
            <p>Friend Suggestion</p>
            <div className="flex flex-col gap-2">
            {
              friends.map((friend)=>{
                <p>{`${friend.firstName} ${friend.lastName}`}</p>
              })
            }
            </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default Main;
