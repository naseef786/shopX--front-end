import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Note the addition of Routes


import CategoryForm from './components/CategoryForm';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

const App = () => {
  // const [categories, setCategories] = useState([]);
  // const [products, setProducts] = useState([]);

  // const handleCategorySubmit = (categoryName) => {
  //   // Send a request to create a category (you will implement this later)
  //   // Update categories state after successful creation
  //   const newCategories = [...categories, { name: categoryName }];
  //   setCategories(newCategories);
  // };

  // const handleProductSubmit = (productData) => {
  //   // Send a request to create a product (you will implement this later)
  //   // Update products state after successful creation
  //   const newProducts = [...products, productData];
  //   setProducts(newProducts);
  // };

  // // Simulated fetching of data from the backend
  // useEffect(() => {
  //   // Replace with actual API calls to get categories and products
  //   const fetchedCategories = ['Category A', 'Category B'];
  //   const fetchedProducts = [
  //     { name: 'Product 1', description: 'Description 1', price: 10 },
  //     { name: 'Product 2', description: 'Description 2', price: 20 },
  //   ];

  //   setCategories(fetchedCategories);
  //   setProducts(fetchedProducts);
  // }, []);

  return (
    <Router>
       <div className="min-h-screen bg-white  flex flex-col">
       <header className="  bg-gray-800 p-4 text-white">
        <h1 className='text-2xl mb-4'>E-Commerce App</h1>
        <nav className="container  bg-zinc-900 mx-auto">
          <Link to="/create-product" className='mr-4'>Create Product</Link>
          <Link to="/create-Category" className='mr-4'>Create Category</Link>
          <Link to="/" className='mr-4'>View Products  </Link>
        </nav>
        </header>
        <div className="flex-1 container mx-auto">
        <Routes>
          
          <Route path="/create-product" element={<ProductForm />} />
          <Route path="/create-Category" element={<CategoryForm/>} />
          <Route path="/"  element={<ProductList  />} />
        </Routes>
        </div>
        <footer className="bg-gray-800 text-white p-4 text-center">
          &copy; 2023 Your Company
        </footer>
      </div>
    </Router>
  );
};

export default App;
