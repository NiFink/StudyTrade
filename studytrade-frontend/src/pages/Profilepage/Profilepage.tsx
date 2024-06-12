import React, { useEffect, useState } from "react";
import Favorites from "./Components/Favorites";
import YourProduct from "./Components/YourProduct";
import ProductDetails from "../Shoppage/Components/ProductDetails";

interface ProfilepageProps {
  homepageClick?: () => void;
}

interface Product {
  name: string;
  description: string;
  category: string[];
  condition: string;
  price: number;
  img: string;
  productId: number;
  creationDate: string;
  userId: { username: string };
}

interface AuthUser {
  userId: number;
  username: string;
  password: string;
  mail: string;
  creationDate: string;
  profileImage: string;
  createdProducts: number[];
  favorites: number[];
  verificationCode: string;
  isEnabled: boolean;
}

function Profilepage({ homepageClick }: ProfilepageProps) {
  const [activeButton, setActiveButton] = useState<string>("activity");
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [created, setCreated] = useState<Product[]>([]);
  const [authUser, setAuthUser] = useState<AuthUser>();

  const fetchAuthUser = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/users/3`);
      const data = await response.json();
      setAuthUser(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const fetchFavorites = async () => {
    if (authUser && authUser.favorites && authUser.favorites.length > 0) {
      try {
        const queryString = createQueryString(authUser.favorites);
        const response = await fetch(
          `http://localhost:8080/api/v1/products/multiple?${queryString}`
        );
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    } else {
      setFavorites([]); // Ensure favorites is an empty array if no favorites
    }
  };

  const fetchCreated = async () => {
    if (
      authUser &&
      authUser.createdProducts &&
      authUser.createdProducts.length > 0
    ) {
      try {
        const queryString = createQueryString(authUser.createdProducts);
        console.log(createQueryString);
        const response = await fetch(
          `http://localhost:8080/api/v1/products/multiple?${queryString}`
        );
        const data = await response.json();
        setCreated(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    } else {
      setCreated([]); // Ensure favorites is an empty array if no favorites
    }
  };

  const createQueryString = (productIds: number[] = []) => {
    return productIds.map((id) => `productId=${id}`).join("&");
  };

  useEffect(() => {
    fetchAuthUser();
  }, []);

  useEffect(() => {
    fetchFavorites();
    fetchCreated();
  }, [authUser]);

  return (
    <div className="min-h-screen bg-white">


      {/* Large image above */}
      <div className="relative w-full h-80">
        <div
          className="absolute inset-0 bg-fixed bg-cover bg-center"
          style={{ backgroundImage: "url(./images/hdm_picture2.jpg)" }}
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
      <div className="ml-96 pt-2">
        <div className="flex flex-col">
          <span className="text-black font-bold text-[23px] leading-6">
            {authUser?.username}
          </span>
          {/*<span className="text-gray-400 text-[19px]">@hansi</span>*/}
        </div>
      </div>

      {/* info button */}
      <div className="relative">
        <div className="absolute top-10 right-0 bottom-20 flex justify-end items-center">
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
        <div className="absolute top-10 right-64 bottom-20 flex justify-end items-center">
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
      <div className="relative w-full h-6 mt-28 bg-gray-200">
        <div className="absolute inset-0 bg-gray-200 shadow-inner"></div>
      </div>

      <Favorites favorites={favorites}></Favorites>
      <YourProduct created={created}></YourProduct>
    </div>
  );
}

export default Profilepage;
