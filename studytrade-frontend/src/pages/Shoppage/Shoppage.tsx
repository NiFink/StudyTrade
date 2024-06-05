import ProductList from "./Components/ProductList";
import Categoriesbar from "./Components/Categoriesbar";
import Filterbar from "./Components/Filterbar";
import { useEffect, useState } from "react";

interface ShoppageProps {
  homepageClick?: () => void;
}

interface Product {
  name: string;
  description: string;
  category: string[];
  condition: string;
  price: number;
  img: string;
  productId: number;
  creationDate: string;
  userId: { username: string };
}

function Shoppage({ homepageClick }: ShoppageProps) {
  const [products, setProducts] = useState<Product[]>();

  const [categoryState, setCategoryState] = useState("");
  const [minPriceState, setMinPriceState] = useState(0);
  const [maxPriceState, setMaxPriceState] = useState(100000);
  const [conditionState, setConditionState] = useState("all");

  const fetchProducts = async (
    category: string = categoryState,
    minPrice: number = minPriceState,
    maxPrice: number = maxPriceState,
    condition: string = conditionState
  ) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/products/filter?category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&condition=${condition}`
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }

    setConditionState(condition!);
    setMinPriceState(minPrice!);
    setMaxPriceState(maxPrice!);
    setCategoryState(category!);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
    <div >
      <Filterbar
        toggleCategories={toggleCategories}
        fetchProducts={fetchProducts}
      ></Filterbar>
      <div className="md:flex">
        <div>
          <Categoriesbar
            toggleCategories={toggleCategories}
            isCategoriesOpen={isCategoriesOpen}
            fetchProducts={fetchProducts}
          />
        </div>
        <div className="w-full ">
          {!products && (
            <div className="flex text-2xl justify-center animate-bounce">
              Loading...
              <i className="bi bi-arrow-repeat text-2xl ml-2 animate-spin"></i>
            </div>
          )}
          {products && (
            <ProductList
              products={products as Product[]}
              toggleDetails={toggleDetails}
              isDetailsOpen={isDetailsOpen}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default Shoppage;
