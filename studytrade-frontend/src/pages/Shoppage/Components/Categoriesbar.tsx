import { useState } from "react";
import React, { useEffect, useRef } from "react";

interface CategoriesbarProps {
  toggleCategories: () => void;
  fetchProducts: () => void;
  isCategoriesOpen: boolean;
  fetchCategoryProducts: (category: string) => void;
}

function Categoriesbar({
  toggleCategories,
  isCategoriesOpen,
  fetchProducts,
  fetchCategoryProducts,
}: CategoriesbarProps) {
  const [zIndex, setZIndex] = useState<number>(1);

  const categoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target as Node)
      ) {
        handleCategoriesClose();
      }
    };

    if (isCategoriesOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleCategories, isCategoriesOpen]);

  const dropdownElectronics = () => {
    const subElectronic = document.querySelector("#subElectronics");
    subElectronic?.classList.toggle("hidden");
    if (!subElectronic?.classList.contains("hidden")) {
      fetchCategoryProducts("Electronics");
    }
    document.querySelector("#arrowElectronics")?.classList.toggle("rotate-180");
  };
  const dropdownClothing = () => {
    const subClothing = document.querySelector("#subClothing");
    subClothing?.classList.toggle("hidden");
    if (!subClothing?.classList.contains("hidden")) {
      fetchCategoryProducts("Clothing");
    }
    document.querySelector("#arrowClothing")?.classList.toggle("rotate-180");
  };

  const dropdownLeisure = () => {
    document.querySelector("#subLeisure")?.classList.toggle("hidden");
    document.querySelector("#arrowLeisure")?.classList.toggle("rotate-180");
  };
  const dropdownHome = () => {
    document.querySelector("#subHome")?.classList.toggle("hidden");
    document.querySelector("#arrowHome")?.classList.toggle("rotate-180");
  };

  const handleCategoriesClose = () => {
    setZIndex(0);
    toggleCategories();
  };
  const filter = () => {
    document.querySelector("#filter")?.classList.toggle("hidden");
  };
  return (
    <div className="flex">
      {isCategoriesOpen && (
        <div className="fixed top-0 left-0 w-full h-full  bg-gray-800 bg-opacity-40 z-10"></div>
      )}
      <div
        ref={categoriesRef}
        className="lg:w-72 "
        style={{ zIndex: isCategoriesOpen ? 20 : 0 }}
      >
        <div
          className={`sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-white ${isCategoriesOpen ? "" : "left-[-300px]"}`}
        >
          <div className="text-sm font-medium text-black"></div>
          <div className="p-2.5 mt-1 flex justify-between">
            <h1
              className="font-bold text-[15px] ml-3 hover:cursor-pointer"
              onClick={() => fetchProducts()}
            >
              Categories
            </h1>
            <i
              className="bi bi-arrow-right lg:hidden cursor-pointer"
              onClick={handleCategoriesClose}
            ></i>
            <button className="pl-3 hidden md:inline-block" onClick={filter}>
              <i className="bi bi-funnel "></i>
            </button>
          </div>

          <hr className="my-2 text-black" />

          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-300">
            <span
              className="text-[15px] ml-4 text-black"
              onClick={() => fetchCategoryProducts("Beauty")}
            >
              Beauty
            </span>
          </div>

          <hr className="my-2 text-black" />

          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-300">
            <span
              className="text-[15px] ml-4 text-black"
              onClick={() => fetchCategoryProducts("Books")}
            >
              Books
            </span>
          </div>

          <hr className="my-2 text-black" />
          {/*Clothing */}
          <div
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-500 cursor-pointer hover:bg-red-300"
            onClick={() => {
              dropdownClothing();
            }}
          >
            <div className="flex justify-between w-full items-center">
              <span className="text-[15px] ml-4 text-black">Clothing</span>
              <span className="text-sm" id="arrowClothing">
                <i className="bi bi-chevron-down"></i>
              </span>
            </div>
          </div>
          <div
            className="text-left text-sm font-thin mt-2 w-4/5 mx-auto text-black hidden"
            id="subClothing"
          >
            <h1
              className="cursor-pointer p-2 hover:bg-red-300 rounded-md mt-1 "
              onClick={() => fetchCategoryProducts("Shirts")}
            >
              Shirts
            </h1>
            <h1
              className="cursor-pointer p-2 hover:bg-red-300 rounded-md mt-1"
              onClick={() => fetchCategoryProducts("Hoddies")}
            >
              Hoddies
            </h1>
            <h1
              className="cursor-pointer p-2 hover:bg-red-300 rounded-md mt-1"
              onClick={() => fetchCategoryProducts("Outerwear")}
            >
              Outerwear
            </h1>
            <h1
              className="cursor-pointer p-2 hover:bg-red-300 rounded-md mt-1"
              onClick={() => fetchCategoryProducts("Dresses")}
            >
              Dresses
            </h1>
            <h1
              className="cursor-pointer p-2 hover:bg-red-300 rounded-md mt-1"
              onClick={() => fetchCategoryProducts("Pants")}
            >
              Pants
            </h1>
            <h1
              className="cursor-pointer p-2 hover:bg-red-300 rounded-md mt-1"
              onClick={() => fetchCategoryProducts("Shoes")}
            >
              Shoes
            </h1>
            <h1
              className="cursor-pointer p-2 hover:bg-red-300 rounded-md mt-1"
              onClick={() => fetchCategoryProducts("ClothingAccessories")}
            >
              Accessories
            </h1>
          </div>

          <hr className="my-2 text-black" />

          {/*Electronics */}
          <div
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-500 cursor-pointer hover:bg-red-300"
            onClick={() => {
              dropdownElectronics();
            }}
          >
            <div className="flex justify-between w-full items-center">
              <span className="text-[15px] ml-4 text-black">Electronics</span>
              <span className="text-sm" id="arrowElectronics">
                <i className="bi bi-chevron-down"></i>
              </span>
            </div>
          </div>
          <div
            className="text-left text-sm font-thin mt-2 w-4/5 mx-auto text-black hidden"
            id="subElectronics"
          >
            <h1
              className="cursor-pointer p-2 hover:bg-red-300 rounded-md mt-1"
              onClick={() => fetchCategoryProducts("Laptop")}
            >
              Laptop
            </h1>
            <h1
              className="cursor-pointer p-2 hover:bg-red-300 rounded-md mt-1"
              onClick={() => fetchCategoryProducts("Smartphone")}
            >
              Smartphone
            </h1>
            <h1
              className="cursor-pointer p-2 hover:bg-red-300 rounded-md mt-1"
              onClick={() => fetchCategoryProducts("TechAccesories")}
            >
              Accesories
            </h1>
            <h1
              className="cursor-pointer p-2 hover:bg-red-300 rounded-md mt-1"
              onClick={() => fetchCategoryProducts("Other Tech")}
            >
              Other Tech
            </h1>
          </div>

          <hr className="my-2 text-black" />

          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-300">
            <span
              className="text-[15px] ml-4 text-black"
              onClick={() => fetchCategoryProducts("Events")}
            >
              Events
            </span>
          </div>

          <hr className="my-2 text-black" />

          {/*Home */}
          <div
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-500 cursor-pointer hover:bg-red-300"
            onClick={() => {
              fetchCategoryProducts("Home");
              dropdownHome();
            }}
          >
            <div className="flex justify-between w-full items-center">
              <span className="text-[15px] ml-4 text-black">Home</span>
              <span className="text-sm" id="arrowHome">
                <i className="bi bi-chevron-down"></i>
              </span>
            </div>
          </div>
          <div
            className="text-left text-sm font-thin mt-2 w-4/5 mx-auto text-black hidden"
            id="subHome"
          >
            <h1
              className="cursor-pointer p-2 hover:bg-red-300 rounded-md mt-1"
              onClick={() => fetchCategoryProducts("Decor")}
            >
              Decor
            </h1>
            <h1
              className="cursor-pointer p-2 hover:bg-red-300 rounded-md mt-1"
              onClick={() => fetchCategoryProducts("Appliances")}
            >
              Appliances
            </h1>
          </div>

          <hr className="my-2 text-black" />

          {/*Leisure and Hobbies */}
          <div
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-500 cursor-pointer hover:bg-red-300"
            onClick={() => {
              fetchCategoryProducts("LeisureHobbies");
              dropdownLeisure();
            }}
          >
            <div className="flex justify-between w-full items-center">
              <span className="text-[15px] ml-4 text-black">
                Leisure & Hobbies
              </span>
              <span className="text-sm" id="arrowLeisure">
                <i className="bi bi-chevron-down"></i>
              </span>
            </div>
          </div>
          <div
            className="text-left text-sm font-thin mt-2 w-4/5 mx-auto text-black hidden"
            id="subLeisure"
          >
            <h1
              className="cursor-pointer p-2 hover:bg-red-300 rounded-md mt-1"
              onClick={() => fetchCategoryProducts("Sports")}
            >
              Sports
            </h1>
            <h1
              className="cursor-pointer p-2 hover:bg-red-300 rounded-md mt-1"
              onClick={() => fetchCategoryProducts("Music")}
            >
              Music
            </h1>
            <h1
              className="cursor-pointer p-2 hover:bg-red-300 rounded-md mt-1"
              onClick={() => fetchCategoryProducts("Arts")}
            >
              Arts
            </h1>
            <h1
              className="cursor-pointer p-2 hover:bg-red-300 rounded-md mt-1"
              onClick={() => fetchCategoryProducts("Games")}
            >
              Games
            </h1>
          </div>

          <hr className="my-2 text-black" />

          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-300">
            <span
              className="text-[15px] ml-4 text-black"
              onClick={() => fetchCategoryProducts("Outdoor")}
            >
              Outdoor
            </span>
          </div>

          <hr className="my-2 text-black" />

          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-300">
            <span
              className="text-[15px] ml-4 text-black"
              onClick={() => fetchCategoryProducts("Pet")}
            >
              Pet
            </span>
          </div>

          <hr className="my-2 text-black" />

          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-300">
            <span
              className="text-[15px] ml-4 text-black"
              onClick={() => fetchCategoryProducts("Study")}
            >
              Study
            </span>
          </div>

          <hr className="my-2 text-black" />

          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-300">
            <span
              className="text-[15px] ml-4 text-black"
              onClick={() => fetchCategoryProducts("Other")}
            >
              Other
            </span>
          </div>

          <hr className="my-2 text-black" />
        </div>
      </div>
    </div>
  );
}

export default Categoriesbar;
