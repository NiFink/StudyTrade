import React, { useState } from "react";

interface ProfilepageProps {
  homepageClick?: () => void;
}

function Profilepage({ homepageClick }: ProfilepageProps) {
  const [activeButton, setActiveButton] = useState<string>("activity");

  return (
    <div className="min-h-screen bg-white">


      {/* Large image above */}
      <div className="relative w-full h-80">
        <div
          className="absolute inset-0 bg-fixed bg-cover bg-center"
          style={{ backgroundImage: 'url(./images/hdm_picture2.jpg)' }}
        >
          <div className="absolute inset-0 bg-black opacity-20"></div>
        </div>

      {/* Profile picture */}
        <div className="absolute top-80 left-72 transform -translate-x-1/2 -translate-y-1/2">
          <img
            src="./images/wireless_headphones.jpg"
            alt=""
            className="w-[150px] h-[150px] rounded-full border-4 border-white"
          />
        </div>
      </div>

      {/* Profile names */}
      <div className="ml-96 pt-3">
        <div className="flex flex-col">
          <span className="text-black font-bold text-[23px] leading-6">
            Hans Müller
          </span>
          <span className="text-gray-400 text-[19px]">@hansi</span>
        </div>
      </div>

      {/* info button */}
      <div className="relative">
        <div className="absolute top-2 right-0 bottom-20 flex justify-end items-center">
          <button
            className={`text-black w-64 h-36 hover:bg-gray-200 active:bg-gray-300 ${
              activeButton === "info" ? "border-b-2 border-black" : ""
            }`}
            onClick={() => setActiveButton("info")}
          >
            <div className="mt-6 leading-3">
              <i className="bi bi-info-circle text-gray-500 text-[40px]"></i>
            </div>
            <div className="">
              <span className="text-gray-400 text-[21px]">Info</span>
            </div>
          </button>
        </div>
      </div>

      {/* activity button */}
      <div className="relative">
        <div className="absolute top-2 right-64 bottom-20 flex justify-end items-center">
          <button
            className={`text-black w-64 h-36 hover:bg-gray-200 active:bg-gray-300 ${
              activeButton === "activity" ? "border-b-2 border-black" : ""
            }`}
            onClick={() => setActiveButton("activity")}
          >
            <div className="mt-6 leading-3">
              <i className="bi bi-bag text-gray-500 text-[40px]"></i>
            </div>
            <div className="">
              <span className="text-gray-400 text-[21px]">Activity</span>
            </div>
          </button>
        </div>
      </div>

      {/* Indented gray strip */}
      <div className="relative w-full h-6 mt-20 bg-gray-200">
        <div className="absolute inset-0 bg-gray-200 shadow-inner"></div>
      </div>

      {/* favorite-grids */}
      <div className="mt-36 px-4 lg:px-32 flex flex-wrap gap-4 relative">
        <div className="absolute -mt-20 left-56 transform -translate-x-1/2 flex items-center">
          <i className="bi bi-bag-heart text-black text-[55px]"></i>
          <span className="text-black font-bold text-[23px] ml-2 mt-3">
            Your favorites:
          </span>
        </div>
        <div className="bg-gray-200 h-[250px] w-[250px] rounded-lg"></div>
        <div className="bg-gray-200 h-[250px] w-[250px] rounded-lg"></div>
        <div className="bg-gray-200 h-[250px] w-[250px] rounded-lg"></div>
        <div className="bg-gray-200 h-[250px] w-[250px] rounded-lg"></div>
      </div>

      {/* product-grids */}
      <div className="mt-40 px-4 lg:px-32 flex flex-wrap gap-4">
        <div className="absolute -mt-20 left-56 transform -translate-x-1/2 flex items-center">
          <i className="bi bi-bag-plus text-black text-[55px]"></i>
          <span className="text-black font-bold text-[23px] ml-2 mt-3">
            Your products:
          </span>
        </div>
        <div className="bg-gray-200 h-[250px] w-[250px] rounded-lg"></div>
        <div className="bg-gray-200 h-[250px] w-[250px] rounded-lg"></div>
        <div className="bg-gray-200 h-[250px] w-[250px] rounded-lg"></div>
        <div className="bg-gray-200 h-[250px] w-[250px] rounded-lg flex justify-center items-center">
          <i className="bi bi-plus text-black text-[100px]"></i>
        </div>
      </div>
    </div>
  );
}

export default Profilepage;
