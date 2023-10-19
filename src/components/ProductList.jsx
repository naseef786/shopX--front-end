import React, { useContext, useEffect, useState } from 'react';
import axios from '../config/axios'
import { Store } from '../store/Store';


const ProductList = () => {
  const { state, dispatch } = useContext(Store)
  const { products, categories, subCategories } = state;
  const [formData, setFormData] = useState({
    category: '',
    subcategoryId: '',
    endCategory: ''
  });
  const filterProductC = (products, selectedCategory) => {
    const P = products.find(p => p.category === selectedCategory);
    if (P) {
      return products.filter(p => p.category === selectedCategory);
    }
    return [];
  };
  const filterProductS = (products, selectedCategory) => {
    const P = products.find(p => p.subcategory === selectedCategory);
    if (P) {
      return products.filter(p => p.subcategory === selectedCategory);
    }
    return [];
  };
  const filterProductE = (products, selectedCategory) => {
    const P = products.find(p => p.endCategory === selectedCategory);
    if (P) {
      return products.filter(p => p.endCategory === selectedCategory);
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

  useEffect(() => {
    axios.get('api/products')
      .then(response => {
        dispatch({ type: 'STORE_SUBCATEGORIES', payload: response.data.subcategories })
        dispatch({ type: 'STORE_CATEGORIES', payload: response.data.categories })
        dispatch({ type: 'STORE_PRODUCTS', payload: response.data.products })
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const filterCategory = (subCategories, selectedCategory) => {
    if (selectedCategory) {

      return subCategories.filter(subcategory => subcategory.parentCategory === selectedCategory);
    }
    return [];
  };
  const filterS = filterCategory(subCategories, formData.category)
  const filterE = filterCategory(subCategories, formData.subcategoryId)
  const filterP = filterProductC(products, formData.category);
  const filterPS = filterProductS(products, formData.subcategoryId);
  const filterpE = filterProductE(products, formData.endCategory);

console.log(filterPS);

  return (
    <div>
      <header className="  bg-gray-800  text-white">
        <h1>we have {products.length} Products</h1>
        <nav className="container flex flex-row  bg-zinc-900 mx-auto">

<div className='flex flex-row'>
          <div className="form-group col-md-6 " >
            <label>Category Name ({filterP.length})</label>
            <select
              id="category"
              name="category"
              className="form-control"
              defaultValue={formData.category}
              onChange={handleChange}
              required
            >
              <option>select</option>
              {categories.map((item) => (
                <option key={item._id} value={item._id}>{item.name}</option>
              ))}
            </select>
          </div>
          {formData.category && <div className="form-group col-md-6">
            <label>Category({filterPS.length})</label>
            <select
              id="category"
              name="subcategoryId"
              className="form-control"
              defaultValue={formData.subcategoryId}
              onChange={handleChange}
              required
            >
              <option>select</option>
              {filterS.map((item) => (
                <option key={item._id} value={item._id}>{item.name}</option>
              ))}
            </select>
          </div>}
          {formData?.subcategoryId && <div className="form-group col-md-6">
            <label>category({filterpE.length})</label>
            <select
              id="endcategory"
              name="endCategory"
              className="form-control"
              defaultValue={formData.endCategory}
              onChange={handleChange}
              required
            >
              <option>select</option>
              {filterE.map((item) => (
                <option key={item._id} value={item._id}>{item.name}</option>
              ))}
            </select>
          </div>}
          </div>
        </nav>
      </header>
            <div>
    {formData.endCategory && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filterpE.map(product => (
          <div key={product.id} className="bg-slate-400 p-6 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <h2 className="text-xl font-semibold mb-2">{product.description}</h2>
            <h2 className="text-xl font-semibold mb-2">{product.price}</h2>

          </div>
        ))}
      </div>
    )}

    {formData.subcategoryId && !formData.endCategory && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filterPS.map(product => (
          <div key={product.id} className="bg-slate-400 p-6 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <h2 className="text-xl font-semibold mb-2">{product.description}</h2>
            <h2 className="text-xl font-semibold mb-2">{product.price}</h2>
          </div>
        ))}
      </div>
    )}

    {formData.category && !formData.subcategoryId && !formData.endCategory && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filterP.map(product => (
          <div key={product.id} className="bg-slate-400 p-6 shadow-md rounded-lg">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <h2 className="text-xl font-semibold mb-2">{product.description}</h2>
            <h2 className="text-xl font-semibold mb-2">{product.price}</h2>
          </div>
        ))}
      </div>
    )}
    {(!formData.category && !formData.subcategoryId && !formData.endCategory) && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <div key={product.id} className="bg-slate-400 p-6 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <h2 className="text-xl font-semibold mb-2">{product.description}</h2>
            <h2 className="text-xl font-semibold mb-2">{product.price}</h2>
          </div>
        ))}
      </div>
    )}
  </div>
      </div>
    
  );
};

export default ProductList;
