import React from 'react'
import { matchPath, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'


const linkData = [
  {
    name:"Home",
    path:"/",
  },
  {
    name:"Create",
    path:"/create-post",
  },
  {
    name:"Profile",
    path:"/profile",
  },
  {
    name:"Setting",
    path:"/setting",
  },
]
const SideBar = () => {
  const location = useLocation();
  const matchRoute =(route)=>{
    return matchPath({path:route},location.pathname)
}
  return (
    <div className='w-full  min-h-screen h-full min-w-[12em] flex flex-col items-center gap-20 pt-[30px] border-r border-b border-opacity-50'>
      <p className='font-bold text-xl text-blue-300'>Chat-App</p>
      <div className='flex flex-col gap-5 w-fit '>
        {
          linkData.map((link,index)=>{
            return (
              <Link className={ `bg- px-5 text-lg ${matchRoute(link.path) && " text-blue-300 underline"} `} key={index}  to={link.path}>
                
                {link.name}</Link>
            )
          })
        }
      </div> 
    </div>
  )
}

export default SideBar
