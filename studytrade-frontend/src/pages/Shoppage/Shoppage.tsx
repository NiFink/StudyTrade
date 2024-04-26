import Item from "./Components/Item";
import ItemInfo from "./Components/ItemInfo";
import FilterMenu from "./Components/Filterbar";
import { useState } from 'react';


interface ShoppageProps{
    homepageClick?: ()=> void;
}


function Shoppage({homepageClick}: ShoppageProps){
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
};
    return <div>
            <div className=" bg-gray-500 md:flex">
              <div >
                <FilterMenu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen}/>
              </div>
              <div className="md:flex-grow lg:z-2">
                  <Item homepageClick={homepageClick} />
              </div>
            </div>
    </div>
}
export default Shoppage;