import { render, screen } from "@testing-library/react";
import ProductList from "../Components/ProductList";

const mockProducts = [
  {
    userId: {
      username: "6651e5e58ae50b7dd1e74add"
    },
    name: "Used textbook: \"Introduction to Computer Science\"",
    description: "A used textbook for an introduction to computer science, in good condition.",
    category: [
      "Books"
    ],
    condition: "used",
    price: 29.99,
    img: "./images/computer_science_textbook.jpg",
    creationDate: "2024-04-28T12:46:50.286Z",
  }
];


const mockToggleDetails = jest.fn();
const mockIsDetailsOpen = false;
/*
test('ProductList renders ProductList component', () => {
  render(
    <ProductList
      products={mockProducts}
      toggleDetails={mockToggleDetails}
      isDetailsOpen={mockIsDetailsOpen}
    />
  );
  const productListElement = screen.getByTestId('product-list');
  expect(productListElement).toBeInTheDocument();
});*/