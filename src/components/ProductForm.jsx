// ProductForm.js

import React, { useContext, useEffect, useState } from 'react';
import axios from '../config/axios';
import { Store } from '../store/Store';

const ProductForm = () => {
  const { state, dispatch } = useContext(Store)
  const { subCategories, categories } = state;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    subcategoryId: '',
    endCategory: ''
  });


  useEffect(() => {
    axios.get('api/categories')
      .then(response => {
        dispatch({ type: 'STORE_SUBCATEGORIES', payload: response.data.subcategories })
        dispatch({ type: 'STORE_CATEGORIES', payload: response.data.categories })
        
      })
      .catch(error => console.error('Error:', error));
  },[])


  const filteredSubcategories = (categories, subCategories, selectedCategory) => {
    const selectedCategoryObject = categories.find(C => C.name === selectedCategory);

    if (selectedCategoryObject) {
      return subCategories.filter(subcategory => subcategory.parentCategory === selectedCategoryObject._id);
    }
    return [];
  };

  const filteredEndcategories = (subCategories, selectedCategory) => {
    const selectedCategoryObject = subCategories.find(C => C.name === selectedCategory);

    if (selectedCategoryObject) {
      return subCategories.filter(subcategory => subcategory.parentCategory === selectedCategoryObject._id);
    }
    return [];
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
   
    setFormData({
      ...formData,
      [name]: value
    });

  };



  const filteredSubs = filteredSubcategories(categories, subCategories, formData.category);
  const filteredEnds = filteredEndcategories(subCategories, formData.subcategoryId);
  console.log(filteredSubs);
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
    <form onSubmit={handleSubmit} className="max-w-xl bg-slate-500 mx-auto p-4 shadow-lg rounded-lg mt-10 ">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Product Name:</label>
        <input
         className="border rounded-lg py-2 px-3 w-full"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Category Name *</label>
        <select
          id="category"
          name="category"
          className="form-control"
          defaultValue={formData.category}
          onChange={handleChange}
          required
          
        > <option>select</option>

          {/* Render the options dynamically based on your data */}
          {categories.map((item) => (
            <option key={item._id} defaultValue={item.name}>{item.name}</option>
          ))}
        </select>
      </div>
      <div className='mb-4'>
        <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
        <textarea
          name="description"
          className="border rounded-lg py-2 px-3 w-full"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      {formData.category && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Subcategory:</label>
          <select
            value={formData.subcategoryId}
            type="text"
            name="subcategoryId"
            onChange={handleChange}
          >
            <option>select</option>
            {filteredSubs && filteredSubs.length > 0 && filteredSubs.map(subcategory => (
              <option key={subcategory._id} defaultValue={subcategory.name}>
                {subcategory.name}
              </option>
            ))}
          </select>
        </div>
      )}
      {formData.subcategoryId && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Subcategory:</label>
          <select
            value={formData.endCategory}
            type="text"
            name="endCategory"
            onChange={handleChange}
          >
            <option>select</option>
            {filteredEnds && filteredEnds.length > 0 && filteredEnds.map(subcategory => (
              <option key={subcategory._id} value={subcategory.name}>
                {subcategory.name}
              </option>
            ))}


          </select>
        </div>
      )}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Price:</label>
        <input
          type="text"
          className="border rounded-lg py-2 px-3 w-full"
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
