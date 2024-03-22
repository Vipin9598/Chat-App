import React, { useState } from "react";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import ConfirmationModal from "../components/ConfirmationModal";
import Navbar from "../components/Navbar";

const Home = () => {
  const { isBlurred } = useSelector((state) => state.auth);
  const [confirmationModalData, setConfirmationModalData] = useState(null);

  return (
    <div>
      <Navbar setConfirmationModalData={setConfirmationModalData}/>
      <div
        className={`flex relative   ${
          isBlurred ? " backdrop-blur-sm " : ""
        } relative  `}
      >
        <div className="h-full sm:flex hidden border-r border-opacity-50">
          <SideBar setConfirmationModalData={setConfirmationModalData} />
        </div>

        <div className="h-full relative w-full overflow-auto pt-7  overflow-x-hidden mb-5">
          <div className="lg:mx-auto  md:mx-0 w-full ">
            <Outlet />
          </div>
        </div>
        
      </div>
      {confirmationModalData && (
          <ConfirmationModal modalData={confirmationModalData} />
        )}
    </div>
  );
};

export default Home;
