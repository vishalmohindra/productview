import React, { createContext, useContext, useState, useEffect } from "react";

// Create the ProductContext
const ProductContext = createContext();

// Provider component
export const ProductProvider = ({ children }) => {
  // Holds the list of products
  const [products, setProducts] = useState([]);
  // Currently selected product for details/edit
  const [selectedProduct, setSelectedProduct] = useState(null);
  // Loading indicator (for fetches and updates)
  const [loading, setLoading] = useState(true);

  // Fetch products from JSON server when component mounts
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  // Select a product for detail/edit
  const selectProduct = (product) => setSelectedProduct(product);

  // Update (edit/save) a product via API
  const updateProduct = (updatedProduct) => {
    setLoading(true);
    fetch(`http://localhost:3000/products/${updatedProduct.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts((prev) =>
          prev.map((prod) => (prod.id === data.id ? data : prod))
        );
        setSelectedProduct(data);
        setLoading(false);
      });
  };

  // Add a new product via API
  const addProduct = (newProduct) => {
    setLoading(true);
    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts((prev) => [...prev, data]);
        setLoading(false);
      });
  };

  // Delete a product via API
  const deleteProduct = (id) => {
    setLoading(true);
    fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setProducts((prev) => prev.filter((prod) => prod.id !== id));
        setSelectedProduct(null);
        setLoading(false);
      });
  };

  // Context value for all components
  const value = {
    products,
    selectedProduct,
    loading,
    selectProduct,
    updateProduct,
    addProduct,
    deleteProduct,
  };

  // Provide context to child components
  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook for easy usage in components
export const useProductContext = () => useContext(ProductContext);
