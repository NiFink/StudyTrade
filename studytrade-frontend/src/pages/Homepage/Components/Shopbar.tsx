import React from 'react';

interface ShopbarProps {
    shoppageClick?: () => void;
    profilepageClick?: () => void;
}

function Shopbar({ shoppageClick, profilepageClick }: ShopbarProps) {
    return (
        <div className="mx-5 my-40" id="shopbar">
            <div className="flex space-x-3 text-black text-4xl h-[1000px]">
                <button onClick={shoppageClick} className="w-1/4 rounded-lg relative overflow-hidden flex justify-center items-center">
                    <img className="absolute inset-0 w-full h-full object-cover rounded-lg hover:rotate-3 hover:scale-125 transition-transform duration-500" src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg" alt="" />
                    <div className="my-8 z-10 relative mt-3 font-bold">Recommended</div>
                </button>
                
                <button onClick={shoppageClick} className="w-1/4 rounded-lg hover:text-6xl relative overflow-hidden flex justify-center items-center">
                    <img className="absolute w-full h-full object-cover rounded-lg hover:rotate-3 hover:scale-125 transition-transform duration-500" src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg" alt="" />
                    <div className="my-8 z-10 relative mt-3  text-4xl font-bold">Shop</div>
                </button>
                
                <button onClick={shoppageClick} className="w-1/4 rounded-lg hover:text-6xl relative overflow-hidden flex justify-center items-center">
                    <img className="absolute inset-0 w-full h-full object-cover rounded-lg hover:rotate-3 hover:scale-125 transition-transform duration-500" src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg" alt="" />
                    <div className="my-8 z-10 relative mt-3  text-4xl font-bold">Favorites</div>
                </button>
                
                <button onClick={profilepageClick} className="w-1/4 rounded-lg hover:text-6xl relative overflow-hidden flex justify-center items-center">
                    <img className="absolute inset-0 w-full h-full object-cover rounded-lg hover:rotate-3 hover:scale-125 transition-transform duration-500" src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2832&amp;q=80" alt="" />
                    <div className="my-8 z-10 relative mt-3  text-4xl font-bold text-white">Profile</div>
                </button>
            </div>
        </div>
    );
}

export default Shopbar;
