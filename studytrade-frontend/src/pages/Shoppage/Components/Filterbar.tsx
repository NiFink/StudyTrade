import { useState } from 'react';



interface FilterBarProps {
    toggleMenu: () => void;
    isMenuOpen: boolean;
}

function FilterBar({ toggleMenu, isMenuOpen }: FilterBarProps) {
    const [zIndex, setZIndex] = useState<number>(1); 

    const dropdown = () => {
        document.querySelector("#submenu")?.classList.toggle("hidden");
        document.querySelector("#arrow")?.classList.toggle("rotate-0");
    }

    const handleMenuOpen = () => {
        setZIndex(2); 
        toggleMenu(); 
    }

    const handleMenuClose = () => {
        setZIndex(1); 
        toggleMenu(); 
    }

    return (
        <div className="flex">
            <div className={`lg:w-72`} style={{ zIndex: isMenuOpen ? 2 : 1 }}>
                <span className="text-black text-4x1 cursor-pointer" onClick={handleMenuOpen}>
                    Categories
                </span>
                <div className={`sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-white ${isMenuOpen ? '' : 'left-[-300px]'}`}>
                    <div className="text-sm font-medium text-black"></div>
                    <div className="p-2.5 mt-1 flex justify-between">
                        <h1 className="font-bold text-[15px] ml-3">Categories</h1>
                        <i className="bi bi-arrow-right lg:hidden cursor-pointer" onClick={handleMenuClose }></i>
                    </div>
                    <hr className="my-2 text-black" />
                    <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-300">
                        <span className="text-[15px] ml-4 text-black">Tech</span>
                    </div>
                    <hr className="my-2 text-black" />
                    <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-300">
                        <span className="text-[15px] ml-4 text-black">Other</span>
                    </div>
                    <hr className="my-2 text-black" />
                    <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-300" onClick={dropdown}>
                        <div className="flex justify-between w-full items-center">
                            <span className="text-[15px] ml-4 text-black">Stuff</span>
                            <span className="text-sm rotate-180" id="arrow">
                                <i className="bi bi-chevron-down"></i>
                            </span>
                        </div>
                    </div>
                    <div className="text-left text-sm font-thin mt-2 w-4/5 mx-auto text-black hidden" id="submenu">
                        <h1 className="cursor-pointer p-2 hover:bg-red-300 rounded-md mt-1">
                            Other Stuff
                        </h1>
                        <h1 className="cursor-pointer p-2 hover:bg-red-300 rounded-md mt-1">
                            Other Stuff
                        </h1>
                        <h1 className="cursor-pointer p-2 hover:bg-red-300 rounded-md mt-1">
                            Other Stuff
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FilterBar;
