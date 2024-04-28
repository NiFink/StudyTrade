import React, { useEffect, useRef } from "react";

interface Product {
  id: number;
  name: string;
  price: string;
  details: string;
  imageSrc: string;
  imageAlt: string;
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
          style={{ zIndex: isDetailsOpen ? 20 : 1 }}
        >
          <div
            ref={detailsRef}
            className={`fixed top-0 bottom-0 right-0 p-2 w-[500px]  text-center bg-white ${isDetailsOpen ? "" : "right-[-1000px]"}`}
          >
            <div className="flex p-2 justify-between items-center">
              <button className="p-1.5" onClick={handleCloseDetails}>
                <i className="bi bi-x-lg cursor-pointer" />
              </button>
              <h1 className="mx-auto">{product.name}</h1>
            </div>
            <div className="max-h-[84vh] overflow-y-scroll">
              <img src={product.imageSrc} alt={product.imageAlt} />
              <div className="flex justify-between mt-2 font-bold">
                <h1 className=" mx-auto text-xl ">{product.name}</h1>
                <h1 className="text-l">
                    {product.price}
                </h1>
              </div>
              
              <p className="p-4">{product.details}</p>
            </div>
            <div className="absolute bottom-0 right-0 left-0 p-4">
              <div className="flex justify-evenly text-center text-white font-bold">
                <button className="bg-red-400 w-2/5 p-2 rounded-lg ">
                    {product.price}
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
