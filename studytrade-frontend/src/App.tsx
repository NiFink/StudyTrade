import React from 'react';
import { useState } from 'react'
import Shoppage from "./pages/Shoppage";
import Homepage from "./pages/Homepage";


function App() {
  const [currentSite, setSite] = useState("Homepage")
  
  return (
    <div>
      {/*<Navigation ...Click={() => setSite("Projects") } homepageClick={() => setSite("Homepage") }></Navigation>*/}
      {currentSite === "Homepage" && <Homepage shoppageClick={() => setSite("Shoppage")}></Homepage>}
      {currentSite === "Shoppage" && <Shoppage homepageClick={() => setSite("Homepage")}></Shoppage>}
    </div>
  );
}

export default App;
