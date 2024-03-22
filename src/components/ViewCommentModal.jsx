import React from "react";
import { FaPlus } from "react-icons/fa6";

const ViewCommentModal = ({ post, setCommentModalData }) => {
  const check = (url) => {
    return /\.(jpeg|jpg|gif|png)$/i.test(url);
  };
  return (
    <div className=" fixed top-0 left-0 flex flex-col gap-5 justify-center items-center rounded-lg h-screen w-screen bg-black border border-slate-400 pl-5 py-5 z-50   ">
      <div className="flex flex-col gap-5 lg:w-[60%] w-[100%] h-[30rem] ">
        <div className="">
          <FaPlus
            onClick={() => setCommentModalData(null)}
            className=" rotate-45 text-white cursor-pointer"
          />
        </div>
        <div className="flex justify-evenly ">
          <div className="sm:flex hidden flex-col gap-5  ">
            <div className="overflow-hidden rounded-md ">
              {
                check(post.post) ? (
                  <div className="h-[20rem] rounded-md overflow-hidden cursor-pointer">
                    <img src={post.post} className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <video
                    controls={true}
                    
                    loop={true}
                    
                    className="rounded-md cursor-pointer w-full h-[20rem] object-cover hover:cursor-pointer"
                  >
                    <source src={post.post} type="video/mp4" />
                    
                  </video>
                )
              }
            </div>
          </div>
          <div className="h-full   overflow-y-scroll flex flex-col sm:items-start items-center gap-5 p-5 sm:ml-5">
            {post.comments.length>0 ? (
              post.comments.map((comment,index) => (
                <div key={index} className="flex gap-5  w-[100%]">
                  <div className="rounded-full overflow-hidden flex gap-5 ">
                    <img
                      src={comment.user.image}
                      className=" aspect-square h-[30px] rounded-full"
                    />
                    <p>
                      {comment.user.firstName} {comment.user.lastName} <span className=" text-slate-500 ">{comment.comment}</span>
                    </p>
                  </div>
                </div>
              ))
            ):<p>No Comments Yet</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCommentModal;





// import React from "react";
// import { FaPlus } from "react-icons/fa6";

// const ViewCommentModal = ({ post, setCommentModalData }) => {
//   return (
//     <div className="fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-black bg-opacity-50 z-50">
//       <div className="bg-white rounded-lg w-[90%] max-w-xl h-[80%] max-h-[600px] overflow-hidden shadow-lg">
//         <div className="flex justify-between items-center p-4">
//           {/* <h2 className="text-xl font-semibold">{post.title}</h2> */}
//           <button onClick={() => setCommentModalData(null)} className="text-gray-500 hover:text-gray-700 focus:outline-none">
//             <FaPlus className="text-xl" />
//           </button>
//         </div>
//         <div className="overflow-y-auto flex">
//           <img src={post.post} className="w-[50%] h-[100%]" alt="Post" />
//           <div className="px-4 py-2">
//             {post.comments.map((comment, index) => (
//               <div key={index} className="flex items-center mb-3  text-black">
//                 <img src={comment.user.image} className="w-10 h-10 rounded-full mr-3" alt="User" />
//                 <div>
//                   <p className="text-sm font-medium">{comment.user.firstName} {comment.user.lastName}</p>
//                   <p className="text-gray-700">{comment.comment}</p> 
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewCommentModal;

