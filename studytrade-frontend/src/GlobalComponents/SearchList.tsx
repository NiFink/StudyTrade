import React, { useState, useEffect } from "react";

// Define the Product interface to specify the shape of the product object
interface Product {
  name: string;
  description: string;
  category: string[];
  condition: string;
  price: number;
  img: string;
  productId: string;
  creationDate: string;
  userId: { username: string };
}

// Define the SearchListProps interface to specify the props that the SearchList component will receive
interface SearchListProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

function SearchList({ products, onProductClick }: SearchListProps) {
  // State to control the visibility of the search list
  const [showSearchList, setShowSearchList] = useState(false);

  // Function to truncate text after 20 characters and add "..." at the end
  const truncatedText = (text: string) =>
    text.length > 20 ? text.slice(0, 20) + "..." : text;

  // Handle the product click event: execute onProductClick callback and hide the search list
  const handleProductClick = (product: Product) => {
    onProductClick(product);
    setShowSearchList(false);
  };

  // Return the JSX to render the search list
  return (
    <ul className="absolute bg-white shadow-lg rounded-lg mt-2 w-full max-w-md z-10">
      {products.map((product) => (
        <li
          key={product.productId}
          className="p-2  border-gray-200 flex cursor-pointer"
          onClick={() => handleProductClick(product)}
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
}

export default SearchList;
