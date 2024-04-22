import React from 'react';
import { useState } from 'react'
import Shoppage from "./pages/Shoppage/Shoppage";
import Homepage from "./pages/Homepage/Homepage";
import Profilepage from "./pages/Profilepage/Profilepage";


function App() {
  const [currentSite, setSite] = useState("Homepage")
  
  return (
    <div>
      {/*<Navigation ...Click={() => setSite("Projects") } homepageClick={() => setSite("Homepage") }></Navigation>*/}
      {currentSite === "Homepage" && <Homepage shoppageClick={() => setSite("Shoppage")}></Homepage>}
      {currentSite === "Shoppage" && <Shoppage homepageClick={() => setSite("Homepage")}></Shoppage>}
      {currentSite === "Profilepage" && <Profilepage homepageClick={() => setSite("Homepage")}></Profilepage>}
    </div>
  );
}

export default App;
