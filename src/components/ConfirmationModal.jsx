import React from 'react'

const ConfirmationModal = ({modalData}) => {

  return (
    <div className='fixed  top-0 left-0 h-full w-full flex justify-center items-center  '>
       <div className="text-slate-50  bg-opacity-100 sm:px-5 px-3 sm:py-5 py-1 min-w-fit flex flex-col sm:gap-8 gap-3 outline outline-1 rounded-lg bg-black   ">
      <div className="flex flex-col sm:gap-5  gap-2">
        <p>{modalData.text1}</p>
        <p>{modalData.text2} </p>
      </div>
      <div className="flex sm:gap-20 gap-10">
        <button
          onClick={modalData?.btn1Handler}
          className=" bg-yellow-500 text-slate-700 rounded-lg font-semibold sm:px-2 px-[2px] py-1 hover:scale-95 w-fit transition-all duration-200"
        >
          {modalData.btn1Text}
        </button>

        <button
          onClick={modalData?.btn2Handler}
          className="bg-slate-700 text-slate-5 sm:px-2 px-[2px] py-1 rounded-lg"
        >
          {modalData.btn2Text}
        </button>
      </div>
    </div>
    </div>
  )
}

export default ConfirmationModal
