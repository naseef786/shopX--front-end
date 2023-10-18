import React,{useContext,useEffect} from 'react';
import axios  from '../config/axios'
import { Store } from '../store/Store';






const ProductList = () => {
const {state,dispatch } = useContext(Store)
const {products,categories,subCategories} = state ;

  useEffect(() => {
    axios.get('api/products')
    .then(response => {
      dispatch({ type: 'STORE_SUBCATEGORIES', payload: response.data.subcategories })
      dispatch({ type: 'STORE_CATEGORIES', payload: response.data.categories })
      dispatch({ type: 'STORE_PRODUCTS', payload: response.data.products })
    })
      .catch(error => console.error('Error:', error));
  }, []);

console.log(products);






  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products && products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> - {product.description} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
