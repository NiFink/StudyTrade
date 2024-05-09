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
  userId: number;
}

function Shoppage({ homepageClick }: ShoppageProps) {
  const [products, setProducts] = useState<Product[]>();
  const [categoryState, setCategoryState] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchCategoryProducts = async (category: string) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/products/filter?category=" + category
      );
      const data = await response.json();
      setCategoryState(category);
      console.log(categoryState);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchFilterProducts = async (
    minPrice: number,
    maxPrice: number,
    condition: string
  ) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/products/filter?category=${categoryState}&minPrice=${minPrice}&maxPrice=${maxPrice}&condition=${condition}`
      );
      console.log(categoryState, minPrice, maxPrice, condition);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

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
      <Filterbar
        toggleCategories={toggleCategories}
        fetchFilterProducts={fetchFilterProducts}
      ></Filterbar>
      <div className="md:flex">
        <div>
          <Categoriesbar
            toggleCategories={toggleCategories}
            isCategoriesOpen={isCategoriesOpen}
            fetchCategoryProducts={fetchCategoryProducts}
            fetchProducts={fetchProducts}
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
