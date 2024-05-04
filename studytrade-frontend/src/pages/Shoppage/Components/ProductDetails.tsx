import React, { useEffect, useRef } from "react";

interface Product {
  name: string;
  description: string;
  category: string[];
  condition: string;
  price: number;
  img: string;
  productId: number;
  creationDate: string;
}

interface ProductDetailsProps {
  product: Product;
  toggleDetails: () => void;
  isDetailsOpen: boolean;
}

function ProductDetails({
  product,
  toggleDetails,
  isDetailsOpen,
}: ProductDetailsProps) {
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        detailsRef.current &&
        !detailsRef.current.contains(event.target as Node)
      ) {
        toggleDetails();
      }
    };

    if (isDetailsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleDetails, isDetailsOpen]);

  const handleCloseDetails = () => {
    toggleDetails();
    
  };

  return (
    <>
      <div className="relative">
        {isDetailsOpen && (
          <div className="fixed top-0 left-0 w-full h-full  bg-gray-800 bg-opacity-40 z-1"></div>
        )}
        <div
          className="flex justify-center items-center"
          style={{ zIndex: isDetailsOpen ? 21 : 1 }}
        >
          <div
            ref={detailsRef}
            className={`fixed top-0 bottom-0 right-0 p-2 lg:w-[500px] md:w-full text-center bg-white ${isDetailsOpen ? "" : "hidden"}`}
          >
            <div className="flex p-2 justify-between items-center">
              <button className="p-1.5" onClick={handleCloseDetails}>
                <i className="bi bi-x-lg cursor-pointer" />
              </button>
              <h1 className="mx-auto">{product.name}</h1>
            </div>
            <div className="max-h-[84vh] overflow-y-scroll">
              <img src={product.img} alt={product.name} className="w-full"/>
              <div className="flex mt-2  p-2 justify-center">
              <i className="bi bi-person-fill "></i>
                <h1 className="text-l ">{product.name}</h1>
              </div>
              <hr />


              <h1 className="text-xl font-bold p-2">{product.name}</h1>
              {product.condition === "new" ? (
                <div className="p-2">
                  <h1 className="border-2 border-green-500 rounded-lg text-green-600">{product.condition}</h1>
                </div>
              ) : null}
              {product.condition === "nearly new" ? (
                <div className="p-2">
                  <h1 className="border-2 border-yellow-500 rounded-lg text-yellow-600">{product.condition}</h1>
                </div>
              ) : null}
              {product.condition === "used" ? (
                <div className="p-2">
                  <h1 className="border-2 border-orange-500 rounded-lg text-orange-600">{product.condition}</h1>
                </div>
              ) : null}


              <hr />
              <div className="flex text-left p-2 ">
                <h1 className="font-bold">Price:</h1>
                <p className="pl-2">{product.price}</p>
              </div> 
              <hr />
              <div className="flex text-left p-2">
                <h1 className="font-bold">Offer created:</h1>
                <p className="pl-2">{product.creationDate}</p>
              </div>
              <hr />           
              <div className="flex text-left p-2 outline-1">
                <h1 className="font-bold">Category:</h1>
                <p className="pl-2">{product.category}</p>
              </div>
              <hr />
              <div className="text-left p-2 ">
                <h1 className="font-bold">Details:</h1>
                <p >{product.description}</p>
              </div>

            </div>
            <div className="absolute bottom-0 right-0 left-0 p-4">
              <div className="flex justify-evenly text-center text-white font-bold">
                <button className="bg-red-400 w-2/5 p-2 rounded-lg ">
                  make an offer
                </button>
                <button className="bg-red-400 w-2/5 p-2 rounded-lg">
                  <i className="bi bi-heart cursor-pointer"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
