import React from 'react';

interface ArrowProps {
    arrowClick?: () => void;
    scrollToShopbar: () => void;
}

const Arrow = ({ arrowClick}: ArrowProps) => {
    return (
        <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden z-0">
      <img src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2832&amp;q=80" alt="Background" className="absolute inset-0 w-full h-full" />
      <div className="text-9xl mb-14 -ml-8 font-semibold relative z-10 text-white">
        StudyTrade
      </div>
      <button
        type="button"
        onClick={arrowClick}
        className="text-black bg-white hover:bg-gray-200 focus:ring-1 focus:outline-none focus:ring-gray-500 font-medium rounded-full text-xl p-6 text-center inline-flex items-center me-6 border border-black rotate-90 w-32 h-32 relative z-10"
      >
        <svg className="w-24 h-24" aria-hidden="true" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
      </button>
    </div>
    );
};

export default Arrow;
