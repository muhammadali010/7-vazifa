import React, { useEffect, useState } from 'react';
import { Route, Routes, Link, useParams } from 'react-router-dom';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://cars-pagination.onrender.com/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={
          <div className="products-container">
            {products.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id} className="card">
                <img src={product.image} alt={product.name} />
                <h2>{product.name}</h2>
                <p>${product.newPrice}</p>
                <p>Comments: {product.comments}</p>
              </Link>
            ))}
          </div>
        } />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://cars-pagination.onrender.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail">
      <div>
      <img src={product.image} alt={product.name} />
      </div>
      <div>
      <h2>{product.name}</h2> 
      <p>{product.description}</p> 
      <p>New Price: ${product.newPrice}</p> 
      <p>Old Price: ${product.oldPrice}</p> 
      <p>Category: {product.category}</p> 
      <p>Comments: {product.comments}</p> 
      </div>
    </div>
  );
};

export default App;
