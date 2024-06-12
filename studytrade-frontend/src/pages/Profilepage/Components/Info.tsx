import React from "react";

const Info = () => {
  return (
    <div className="grid grid-cols-2 gap-x-20 mt-16">

        <div className="ml-20 space-y-12">
            <div className="flex items-center justify-between">
                <span className="text-[25px] font-semibold">CONTACT</span>
                <button className="bi bi-pencil-square text-[25px]"></button>
            </div>
            <span className="block text-gray-400 text-[25px] font-semibold">EMAIL</span>
            <span className="block text-gray-400 text-[25px] font-semibold">PHONE</span>
            <span className="block text-gray-400 text-[25px] font-semibold">MORE</span>
        </div>

        <div className="space-y-12">
        <div className="flex items-center justify-between">
                <span className="text-[25px] font-semibold">INFORMATION</span>
                <button className="bi bi-pencil-square text-[25px] mr-14"></button>
            </div>
            <span className="block text-gray-400 text-[25px] font-semibold">NAME</span>
            <span className="block text-gray-400 text-[25px] font-semibold">PROFILNAME</span>
            <span className="block text-gray-400 text-[25px] font-semibold">LANGUAGES</span>
            <span className="block text-gray-400 text-[25px] font-semibold">STUDY-COURSE</span>
        </div>
    </div>
  );
};

export default Info;
