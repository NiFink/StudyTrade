import React, { ChangeEvent, useState, useRef, useEffect } from "react";
import SearchList from "./SearchList";
import ProductDetails from "../pages/Shoppage/Components/ProductDetails";

interface MenubarProps {
  shoppageClick: () => void;
  profilepageClick: () => void;
  homepageClick: () => void;
}

// Define the Product interface to specify the shape of the product object
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
    setInputValue(e.target.value);
    fetchSearchedProducts(e.target.value);
  };

  const handleFocus = () => {
    setIsSearchListExp(true);
  };

  const handleBlur = () => {
    if (inputValue === "") {
      setIsSearchListExp(false);
    }
  };
  {
    /*Fetch all products from backend, which has the searched letters in their names */
  }
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

  {
    /*Fetch all products from backend, which has the searched letters in their names */
  }
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

  {
    /*Handle Productclick and set the selected/clicked one */
  }
  const toggleDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsSearchListExp(false);
  };

  return (
    <div className="mx-5 my-3">
      <div className="flex flex-col sm:flex-row sm:space-y-0 space-y-2  justify-between border-b border-gray-300 py-2">
        <button
          onClick={homepageClick}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-full shadow sm:block"
        >
          <i className="bi bi-shop"></i> StudyTrade
        </button>
        <div className="flex space-x-7">
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
                    isSearchListExp ? "sm:w-64 w-[73vw]  opacity-100" : "w-0 opacity-0"
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
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-full shadow"
          >
            <i className="bi bi-heart"></i> Favorites
          </button>
          <button
            onClick={profilepageClick}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-full shadow"
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
