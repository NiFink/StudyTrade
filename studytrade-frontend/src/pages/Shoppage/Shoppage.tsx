import ProductList from "./Components/ProductList";
import Categoriesbar from "./Components/Categoriesbar";
import Filterbar from "./Components/Filterbar";
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
      category: ["Electro", "Books"],
      condition: "new",
      creationDate: "20.05.2024",
      seller: "Jan Sander",
      details:
        "Eine elegante Wasserkanne aus strapazierfähigem Kunststoff mit schlankem Griff und Ausgießer, ideal für den Garten oder den Haushalt.",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
      imageAlt:
        "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
    },
    {
      id: 2,
      name: "Nomad Tumbler",
      price: "$35",
      category: ["Electro", "Books"],
      condition: "used",
      creationDate: "20.05.2024",
      seller: "",
      details:
        "Eine elegante Wasserkanne aus strapazierfähigem Kunststoff mit schlankem Griff und Ausgießer, ideal für den Garten oder den Haushalt.",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
      imageAlt:
        "Olive drab green insulated bottle with flared screw lid and flat top.",
    },
    {
      id: 3,
      name: "Focus Paper Refill",
      price: "$89",
      category: ["Electro", "Books"],
      condition: "used",
      creationDate: "20.05.2024",
      seller: "Jan Sander",
      details:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis efficitur augue eget purus dictum, vel tristique nibh venenatis. Sed nec metus nec magna facilisis convallis nec ac nunc. Vestibulum vitae lectus ac nunc tristique convallis non ac justo. Quisque vel lorem eu mi dapibus aliquam. Sed eu ligula nisl. Nullam consectetur lectus eget ipsum posuere, eget convallis urna ultricies. Pellentesque nec orci nec sem rutrum condimentum id et nisi. Vivamus at varius libero. Nullam et orci id lectus vestibulum consectetur non ac nulla. Donec hendrerit consequat quam, at dignissim risus faucibus sit amet. Nulla facilisi. Vivamus at ex nec risus feugiat dapibus. Integer a libero sed lorem dapibus tempor. In vel sapien eget ligula vulputate fermentum.",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
      imageAlt:
        "Person using a pen to cross a task off a productivity paper card.",
    },
    {
      id: 4,
      name: "Machined Mechanical Pencil",
      price: "$35",
      category: ["Electro", "Books"],
      condition: "used",
      creationDate: "20.05.2024",
      seller: "Jan Sander",
      details:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
      imageAlt:
        "Hand holding black machined steel mechanical pencil with brass tip and top.",
    },
    {
      id: 5,
      name: "Earthen Bottle",
      price: "$48",
      category: ["Electro", "Books"],
      condition: "new",
      creationDate: "20.05.2024",
      seller: "Jan Sander",
      details:
        "Eine elegante Wasserkanne aus strapazierfähigem Kunststoff mit schlankem Griff und Ausgießer, ideal für den Garten oder den Haushalt.",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
      imageAlt:
        "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
    },
    {
      id: 6,
      name: "Earthen Bottle",
      price: "$48",
      category: ["Electro", "Books"],
      condition: "new",
      creationDate: "20.05.2024",
      seller: "Jan Sander",
      details:
        "Eine elegante Wasserkanne aus strapazierfähigem Kunststoff mit schlankem Griff und Ausgießer, ideal für den Garten oder den Haushalt.",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
      imageAlt:
        "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
    },
    {
      id: 7,
      name: "Earthen Bottle",
      price: "$48",
      category: ["Electro", "Books"],
      condition: "new",
      creationDate: "20.05.2024",
      seller: "Jan Sander",
      details:
        "Eine elegante Wasserkanne aus strapazierfähigem Kunststoff mit schlankem Griff und Ausgießer, ideal für den Garten oder den Haushalt.",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
      imageAlt:
        "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
    },
  ];

  const [isCategoriesOpen, setCategoriesOpen] = useState(false);
  const [isDetailsOpen, setDetailsOpen] = useState(false);

  const toggleCategories = () => {
    setCategoriesOpen(!isCategoriesOpen);
    setDetailsOpen(false);
  };

  const toggleDetails = () => {
    setDetailsOpen(!isDetailsOpen);
    setCategoriesOpen(false);
  };

  return (
    <div>
      <Filterbar toggleCategories={toggleCategories}></Filterbar>
      <div className="md:flex">
        <div>
          <Categoriesbar toggleCategories={toggleCategories} isCategoriesOpen={isCategoriesOpen} />
        </div>
        <div>
          <ProductList
            products={products}
            toggleDetails={toggleDetails}
            isDetailsOpen={isDetailsOpen}
          />
        </div>
      </div>
    </div>
  );
}
export default Shoppage;
