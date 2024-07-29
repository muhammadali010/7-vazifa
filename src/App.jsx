import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://cars-pagination.onrender.com/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="product-list">
      {products.map(product => (
        <div className="card" key={product.id}>
          <img src={product.image} alt={product.name} className="card-img" />
          <h2 className="card-title">{product.name}</h2>
          <p className="card-description">comments:{product.comments}</p>
          <p className="card-price">${product.newPrice}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
