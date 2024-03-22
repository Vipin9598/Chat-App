import { setUser, setPost } from "../../slices/profileSlice";
import { setLoading } from "../../slices/authSlice";
import { setIsBlurred } from "../../slices/authSlice";
import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import {
  createPost_API,
  deletePost_API,
  addComment_API,
  deleteComment_API,
  likePost_API,
  fetchAllPost_API,
} from "../apis";

export const createPost = async (data, dispatch, chatToken) => {
  let result = null;
  dispatch(setLoading(true));
  const toastId = toast.loading("Loading...");
  try {
    result = await apiConnector("POST", createPost_API, data, {
      Authorization: `Bearer ${chatToken}`,
    });
    console.log("Create Post Api response...................", result);
    if (!result.data.success) {
      throw new Error(result.data.message);
    }
    dispatch(setUser(result.data.data));
    dispatch(setPost(result.data.post));
    toast.success("Post Created Successfully");
  } catch (error) {
    console.log("Create Post Api response...................", result);
    if (error.response && error.response.status === 403) {
        localStorage.removeItem("chatUser");
        localStorage.removeItem("chatToken");
        window.location.href = "/login";
      } else {
        toast.error(error.message);
      }
  }
  dispatch(setLoading(false));
  toast.dismiss(toastId);
  return result;
};

export const deletePost = async (postId, dispatch, chatToken) => {
  let result = null;
  dispatch(setLoading(true));
  const toastId = toast.loading("Loading...");
  try {
    result = await apiConnector(
      "POST",
      deletePost_API,
      { postId },
      {
        Authorization: `Bearer ${chatToken}`,
      }
    );
    console.log("Delete Post Api response...................", result);
    if (!result.data.success) {
      throw new Error(result.data.message);
    }
    dispatch(setUser(result.data.data));
    dispatch(setPost(result.data.post));
    toast.success("Post Deleted Successfully");
  } catch (error) {
    console.log("Delete Post Api response...................", result);
    if (error.response && error.response.status === 403) {
        localStorage.removeItem("chatUser");
        localStorage.removeItem("chatToken");
        window.location.href = "/login";
        toast.error("Session Out Login Again")
      } else {
        toast.error(error.message);
      }
  }
  dispatch(setLoading(false));
  toast.dismiss(toastId);
  return result;
};

export const addComment = async (data, dispatch, chatToken) => {
  let result = null;
  dispatch(setLoading(true));
  const toastId = toast.loading("Loading...");
  try {
    result = await apiConnector("POST", addComment_API, data, {
      Authorization: `Bearer ${chatToken}`,
    });
    console.log("Add Comment Api response...................", result);
    if (!result.data.success) {
      throw new Error(result.data.message);
    }
    dispatch(setUser(result.data.data));
    dispatch(setPost(result.data.post));
    toast.success("Comment Successfully");
  } catch (error) {
    console.log("Add Comment Api response...................", result);
    if (error.response && error.response.status === 403) {
        localStorage.removeItem("chatUser");
        localStorage.removeItem("chatToken");
        window.location.href = "/login";
      } else {
        toast.error(error.message);
      }
  }
  dispatch(setLoading(false));
  toast.dismiss(toastId);
  return result;
};

export const deleteComment = async (data, dispatch, chatToken) => {
  const result = null;
  dispatch(setLoading(true));
  const toastId = toast.loading("Loading...");
  try {
    result = await apiConnector("POST", deleteComment_API, data, {
      Authorization: `Bearer ${chatToken}`,
    });
    console.log("Delete Comment Api response...................", result);
    if (!result.data.success) {
      throw new Error(result.data.message);
    }
    dispatch(setUser(result.data.data));
    dispatch(setPost(result.data.post));
    toast.success("comment Deleted  Successfully");
  } catch (error) {
    console.log("Delete Comment Api response...................", result);
    if (error.response && error.response.status === 403) {
        localStorage.removeItem("chatUser");
        localStorage.removeItem("chatToken");
        window.location.href = "/login";
      } else {
        toast.error(error.message);
      }
  }
  dispatch(setLoading(false));
  toast.dismiss(toastId);
  return result;
};

export const likePost = async (postId, dispatch, chatToken) => {
  let result = null;
  // dispatch(setLoading(true))
  // const toastId = toast.loading("Loading...")
  try {
    result = await apiConnector(
      "POST",
      likePost_API,
      { postId },
      {
        Authorization: `Bearer ${chatToken}`,
      }
    );
    console.log("Like Post Api response...................", result);
    if (!result.data.success) {
      throw new Error(result.data.message);
    }
    dispatch(setUser(result.data.data));
    dispatch(setPost(result.data.post));
    // toast.success("Li Successfully")
  } catch (error) {
    console.log("Add Comment Api response...................", result);
    if (error.response && error.response.status === 403) {
        localStorage.removeItem("chatUser");
        localStorage.removeItem("chatToken");
        window.location.href = "/login";
      } else {
        toast.error(error.message);
      }
  }
  dispatch(setLoading(false));
  // toast.dismiss(toastId)
  return result;
};

export const fetchAllPost = async (dispatch, chatToken) => {
  dispatch(setLoading(true));
  let result;
  const toastId = toast.loading("Loading...");
  try {
    result = await apiConnector("GET", fetchAllPost_API, null, {
      Authorization: `Bearer ${chatToken}`,
    });
    console.log("Fetch All Post Api response...................", result);
    if (!result.data.success) {
      throw new Error(result.data.message);
    }
    dispatch(setUser(result.data.data));
    dispatch(setPost(result.data.post));
  } catch (error) {
    console.log("fetch all post  Api response...................", error);
    if (error.response && error.response.status === 403) {
      localStorage.removeItem("chatUser");
      localStorage.removeItem("chatToken");
      window.location.href = "/login";
      toast.error("Session Out Login Again")
    } else {
      toast.error(error.message);
    }
  }
  dispatch(setLoading(false));
  toast.dismiss(toastId);
  return result;
};
