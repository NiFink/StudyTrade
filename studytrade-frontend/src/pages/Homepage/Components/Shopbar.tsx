interface ShopbarProps {
    shoppageClick?: () => void;
    profilepageClick?: () => void;
}

{/* displays the different sites of the website at the end of the landingpage */}
function Shopbar({ shoppageClick, profilepageClick }: ShopbarProps) {
    return (
        <div className="mx-8 lg:mx-8 lg:my-[5vh] mt-[6vh] lg:mt-0 md:mt-[20vh]">
            <div className="flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:space-x-7 text-white text-4xl lg:h-[80vh] h-[70vh] overflow-hidden justify-center items-center ">
                
                <button onClick={shoppageClick} className="w-full lg:w-1/3 h-1/3 lg:h-full rounded-lg relative overflow-hidden flex justify-center items-center">
                    <img className="absolute inset-0 w-full h-full object-cover rounded-lg hover:rotate-3 hover:scale-125 transition-transform duration-500" src="./images/shopcoversmall.jpg" alt="" />
                    <div className="my-8 z-10 relative mt-3 font-bold">Shop</div>
                </button>

                <button onClick={shoppageClick} className="w-full lg:w-1/3 h-1/3 lg:h-full rounded-lg relative overflow-hidden flex justify-center items-center">
                    <img className="absolute inset-0 w-full h-full object-cover rounded-lg hover:rotate-3 hover:scale-125 transition-transform duration-500" src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg" alt="" />
                    <div className="my-8 z-10 relative mt-3 font-bold">Favorites</div>
                </button>

                <button onClick={profilepageClick} className="w-full lg:w-1/3 h-1/3 lg:h-full rounded-lg relative overflow-hidden flex justify-center items-center">
                    <img className="absolute inset-0 w-full h-full object-cover rounded-lg hover:rotate-3 hover:scale-125 transition-transform duration-500 my-6 mx-8" src="./images/profilcover.jpg" alt="" />
                    <div className="my-8 z-10 relative mt-3 font-bold">Profile</div>
                </button>
            </div>
        </div>
    );
}


export default Shopbar;
