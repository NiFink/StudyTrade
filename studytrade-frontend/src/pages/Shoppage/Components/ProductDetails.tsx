import React, { useEffect, useRef } from "react";
import { Product } from "../../../interfaces/Product";

// Define the ProductDetailsProps interface
interface ProductDetailsProps {
  product: Product;
  toggleDetails: () => void;
  isDetailsOpen: boolean;
}

// Define the ProductDetails component
function ProductDetails({
  product,
  toggleDetails,
  isDetailsOpen,
}: ProductDetailsProps) {
  // Create a ref to the details div
  const detailsRef = useRef<HTMLDivElement>(null);

  // Convert the creation date to a more readable format
  const date = new Date(product.creationDate);
  const dateConverted =
    date.toLocaleDateString() + " " + date.getHours() + ":" + date.getMinutes();

  useEffect(() => {
    // Handle click event outside the details div
    const handleClickOutside = (event: MouseEvent) => {
      if (
        detailsRef.current &&
        !detailsRef.current.contains(event.target as Node)
      ) {
        toggleDetails();
      }
    };

    // This code runs when the component mounts (is first rendered)
    // Add or remove the event listener based on isDetailsOpen
    if (isDetailsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // This code runs when the component unmounts (is removed from the DOM)
    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleDetails, isDetailsOpen]);

  // Handle closing the details view
  const handleCloseDetails = () => {
    toggleDetails();
  };

  // Truncate text to a maximum of 40 characters
  const truncatedText = (text: string) =>
    text.length > 20 ? text.slice(0, 40) + "..." : text;

  return (
    <>
      <div className="relative">
        {isDetailsOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-40 z-10"></div>
        )}
        <div className="flex relative justify-center items-center z-20">
          <div
            ref={detailsRef}
            className={`fixed top-0 bottom-0 right-0 md:top-2 md:bottom-2 md:right-2 p-2 lg:w-[500px] md:w-full text-center bg-white ${isDetailsOpen ? "" : "hidden"} rounded-lg`}
          >
            <div className="flex p-2 justify-between items-center">
              <button className="p-1.5" onClick={handleCloseDetails}>
                <i className="bi bi-x-lg cursor-pointer" />
              </button>
              <h1 className="mx-auto">{truncatedText(product.name)}</h1>
            </div>
            <div className="max-h-[84vh] overflow-y-scroll">
              <img src={product.img} alt={product.name} className="w-full" />
              <div className="flex mt-2 p-2 justify-center">
                <i className="bi bi-person-fill "></i>
                <h1 className="text-l ">{product.username}</h1>
              </div>
              <hr />

              <h1 className="text-xl font-bold p-2">{product.name}</h1>
              {product.condition === "new" ? (
                <div className="p-2">
                  <h1 className="border-2 border-green-500 rounded-lg text-green-600">
                    {product.condition}
                  </h1>
                </div>
              ) : null}
              {product.condition === "nearly new" ? (
                <div className="p-2">
                  <h1 className="border-2 border-yellow-500 rounded-lg text-yellow-600">
                    {product.condition}
                  </h1>
                </div>
              ) : null}
              {product.condition === "used" ? (
                <div className="p-2">
                  <h1 className="border-2 border-orange-500 rounded-lg text-orange-600">
                    {product.condition}
                  </h1>
                </div>
              ) : null}

              <hr />
              <div className="flex text-left p-2 ">
                <h1 className="font-bold">Price:</h1>
                <p className="pl-2">{product.price}€</p>
              </div>
              <hr />
              <div className="flex text-left p-2">
                <h1 className="font-bold">Offer created:</h1>
                <p className="pl-2">{dateConverted}</p>
              </div>
              <hr />
              <div className="flex text-left p-2 outline-1">
                <h1 className="font-bold">Category:</h1>
                <p className="pl-2">{product.category.join(", ")}</p>
              </div>
              <hr />
              <div className="text-left p-2 ">
                <h1 className="font-bold">Details:</h1>
                <p>{product.description}</p>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 left-0 p-2">
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
