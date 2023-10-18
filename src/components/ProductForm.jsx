// ProductForm.js

import React, { useContext, useEffect, useState } from 'react';
import axios from '../config/axios';
import { Store } from '../store/Store';

const ProductForm = () => {
  const {state,dispatch} = useContext(Store)
  const {subCategories} = state;
  const [categories, setCategories] = useState([]);
  const [cat,setCat] = useState('')
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    subcategoryId: '',
    endCategory:''
  });


  useEffect(() => {
    axios.get('api/categories')
      .then(response => {
        setCategories(response.data.categories);
        dispatch({ type: 'STORE_SUBCATEGORIES', payload:response.data.subcategories })
      })
      .catch(error => console.error('Error:', error));
  },[])
console.log(subCategories);

const filteredSubcategories = subCategories
  .filter((subcategory) => subcategory.parentCategory === cat);
console.log(formData.subcategoryId);
  const endCategory =  subCategories
  .filter((subcategory) => subcategory.parentCategory ===formData.subcategoryId);

// Render the filtered subcategories as options in your subcategory select input


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setCat(categoryId)
   
    setFormData({
      ...formData,
      category: categoryId, 
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('api/products', formData)
      .then(response => {
        console.log('Product created successfully:', response.data.message);
        setFormData({
          name: '',
          description: '',
          price: '',
          subcategoryId: ''
        });
      })
      .catch(error => {
        console.error('Error creating product:', error);
      });
  };
console.log(formData);
 

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Product Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group col-md-6">
        <label>Category Name *</label>
        <select
          id="category"
          name="category"
          className="form-control"
  
          value={formData.category}
          onChange={handleCategoryChange}
          required
        >
          {/* Render the options dynamically based on your data */}
          {categories.map((item) => (
            <option key={item._id}>{item._id}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      {cat && (
        <div>
          <label>Subcategory:</label>
          <select
            value={formData.subcategoryId}
            type="text"
          name="subcategoryId"
          onChange={handleChange}
          >
            <option value={formData.subcategoryId}>Select Subcategory</option>
            {filteredSubcategories && filteredSubcategories.length > 0 && filteredSubcategories.map(subcategory => (
    <option key={subcategory._id} value={subcategory._id}>
      {subcategory.name}
    </option>
  ))}


          </select>
        </div>
      )}
        {formData.subcategoryId && (
        <div>
          <label>Subcategory:</label>
          <select
            value={formData.endCategory}
            type="text"
          name="endCategory"
          onChange={handleChange}
          >
            <option value={formData.endCategory}>Select Subcategory</option>
            {endCategory && endCategory.length > 0 && endCategory.map(subcategory => (
    <option key={subcategory._id} value={subcategory._id}>
      {subcategory.name}
    </option>
  ))}


          </select>
        </div>
      )}

      <div>
        <label>Price:</label>
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
