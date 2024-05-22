import { useState } from "react";
import Shoppage from "./pages/Shoppage/Shoppage";
import Homepage from "./pages/Homepage/Homepage";
import Profilepage from "./pages/Profilepage/Profilepage";
import Menubar from "./GlobalComponents/Menubar";

function App() {
  const [currentSite, setSite] = useState("Homepage");

  
  return (
    <div>
      {
        <Menubar
          shoppageClick={() => setSite("Shoppage")}
          homepageClick={() => setSite("Homepage")}
          profilepageClick={() => setSite("Homepage")}
        ></Menubar>
      }
      {currentSite === "Homepage" && (
        <Homepage
          shoppageClick={() => setSite("Shoppage")}
          profilepageClick={() => setSite("Profilepage")}
        ></Homepage>
      )}
      {currentSite === "Shoppage" && (
        <Shoppage></Shoppage>
      )}
      {currentSite === "Profilepage" && (
        <Profilepage homepageClick={() => setSite("Homepage")}></Profilepage>
      )}
    </div>
  );
}

export default App;
