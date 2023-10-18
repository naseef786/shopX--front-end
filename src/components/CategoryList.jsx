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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Main Category Name:</label>
        <input 
          type="text"
          name="mainCategoryName"
          value={formData.mainCategoryName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Sub Category Name:</label>
        <input 
          type="text"
          name="subCategoryName"
          value={formData.subCategoryName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>End Category Name:</label>
        <input 
          type="text"
          name="endCategory"
          value={formData.endCategory}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Create Category</button>
    </form>
  );
};

export default CategoryForm;
