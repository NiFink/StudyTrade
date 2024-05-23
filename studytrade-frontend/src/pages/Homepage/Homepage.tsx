import React, { useRef } from "react";
import Menubar from "../../GlobalComponents/Menubar";
import Shopbar from "./Components/Shopbar";
import Arrow from "./Components/Arrow";

interface HomepageProps {
  shoppageClick?: () => void;
  profilepageClick: () => void;
}

function Homepage({ shoppageClick, profilepageClick }: HomepageProps) {
  const shopbarRef = useRef<HTMLDivElement>(null);

  const reloadPage = () => {
    window.location.reload();
    window.scrollTo(0, 0);
  };

  const arrowClick = () => {
    if (shopbarRef && shopbarRef.current) {
      shopbarRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="fixed top-0 w-full z-10 bg-white">
        <Menubar
          shoppageClick={shoppageClick}
          profilepageClick={profilepageClick}
          homepageClick={reloadPage}
        />
      </div>

      <Arrow arrowClick={arrowClick} scrollToShopbar={arrowClick} />
      <div className="flex space-x-3 text-white text-4xl h-[400px]"></div>
      <div className="bottom-0" ref={shopbarRef}>
        <Shopbar
          shoppageClick={shoppageClick}
          profilepageClick={profilepageClick}
        />
      </div>
    </div>
  );
}

export default Homepage;
