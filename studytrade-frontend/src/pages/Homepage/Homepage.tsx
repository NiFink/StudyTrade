import { useRef } from "react";
import Shopbar from "./Components/Shopbar";
import Arrow from "./Components/Arrow";

interface HomepageProps {
  shoppageClick?: () => void;
  profilepageClick: () => void;
}

function Homepage({ shoppageClick, profilepageClick }: HomepageProps) {
  const shopbarRef = useRef<HTMLDivElement>(null);

  const arrowClick = () => {
    if (shopbarRef && shopbarRef.current) {
      shopbarRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="hidden lg:block">
        <Arrow arrowClick={arrowClick} scrollToShopbar={arrowClick} />
        <div className="flex space-x-3 text-white text-4xl h-[25vh]"></div>
      </div>
      <div className="bottom-0 z-0" ref={shopbarRef}>
        <Shopbar
          shoppageClick={shoppageClick}
          profilepageClick={profilepageClick}
        />
      </div>
    </div>
  );
}

export default Homepage;
