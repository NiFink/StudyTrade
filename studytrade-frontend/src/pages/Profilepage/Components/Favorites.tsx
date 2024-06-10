import { useState } from "react";
import ProductDetails from "../../Shoppage/Components/ProductDetails";

interface FavoritesProps {
  favorites: Product[];
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

function Favorites({ favorites }: FavoritesProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailsOpen, setDetailsOpen] = useState(false);

  const truncatedText = (text: string) =>
    text.length > 20 ? text.slice(0, 20) + "..." : text;

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    toggleDetails();
  };

  const toggleDetails = () => {
    setDetailsOpen(!isDetailsOpen);
  };
  return (
    <>
      <div className="mt-36 px-4 lg:px-32 flex flex-wrap gap-4 relative">
        <div className="absolute -mt-20 left-56 transform -translate-x-1/2 flex items-center">
          <i className="bi bi-bag-heart text-black text-[55px]"></i>
          <span className="text-black font-bold text-[23px] ml-2 mt-3">
            Your favorites:
          </span>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2  md:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-5 xl:gap-x-8">
          {/* Lists all fetch Products*/}
          {favorites.map((product) => (
            <button
              key={product.productId}
              onClick={() => handleProductClick(product)}
              className="group relative items-center justify-center overflow-hidden cursor-pointer"
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg via-transparent xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={`/images/${product.productId}.jpg`}
                  alt={product.name}
                  className="h-full w-full object-cover object-center group-hover:rotate-3 group-hover:scale-125 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 inset-0 bg-gradient-to-b from-transparent to-black/30 group-hover:to-black/50 rounded-lg">
                  <div className="absolute inset-0 flex flex-col   text-center translate-y-[80%] group-hover:translate-y-[60%] transition-all rounded-lg">
                    <h1 className="mt-3  text-xl font-bold text-white">
                      {truncatedText(product.name)}
                    </h1>
                    <p className="md:mt-3 text-lg font-medium text-white md:hidden group-hover:block">
                      {product.price} ({product.condition})
                    </p>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {selectedProduct && (
          <ProductDetails
            product={selectedProduct}
            toggleDetails={toggleDetails}
            isDetailsOpen={isDetailsOpen}
          />
        )}
      </div>
    </>
  );
}
export default Favorites;
