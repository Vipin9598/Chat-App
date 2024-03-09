import React,{useState} from 'react'
import SideBar from '../components/SideBar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ConfirmationModal from "../components/ConfirmationModal"
const Home = () => {
  const {isBlurred} = useSelector((state)=>state.auth)
  const [confirmationModal,setConfirmationModal] = useState(null)
  return (
    <div
      className={`flex h-[calc(100vh-3.5rem)] ${
        isBlurred ? " backdrop-blur-sm " : ""
      } relative  overflow-hidden`}
    >
      <div className="h-full md:flex hidden ">
        <SideBar setConfirmationModal={setConfirmationModal} />
      </div>
      <div className="h-full relative w-full overflow-auto  overflow-x-hidden mb-5">
        <div className="lg:mx-auto  md:mx-0 w-full   pt-5 ">
          <Outlet />
          <div className="absolute top-[20%] sm:left-[30%] leftClassSideModal  sm:min-w-[350px] min-w-[250px] ">
            {confirmationModal && (
              <ConfirmationModal modalData={confirmationModal} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
