import React from "react";
import { useProductContext } from "../context/ProductContext";

// Show details for the selected product
const ProductDetail = () => {
  const { selectedProduct } = useProductContext();

  if (!selectedProduct) {
    return <div>Select a product to see details.</div>;
  }

  return (
    <section>
      <h2>Product Details</h2>
      <p><b>Name:</b> {selectedProduct.name}</p>
      <p><b>Price:</b> ${selectedProduct.price}</p>
      <p><b>Description:</b> {selectedProduct.description}</p>
      <p><b>Stock:</b> {selectedProduct.stock}</p>
    </section>
  );
};

export default ProductDetail;
