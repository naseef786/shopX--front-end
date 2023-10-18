import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Note the addition of Routes

import CategoryList from './components/CategoryForm';
import CategoryForm from './components/CategoryList';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

const App = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const handleCategorySubmit = (categoryName) => {
    // Send a request to create a category (you will implement this later)
    // Update categories state after successful creation
    const newCategories = [...categories, { name: categoryName }];
    setCategories(newCategories);
  };

  const handleProductSubmit = (productData) => {
    // Send a request to create a product (you will implement this later)
    // Update products state after successful creation
    const newProducts = [...products, productData];
    setProducts(newProducts);
  };

  // Simulated fetching of data from the backend
  useEffect(() => {
    // Replace with actual API calls to get categories and products
    const fetchedCategories = ['Category A', 'Category B'];
    const fetchedProducts = [
      { name: 'Product 1', description: 'Description 1', price: 10 },
      { name: 'Product 2', description: 'Description 2', price: 20 },
    ];

    setCategories(fetchedCategories);
    setProducts(fetchedProducts);
  }, []);

  return (
    <Router>
      <div>
        <h1>E-Commerce App</h1>
        <nav>
          <Link to="/view-category">View Category</Link>
          <Link to="/create-product">Create Product</Link>
          <Link to="/create-Category">Create Product</Link>
          <Link to="/">View Products</Link>
        </nav>
        
        <Routes>
          <Route path="/view-category" element={<CategoryForm onSubmit={handleCategorySubmit} />} />
          <Route path="/create-product" element={<ProductForm onSubmit={handleProductSubmit} />} />
          <Route path="/create-Category" element={<CategoryForm onSubmit={handleProductSubmit} />} />
          <Route
            path="/"
            element={<ProductList products={products} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
