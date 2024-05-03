import { useState } from "react";

interface FilterBarProps {
  toggleCategories: () => void;
}

function FilterBar({ toggleCategories }: FilterBarProps) {
  return (<div>
    <div className=" w-full ">
      <div className=" flex p-2 justify-center bg-red-200">
        <button className="md:hidden " onClick={toggleCategories}>
          <i className="bi bi-filter"></i>
          Categories
        </button>
        <button className="pl-3" onClick={toggleCategories}>
          <i className="bi bi-funnel-fill"></i>
          Filter
        </button>
        <div>
        
          <input type="text" className="border rounded-lg" placeholder="Search" > <i className="bi bi-search"></i></input>
        </div>

      </div>
    </div>
    <div>

    </div>
  </div>

  );
}

export default FilterBar;
