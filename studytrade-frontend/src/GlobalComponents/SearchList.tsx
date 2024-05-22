import React from "react";

interface Product {
  name: string;
  description: string;
  category: string[];
  condition: string;
  price: number;
  img: string;
  productId: number;
  creationDate: string;
  userId: { userName: string };
}

interface SearchListProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

const truncatedText = (text: string) =>
  text.length > 20 ? text.slice(0, 20) + "..." : text;

function SearchList ({ products, onProductClick }: SearchListProps){
  return (
    <ul className="absolute bg-white shadow-lg rounded-lg mt-2 w-full max-w-md z-10">
      {products.map((product) => (
        <li
          key={product.productId}
          className="p-2 border-b border-gray-200 flex cursor-pointer"
          onClick={() => onProductClick(product)}
        >
          <img
            src={product.img}
            alt={product.name}
            className="w-16 h-16 mr-2 inline-block"
          />
          <div className="inline-block align-middle">
            <p className="font-semibold">{truncatedText(product.name)}</p>
            <p className="text-gray-600 text-sm">
              {truncatedText(product.description)}
            </p>
            <p className="text-gray-800 font-bold">${product.price}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SearchList;
