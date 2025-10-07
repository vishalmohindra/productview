import React from "react";
import { useProductContext } from "../context/ProductContext";

const ProductList = () => {
  const { products, selectProduct, deleteProduct } = useProductContext();

  return (
    <section>
      <h2>Products</h2>
      <button className="add-btn" onClick={() => selectProduct(null)}>
        Add New Product
      </button>
      <ul style={{ padding: 0, listStyle: "none" }}>
        {products.map((prod) => (
          <li
            key={prod.id}
            style={{
              margin: "8px 0",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{ flex: 1, cursor: "pointer" }}
              onClick={() => selectProduct(prod)}
            >
              {prod.name}
            </span>
            <div>
              <button className="edit-btn" onClick={() => selectProduct(prod)}>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteProduct(prod.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProductList;
