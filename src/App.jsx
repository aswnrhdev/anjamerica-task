import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleSearch = () => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="container">
      <h1 className="header">Products</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by the product name"
          value={searchValue}
          onChange={handleInputChange}
          className="search-input"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product">
            <img src={product.image} alt={product.title} className="image" />
            <p className="price">${product.price.toFixed(2)}</p>
            <h2 className="title">{product.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;