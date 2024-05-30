import React from "react";

interface ProfilepageProps {
  homepageClick?: () => void;
}

function Profilepage({ homepageClick }: ProfilepageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Large image above */}
      <div className="relative w-full h-80">
        <div className="absolute inset-0 bg-fixed bg-cover bg-center blur-sm" style={{ backgroundImage: 'url(./images/hdm_picture.jpg)' }}>
          <div className="absolute inset-0 bg-black opacity-35"></div>
        </div>

        {/* Profile picture */}
        <div className="absolute top-80 left-72 transform -translate-x-1/2 -translate-y-1/2">
          <img src="./images/wireless_headphones.jpg" alt="" className="w-[150px] h-[150px] rounded-full border-4 border-white" />
        </div>
      </div>

      {/* Grids */}
      <div className="mt-60 px-4 lg:px-32 flex flex-wrap gap-4 relative">
        <div className="absolute -mt-20 left-56 transform -translate-x-1/2 flex items-center">
          <i className="bi bi-heart text-black text-[55px]"></i>
          <span className="text-black underline text-[20px] ml-2">Deine Favorites:</span>
        </div>
        <div className="bg-gray-200 h-[250px] w-[250px] rounded-lg"></div>
        <div className="bg-gray-200 h-[250px] w-[250px] rounded-lg"></div>
        <div className="bg-gray-200 h-[250px] w-[250px] rounded-lg"></div>
        <div className="bg-gray-200 h-[250px] w-[250px] rounded-lg"></div>
      </div>
      <div className="mt-40 px-4 lg:px-32 flex flex-wrap gap-4">
      <div className="absolute -mt-20 left-56 transform -translate-x-1/2 flex items-center">
          <i className="bi bi-archive text-black text-[55px]"></i>
          <span className="text-black underline text-[20px] ml-2">Deine Produkte:</span>
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
