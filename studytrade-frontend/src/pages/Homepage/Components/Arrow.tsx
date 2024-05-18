import React from 'react';

interface ArrowProps {
    arrowClick?: () => void;
    scrollToShopbar: () => void;
}

const Arrow = ({ arrowClick}: ArrowProps) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen" style={{backgroundImage: 'url("/hdm-logo.png")',  backgroundSize: 'cover'}}>
            <div className="text-9xl mb-14 -ml-8 font-semibold">
                StudyTrade
            </div>
            <button type="button" onClick={arrowClick} className="text-black bg-white hover:bg-gray-200 focus:ring-1 focus:outline-none focus:ring-gray-500 font-medium rounded-full 
            text-xl p-6 text-center inline-flex items-center me-6 border border-black rotate-90 w-32 h-32">
                <svg className="w-24 h-24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </button>
        </div>
    );
};

export default Arrow;
