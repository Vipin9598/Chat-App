import React, { useState } from "react";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import ConfirmationModal from "../components/ConfirmationModal";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaPlus } from "react-icons/fa6";
const Home = () => {
  const { isBlurred } = useSelector((state) => state.auth);
  const [confirmationModalData, setConfirmationModalData] = useState(null);
  const [hamVisible, setHamVisible] = useState(true);

  return (
    <div
      className={`flex relative   ${
        isBlurred ? " backdrop-blur-sm " : ""
      } relative  `}
    >
      <div className="h-full sm:flex hidden ">
        <SideBar setConfirmationModalData={setConfirmationModalData} />
      </div>
      {hamVisible ? (
        <div className="sm:hidden  absolute top-5 left-5 z-5">
          <RxHamburgerMenu onClick={() => {
            setHamVisible(false)
            console.log("clicked")
            
          }} />
        </div>
      ) : (
        <div className="sm:hidden absolute w-fit h-full top-0 left-0">
          <FaPlus onClick={() => setHamVisible(true)} className="rotate-45 " />
        </div>
      )}

      <div className="h-full relative w-full overflow-auto pt-7  overflow-x-hidden mb-5">
        <div className="lg:mx-auto  md:mx-0 w-full ">
          <Outlet />
        </div>
      </div>
      {confirmationModalData && (
        <ConfirmationModal modalData={confirmationModalData} />
      )}
    </div>
  );
};

export default Home;
