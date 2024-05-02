import { useState } from "react";

interface FilterBarProps {
  toggleCategories: () => void;
}

function FilterBar({ toggleCategories }: FilterBarProps) {

  const filter = () =>{
    document.querySelector("#filter")?.classList.toggle("hidden");
  }
  return (<div>
    <div className=" w-full ">
      <div className="flex p-2 justify-center">
        <button className="md:hidden " onClick={toggleCategories}>
          <i className="bi bi-filter"></i>
          Categories
        </button>
        <button className="pl-3" onClick={filter}>
          <i className="bi bi-funnel-fill"></i>
        </button>
        <div className=" pl-3 ">
          <input type="search" className="border rounded-lg" placeholder="Search" ></input>
        </div>
      </div>
      <div className="flex p-2 justify-center hidden" id="filter"> 
        <label htmlFor="new" className="">
          <input type="radio" className="" name="condition" value="new"/>
            new
        </label>
        <label htmlFor="nearly new" className="pl-2">
          <input type="radio" className="" name="condition" value="nearly new"/>
          nearly new
        </label>
        <label htmlFor="used" className="pl-2">
          <input type="radio" className="" name="condition" value="used"/>
          used
        </label>

      </div>
      
    </div>

  </div>

  );
}

export default FilterBar;
