import React from 'react';

const ProductList = ({ products }) => {
  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <strong>{product.name}</strong> - {product.description} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
