import React, { useState, ChangeEvent } from "react";

interface FilterBarProps {
  toggleCategories: () => void;
  fetchProducts: (
    category?: string,
    minPrice?: number,
    maxPrice?: number,
    condition?: string
  ) => void;
}

function FilterBar({ toggleCategories, fetchProducts }: FilterBarProps) {
  const [selectedCondition, setSelectedCondition] = useState("all");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [priceError, setPriceError] = useState(false);

  const handleConditionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCondition(event.target.value);
  };

  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Updated regex to match positive numbers from 0 to 100000
    const regex = /^(100000|[1-9][0-9]{0,4}|0)$/;

    if (inputValue === '' || regex.test(inputValue)) {
      setMinPrice(inputValue);
    }

  };

  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Updated regex to match positive numbers from 0 to 100000
    const regex = /^(100000|[1-9][0-9]{0,4}|0)$/;

    if (inputValue === '' || regex.test(inputValue)) {
      setMaxPrice(inputValue);
    }

  };
  const filter = () => {
    document.querySelector("#filter")?.classList.toggle("hidden");
  };


  const filterButton = () => {
    if(minPrice < maxPrice){
      fetchProducts(
        undefined,
        minPrice == "" ? 0 : Number(minPrice),
        maxPrice == "" ? 100000 : Number(maxPrice),
        selectedCondition
      );
    }
    else{
      setPriceError(true)
      setTimeout(() => {
        setPriceError(false)
      }, 3000);
    }
  };


  return (
    <div>
      <div className=" w-full ">
        <div className="flex p-2 justify-center">
          <button className="lg:hidden " onClick={toggleCategories}>
            <i className="bi bi-filter"></i>
            Categories
          </button>
          <button className="pl-3 lg:hidden" onClick={filter}>
            <i className="bi bi-funnel hover:bi-funnel-fill"></i>
          </button>
        </div>
        <div className="hidden  font-semibold" id="filter">
          <div className="flex justify-center items-center flex-wrap">
            <h1 className="p-2">Condition:</h1>
            <select
              value={selectedCondition}
              onChange={handleConditionChange}
              className="p-1 rounded-full text-center bg-white text-black border-[0.5px]"
            >
              <option value="all">All</option>
              <option value="new">New</option>
              <option value="nearly new">Nearly new</option>
              <option value="used">Used</option>
            </select>
            <div className="p-2 flex justify-center items-center flex-wrap py-1 px-2  ">
              <h1 className="pr-2">Price:</h1>
              <input
                type="text"
                className="rounded-full appearance-none shadow py-1 px-2 "
                placeholder="Min"
                id="Min"
                value={minPrice}
                onChange={handleMinPriceChange}
              />
              <h1 className="px-2">to</h1>
              <input
                type="text"
                className="rounded-full appearance-none  shadow py-1 px-2 "
                placeholder="Max"
                id="Max"
                value={maxPrice}
                onChange={handleMaxPriceChange}
              />
              <div
                className="text-[16px] ml-4  hover:cursor-pointer shadow py-1 px-2  rounded-full hover:bg-gray-200"
                onClick={filterButton}
              >
                Filter
              </div>
              {priceError && (<div className="fixed bottom-0 left-0 w-full flex justify-center">
                <div className="bg-red-400 text-white py-2 px-4 rounded shadow-md">
                  Your minimal price is higher than your maximal price. This doesn't work.
                </div>
              </div>)}
            </div>
          </div>
          <hr className="my-2 text-black" />
        </div>
      </div>
    </div>
  );  
}

export default FilterBar;
