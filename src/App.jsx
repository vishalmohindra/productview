import React from "react";
import { ProductProvider } from "./context/ProductContext";
import Header from "./components/Header";
import Loader from "./components/Loader";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import ProductForm from "./components/ProductForm";
import { useProductContext } from "./context/ProductContext";
import "./App.css";

// Wrapper to use context inside App
const AppContent = () => {
  const { loading } = useProductContext();

  return (
    <div>
      <Header />
      {loading && <Loader />}
      <main className="main-container" style={{ marginTop: "2rem" }}>
        <ProductList />
        <div>
          <ProductDetail />
          <ProductForm />
        </div>
      </main>
    </div>
  );
};

const App = () => (
  <ProductProvider>
    <AppContent />
  </ProductProvider>
);

export default App;
