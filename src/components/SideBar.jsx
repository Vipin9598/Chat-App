import React, { useState } from "react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import ConfirmationModal from "./ConfirmationModal";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {deleteAccount} from "../services/operations/profile"

const linkData = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Create",
    path: "/create-post",
  },
  {
    name: "Profile",
    path: "/profile",
  },
  {
    name: "Setting",
    path: "/edit-profile",
  },
];
const SideBar = ({ setConfirmationModalData }) => {
  const location = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const {chatToken} = useSelector((state)=>state.auth)
  const {chatUser} = useSelector((state)=>state.profile)
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  function logOutHandler() {
    localStorage.removeItem("chatUser");
    localStorage.removeItem("chatToken");
    localStorage.removeItem("posts");
    setConfirmationModalData(null);
    navigate("/login");
  }

  async function deleteHandler(){
    const result = await deleteAccount(chatUser._id,dispatch,navigate,chatToken)
  }

  return (
    <div className="w-full  h-screen  overflow-hidden min-w-[12em] flex flex-col items-center justify-between gap-20 py-[30px] border-r border-opacity-50">
      <div className="flex flex-col items-center gap-20">
        <p className="font-bold text-xl text-blue-300">Chat-App</p>
        <div className="flex flex-col gap-5 w-fit ">
          {linkData.map((link, index) => {
            return (
              <Link
                className={`bg- px-5 text-lg ${
                  matchRoute(link.path) && " text-blue-300 underline"
                } `}
                key={index}
                to={link.path}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
      <div className=" flex flex-col gap-2">
        <div
          onClick={() =>
            setConfirmationModalData({
              text1: "Are You Sure ?",
              text2: "You want to Log-Out",
              btn1Text: "Log-Out",
              btn2Text: "Cancel",
              btn1Handler: () => logOutHandler(),
              btn2Handler: () => setConfirmationModalData(null),
            })
          }
          className="flex gap-2 justify-center items-center hover:cursor-pointer hover:text-blue-300 "
        >
          <MdOutlineLogout />
          <p>Log-Out</p>
        </div>
        <div
          onClick={() =>
            setConfirmationModalData({
              text1: "Are You Sure ?",
              text2: "You want to Delete Account",
              btn1Text: "Delete Account",
              btn2Text: "Cancel",
              btn1Handler: () => deleteHandler(),
              btn2Handler: () => setConfirmationModalData(null),
            })
          }
          className="flex gap-2 justify-center items-center hover:cursor-pointer hover:text-blue-300 "
        >
          <MdDeleteOutline />
          <p>Account</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
