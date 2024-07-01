import React from "react";

const Info = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-20 sm:mt-16 mt-10">

      <div className="sm:ml-20 ml-10 space-y-12">
        <div className="flex items-center justify-between">
          <span className="sm:text-[25px] text-[23px] font-semibold">CONTACT</span>
          <button className="bi bi-pencil-square sm:text-[25px] text-[28px] sm:pr-0 pr-10"></button>
        </div>
          <span className="block text-gray-400 sm:text-[25px] text-[23px] font-semibold">EMAIL</span>
          <span className="block text-gray-400 sm:text-[25px] text-[23px] font-semibold">PHONE</span>
          <span className="block text-gray-400 sm:text-[25px] text-[23px] font-semibold">MORE</span>
      </div>

      <div className="sm:ml-0 ml-10 space-y-12 mt-20 sm:mt-0">
        <div className="flex items-center justify-between">
          <span className="sm:text-[25px] text-[23px] font-semibold">INFORMATION</span>
          <button className="bi bi-pencil-square sm:text-[25px] text-[28px] pr-10"></button>
        </div>
          <span className="block text-gray-400 sm:text-[25px] text-[23px] font-semibold">NAME</span>
          <span className="block text-gray-400 sm:text-[25px] text-[23px] font-semibold">PROFILNAME</span>
          <span className="block text-gray-400 sm:text-[25px] text-[23px] font-semibold">LANGUAGES</span>
          <span className="block text-gray-400 sm:text-[25px] text-[23px] font-semibold">STUDY-COURSE</span>
      </div>

    </div>
  );
};

export default Info;
