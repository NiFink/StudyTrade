import { useRef } from "react";
import Shopbar from "./Components/Shopbar";
import Arrow from "./Components/Arrow";

interface HomepageProps {
  shoppageClick?: () => void;
  profilepageClick: () => void;
}

{/* mainpage of StudyTrade from where the user starts */}
function Homepage({ shoppageClick, profilepageClick }: HomepageProps) {
  const shopbarRef = useRef<HTMLDivElement>(null);

  {/* function, which is beeing used when clicking the arrow to slide down to the shopbar */}
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
