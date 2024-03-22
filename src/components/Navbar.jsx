import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaPlus } from "react-icons/fa6";
import SideBar from "./SideBar";

const Navbar = ({ setConfirmationModalData }) => {
  const [hamVisible, setHamVisible] = useState(true);
  return (
    <div className=" sm:hidden absolute top-0 left-0 w-full py-3   px-4 flex justify-between z-20 bg-black">
      <p>Chat-App</p>
      {hamVisible ? (
        <div
          onClick={() => {
            setHamVisible(false);
            console.log("clicked");
          }}
          className=" "
        >
          <RxHamburgerMenu />
        </div>
      ) : (
        <div className="fixed top-0 right-0 py-3   px-4 h-full bg-black transition-all duration-200">
          <div className="flex justify-end" onClick={() => setHamVisible(true)}>
            <FaPlus className="rotate-45 " />
          </div>
          <div onClick={() => setHamVisible(true)}>
            <SideBar  setConfirmationModalData={setConfirmationModalData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
