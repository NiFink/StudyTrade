/*
 * Import necessary functions and components from the testing library
 * and local components.
 */
import { render, screen } from "@testing-library/react";
import ProductList from "../Components/ProductList";

/*
 * Mock data for products. This represents a list of products used in tests.
 * Each product contains properties such as ID, username, name, description,
 * category, condition, price, image, and creation date.
 */
const mockProducts = [
  {
    _id: "667c24c605a1ca273ca4e31a",
    username: "6651e5e58ae50b7dd1e74add",
    name: 'Used textbook: "Introduction to Computer Science"',
    description:
      "A used textbook for an introduction to computer science, in good condition.",
    category: ["Books"],
    condition: "used",
    price: 29.99,
    img: "./images/computer_science_textbook.jpg",
    creationDate: "2024-04-28T12:46:50.286Z",
  },
];

/*
 * Mock function for toggling the details view. This function is used in tests
 * to toggle the details view of a product.
 */
const mockToggleDetails = jest.fn();

/*
 * Mock status for the details view. This variable indicates whether the
 * details view of a product is open or not.
 */
const mockIsDetailsOpen = false;

/*
 * Test case: Checks if the ProductList component is rendered correctly.
 * - The component is rendered with mock data and mock functions.
 * - It verifies that the product list element is present in the document.
 */
test("ProductList renders ProductList component", () => {
  render(
    <ProductList
      products={mockProducts}
      toggleDetails={mockToggleDetails}
      isDetailsOpen={mockIsDetailsOpen}
    />
  );
  const productListElement = screen.getByTestId("product-list");
  expect(productListElement).toBeInTheDocument();
});