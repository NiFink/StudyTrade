import { useState } from "react";
import React, { useEffect, useRef } from "react";

interface FilterBarProps {
  toggleCategories: () => void;
  isCategoriesOpen: boolean;
}

function FilterBar({ toggleCategories, isCategoriesOpen }: FilterBarProps) {
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


  const dropdown = () => {
    document.querySelector("#subcategories")?.classList.toggle("hidden");
    document.querySelector("#arrow")?.classList.toggle("rotate-180");
  };

  const handleCategoriesOpen = () => {
    setZIndex(2);
    toggleCategories();
  };

  const handleCategoriesClose = () => {
    setZIndex(0);
    toggleCategories();
  };

  return (
    <div className="flex">
       {isCategoriesOpen && (
          <div className="fixed top-0 left-0 w-full h-full  bg-gray-800 bg-opacity-40 z-10"></div>
          
        )}
      <div ref={categoriesRef} className="lg:w-72 " style={{ zIndex: isCategoriesOpen ? 20 : 0 }}>
        <div
          className={`sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-white ${isCategoriesOpen ? "" : "left-[-300px]"}`}
        >
          <div className="text-sm font-medium text-black"></div>
          <div className="p-2.5 mt-1 flex justify-between">
            <h1 className="font-bold text-[15px] ml-3">Categories</h1>
            <i
              className="bi bi-arrow-right lg:hidden cursor-pointer"
              onClick={handleCategoriesClose}
            ></i>
          </div>
          <hr className="my-2 text-black" />
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-300">
            <span className="text-[15px] ml-4 text-black">Books</span>
          </div>
          <hr className="my-2 text-black" />
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-300">
            <span className="text-[15px] ml-4 text-black">Sports</span>
          </div>
          <hr className="my-2 text-black" />
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-300">
            <span className="text-[15px] ml-4 text-black">Music</span>
          </div>
          <hr className="my-2 text-black" />
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-300">
            <span className="text-[15px] ml-4 text-black">Arts</span>
          </div>
          <hr className="my-2 text-black" />
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-300">
            <span className="text-[15px] ml-4 text-black">Decor</span>
          </div>
          <hr className="my-2 text-black" />
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-300">
            <span className="text-[15px] ml-4 text-black">Pet</span>
          </div>
          <hr className="my-2 text-black" />
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-300">
            <span className="text-[15px] ml-4 text-black">Games</span>
          </div>
          <hr className="my-2 text-black" />
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-300">
            <span className="text-[15px] ml-4 text-black">Office</span>
          </div>
          <hr className="my-2 text-black" />
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-300">
            <span className="text-[15px] ml-4 text-black">Appliances</span>
          </div>
          <hr className="my-2 text-black" />
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-300">
            <span className="text-[15px] ml-4 text-black">Outdoor</span>
          </div>
          <hr className="my-2 text-black" />
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-300">
            <span className="text-[15px] ml-4 text-black">Study</span>
          </div>
          <hr className="my-2 text-black" />
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-300">
            <span className="text-[15px] ml-4 text-black">Beauty</span>
          </div>
          <hr className="my-2 text-black" />
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-300">
            <span className="text-[15px] ml-4 text-black">Events</span>
          </div>
          <hr className="my-2 text-black" />
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-300">
            <span className="text-[15px] ml-4 text-black">Accesories</span>
          </div>
          <hr className="my-2 text-black" />
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-300">
            <span className="text-[15px] ml-4 text-black">Other</span>
          </div>
          <hr className="my-2 text-black" />
          <div
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-500 cursor-pointer hover:bg-red-300"
            onClick={dropdown}
          >
            <div className="flex justify-between w-full items-center">
              <span className="text-[15px] ml-4 text-black">Electronics</span>
              <span className="text-sm" id="arrow">
                <i className="bi bi-chevron-down"></i>
              </span>
            </div>
          </div>

          <div
            className="text-left text-sm font-thin mt-2 w-4/5 mx-auto text-black hidden"
            id="subcategories"
          >
            <h1 className="cursor-pointer p-2 hover:bg-red-300 rounded-md mt-1">
              Laptop
            </h1>
            <h1 className="cursor-pointer p-2 hover:bg-red-300 rounded-md mt-1">
              Smartphone
            </h1>
            <h1 className="cursor-pointer p-2 hover:bg-red-300 rounded-md mt-1">
              Other Stuff
            </h1>
          </div>
          <div
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-500 cursor-pointer hover:bg-red-300"
            onClick={dropdown}
          >
            <div className="flex justify-between w-full items-center">
              <span className="text-[15px] ml-4 text-black">Clothing</span>
              <span className="text-sm" id="arrow">
                <i className="bi bi-chevron-down"></i>
              </span>
            </div>
          </div>
          <div
            className="text-left text-sm font-thin mt-2 w-4/5 mx-auto text-black hidden"
            id="subcategories"
          >
            <h1 className="cursor-pointer p-2 hover:bg-red-300 rounded-md mt-1">
              Shirts
            </h1>
            <h1 className="cursor-pointer p-2 hover:bg-red-300 rounded-md mt-1">
              Hoddies
            </h1>
            <h1 className="cursor-pointer p-2 hover:bg-red-300 rounded-md mt-1">
              Shoes
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
