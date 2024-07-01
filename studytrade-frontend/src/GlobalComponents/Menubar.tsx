import React, { ChangeEvent, useState, useRef, useEffect } from "react";
import SearchList from "./SearchList";
import ProductDetails from "../pages/Shoppage/Components/ProductDetails";
import { Product } from "../interfaces/Product";

interface MenubarProps {
  shoppageClick: () => void;
  profilepageClick: () => void;
  homepageClick: () => void;
}

function Menubar({
  shoppageClick,
  profilepageClick,
  homepageClick,
}: MenubarProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isSearchListExp, setIsSearchListExp] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleMouseEnter = () => {
    setIsSearchListExp(true);
  };

  const handleMouseLeave = () => {
    if (inputValue === "" && document.activeElement !== inputRef.current) {
      setIsSearchListExp(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Regex to disallow specific characters
    const regex = /^[^{}\[\]$`;]*$/;
    if (inputValue === "" || regex.test(inputValue)) {
      setInputValue(inputValue);
    }

    fetchSearchedProducts(inputValue);
  };

  const handleFocus = () => {
    setIsSearchListExp(true);
  };

  const handleBlur = () => {
    if (inputValue === "") {
      setIsSearchListExp(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        if (inputValue === "") {
          setIsSearchListExp(false);
        }
      }
    };

    if (isSearchListExp) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchListExp, inputValue]);

  const fetchSearchedProducts = async (searchTerm: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/products/search?search=${searchTerm}`
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const toggleDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsSearchListExp(false);
  };

  return (
    <div className="sm:fixed z-10 bg-white w-full">
      <div className="items-center mx-5 my-3 flex flex-col sm:flex-row sm:space-y-0 space-y-2  justify-between border-b border-gray-300 py-2 overflow-hidden sm:overflow-visible">
        <button
          onClick={homepageClick}
          className="w-full h-12 sm:w-auto sm:h-auto hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-full shadow sm:block"
        >
          <i className="bi bi-shop"></i> StudyTrade
        </button>
        <div className="flex space-x-7">
          {/*search element to find products with loupe icon*/}
          <div className="flex justify-center items-center">
            <div className="relative" ref={containerRef}>
              <div
                className="bg-gray-100 text-gray-800 font-semibold px-3 py-2 rounded-full flex shadow overflow-hidden"
                onMouseLeave={handleMouseLeave}
                onMouseEnter={handleMouseEnter}
              >
                <input
                  ref={inputRef}
                  type="search"
                  placeholder="Search..."
                  id="searchInput"
                  className={`rounded-full bg-gray-100 focus:outline-none appearance-none flex-grow px-2 transition-width duration-500 ${
                    isSearchListExp
                      ? "sm:w-64 w-[73vw]  opacity-100"
                      : "w-0 opacity-0"
                  }`}
                  value={inputValue}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <button className="bg-white hover:bg-gray-300 font-semibold py-1 px-2 rounded-full shadow">
                  <i className="bi bi-search"></i>
                </button>
              </div>
              {isSearchListExp && inputValue && (
                <SearchList
                  products={products}
                  onProductClick={toggleDetails}
                />
              )}
            </div>
          </div>

          <button
            onClick={shoppageClick}
            className={`bg-white h-12 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-full shadow sm:block
            ${isSearchListExp ? "hidden" : "block"}`}
          >
            <i className="bi bi-heart"></i> Favorites
          </button>

          <button
            onClick={profilepageClick}
            className={`bg-white h-12 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-full shadow sm:block
            ${isSearchListExp ? "hidden" : "block"}`}
          >
            <i className="bi bi-person-circle"></i> Profile
          </button>
        </div>
      </div>
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          toggleDetails={() => setSelectedProduct(null)}
          isDetailsOpen={true}
        />
      )}
    </div>
  );
}

export default Menubar;
