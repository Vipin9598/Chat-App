const Base_url = process.env.REACT_APP_BASE_URL


//auth

export const LogIn_API = Base_url+"auth/login"
export const SignUp_API = Base_url + "auth/signup"
export const sendOTP_API = Base_url + "auth/send-otp"
export const  resetPassword_API = Base_url + "auth/reset-password"
export const resetPasswordToken_API = Base_url + "auth/reset-password-token"
export const updatePassword_API = Base_url + "auth/update-password"

// profile 

export const updateProfile_API = Base_url + "profile/update-profile"
export const updateImage_API = Base_url + "profile/update-image"
export const deleteAccount_API = Base_url + "profile/delete-account"
export const GetAllUser_API = Base_url + "profile/get-all-user"
export const userDetails_API = Base_url + "profile/user-details"


//post

export const createPost_API = Base_url + "post/create-post"
export const deletePost_API = Base_url + "post/delete-post"
export const addComment_API = Base_url + "post/add-comment"
export const deleteComment_API = Base_url + "post/delete-comment"
export const likePost_API = Base_url + "post/like-post"
export const fetchAllPost_API = Base_url + "post/fetch-all-posts"

//request

export const manageFriendRequest_API = Base_url + "friendrequest/manage-friend-request"
export const requestAccept_API = Base_url + "friendrequest/accept-request"
export const unFriend_API = Base_url + "friendrequest/unfriend"
export const requestReject_API = Base_url + "friendrequest/reject-request"