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
}

function Shoppage({ homepageClick }: ShoppageProps) {

  const [products, setProducts] = useState<Product[]>();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } 
    };

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
    <div>
      <Filterbar toggleCategories={toggleCategories}></Filterbar>
      <div className="md:flex">
        <div>
          <Categoriesbar
            toggleCategories={toggleCategories}
            isCategoriesOpen={isCategoriesOpen}
          />
        </div>
        <div className="w-full ">
          {!products && <div className="flex justify-center">Loading...</div>}
          {products && (
            <ProductList
            products={products!}
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
