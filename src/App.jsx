import React, { useEffect, useState } from 'react';
import { Route, Routes, Link, useParams } from 'react-router-dom';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetch('https://cars-pagination.onrender.com/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div>
      <div className="filter-container">
        <label htmlFor="category-select">Filter by category: </label>
        <select id="category-select" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All</option>
          <option value="не популярен">не популярен</option>
          <option value="известный">известный</option>
          <option value="средний">средний</option>
        </select>
      </div>
      <Routes>
        <Route path="/" element={
          <div className="products-container">
            {filteredProducts.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id} className="card">
                <img src={product.image} alt={product.name} />
                <p>{product.description}</p>
                <p>${product.newPrice}</p>
                <h2>{product.name}</h2>
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
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>New Price: ${product.newPrice}</p>
      <p>Old Price: ${product.oldPrice}</p>
      <p>Category: {product.category}</p>
      <p>Comments: {product.comments}</p>
    </div>
  );
};

export default App;
