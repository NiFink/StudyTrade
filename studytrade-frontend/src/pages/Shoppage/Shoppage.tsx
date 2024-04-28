import ProductList from "./Components/ProductList";
import FilterMenu from "./Components/Filterbar";
import { useState } from "react";

interface ShoppageProps {
  homepageClick?: () => void;
}

function Shoppage({ homepageClick }: ShoppageProps) {

  const products = [
    {
      id: 1,
      name: "Earthen Bottle",
      price: "$48",
      details: "Eine elegante Wasserkanne aus strapazierfähigem Kunststoff mit schlankem Griff und Ausgießer, ideal für den Garten oder den Haushalt.",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
      imageAlt:
        "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
    },
    {
      id: 2,
      name: "Nomad Tumbler",
      price: "$35",
      details: "Eine elegante Wasserkanne aus strapazierfähigem Kunststoff mit schlankem Griff und Ausgießer, ideal für den Garten oder den Haushalt.",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
      imageAlt:
        "Olive drab green insulated bottle with flared screw lid and flat top.",
    },
    {
      id: 3,
      name: "Focus Paper Refill",
      price: "$89",
      details: "Eine elegante Wasserkanne aus strapazierfähigem Kunststoff mit schlankem Griff und Ausgießer, ideal für den Garten oder den Haushalt.",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
      imageAlt:
        "Person using a pen to cross a task off a productivity paper card.",
    },
    {
      id: 4,
      name: "Machined Mechanical Pencil",
      price: "$35",
      details: "Eine elegante Wasserkanne aus strapazierfähigem Kunststoff mit schlankem Griff und Ausgießer, ideal für den Garten oder den Haushalt.",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
      imageAlt:
        "Hand holding black machined steel mechanical pencil with brass tip and top.",
    },
  ];

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  
  return (
    <div>
      <div className="md:flex">
        <div>
          <FilterMenu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
        </div>
        <div className="">
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
}
export default Shoppage;
