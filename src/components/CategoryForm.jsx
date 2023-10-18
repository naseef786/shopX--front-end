

// Categories.js

import React, { useState, useEffect } from 'react';
import axios from '../config/axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get('api/categories')
    .then(response => {
      setCategories(response.data.categories);
    })
      .catch(error => console.error('Error:', error));
  }, []);
  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map(category => (
          <li key={category._id}>
            {category.name}
            {category.subcategories.length > 0 && (
              <ul>
                {category.subcategories.map(subcategory => (
                  <li key={subcategory._id}>{subcategory.name}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;

