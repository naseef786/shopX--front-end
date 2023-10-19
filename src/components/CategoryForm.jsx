import React, { useState } from 'react';
import axios from '../config/axios';

const CategoryForm = () => {
  const [formData, setFormData] = useState({
    mainCategoryName: '',
    subCategoryName: '',
    endCategory: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('api/categories', formData)
      .then(response => {
        console.log('Category created successfully:', response.data.message);
        setFormData({
          mainCategoryName: '',
          subCategoryName: '',
          endCategory: ''
        });
      })
      .catch(error => {
        console.error('Error creating category:', error);
      });
  };
  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-gray-800 rounded-lg mt-10 shadow-lg">
    <h1 className="text-white text-2xl mb-4">Create Categories</h1>
    <div className="mb-4">
      <label className="block text-white">Main Category Name:</label>
      <input 
        type="text"
        name="mainCategoryName"
        value={formData.mainCategoryName}
        onChange={handleChange}
        className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white"
      />
    </div>
    <div className="mb-4">
      <label className="block text-white">Sub Category Name:</label>
      <input 
        type="text"
        name="subCategoryName"
        value={formData.subCategoryName}
        onChange={handleChange}
        className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white"
      />
    </div>
    <div className="mb-4">
      <label className="block text-white">End Category Name:</label>
      <input 
        type="text"
        name="endCategory"
        value={formData.endCategory}
        onChange={handleChange}
        className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white"
      />
    </div>
    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create Category</button>
  </form>
  );
};

export default CategoryForm;
