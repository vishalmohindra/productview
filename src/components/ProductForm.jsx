import React, { useState, useEffect } from "react";
import { useProductContext } from "../context/ProductContext";

const emptyForm = {
  name: "",
  price: "",
  description: "",
  stock: ""
};

const ProductForm = () => {
  const {
    selectedProduct,
    updateProduct,
    addProduct,
    deleteProduct,
  } = useProductContext();

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (selectedProduct) setForm(selectedProduct);
    else setForm(emptyForm);
  }, [selectedProduct]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedProduct) {
      updateProduct({ ...form, price: Number(form.price), stock: Number(form.stock) });
    } else {
      addProduct({ ...form, price: Number(form.price), stock: Number(form.stock) });
      setForm(emptyForm);
    }
  };

  const handleClear = () => {
    setForm(emptyForm);
  };

  return (
    <section>
      <h2>{selectedProduct ? "Edit Product" : "Add New Product"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name: <input name="name" value={form.name} onChange={handleChange} required />
        </label><br />
        <label>
          Price: <input name="price" type="number" value={form.price} onChange={handleChange} required />
        </label><br />
        <label>
          Description: <input name="description" value={form.description} onChange={handleChange} required />
        </label><br />
        <label>
          Stock: <input name="stock" type="number" value={form.stock} onChange={handleChange} required />
        </label><br />
        <button type="submit">{selectedProduct ? "Save" : "Add Product"}</button>
        <button type="button" onClick={handleClear} style={{ marginLeft: "1rem" }}>
          Clear
        </button>
        {selectedProduct && (
          <button
            type="button"
            onClick={() => {
              deleteProduct(selectedProduct.id);
              setForm(emptyForm);
            }}
            style={{ marginLeft: "1rem", color: "red" }}
          >
            Delete
          </button>
        )}
      </form>
    </section>
  );
};

export default ProductForm;
