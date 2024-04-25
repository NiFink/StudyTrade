import Item from "./Components/Item";
import ItemInfo from "./Components/ItemInfo";
import FilterMenu from "./Components/FilterMenu";

import { useState } from 'react'


interface ShoppageProps{
    homepageClick?: ()=> void;
}

function Shoppage({homepageClick}: ShoppageProps){
  const [currentSite, setSite] = useState("Shoppage")
    return <div>
              
              <div className="mx-auto bg-gray-500 grid">
                  <h1 className="text-2xl">Shoppage</h1>
                  
                  <div>
                    <FilterMenu></FilterMenu>
                  </div>
                  <div>
                    <Item homepageClick={() => setSite("Homepage")}></Item>
                  </div>
              </div>

    </div>
}
export default Shoppage;