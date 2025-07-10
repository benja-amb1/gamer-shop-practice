// En Products.jsx
import React, { useEffect, useState } from 'react';
import { useProduct } from '../../hooks/useProduct';
import { NavLink } from 'react-router-dom';
import { ArrowUp } from '../../assets/layout/ArrowUp';

const Products = () => {

  const { products, getAllProducts, loading, stock } = useProduct();
  const [term, setTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  products.forEach(product => {
    console.log(product);
  })
  const searchTerm = (e) => {
    const value = e.target.value.toLowerCase();
    setTerm(value);

    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(value)
    );

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    setFilteredProducts(products)
  }, [products])


  useEffect(() => { getAllProducts() }, [])

  if (loading) return <p>Loading...</p>;

  return (
    <section className='products-jsx'>
      <h2>Products:</h2>
      <input className='search-input'
        type="text"
        onChange={searchTerm}
        value={term}
        placeholder="Search product..."
      />

      <article className='product-section'>
        {filteredProducts.map(product => (
          <div className='product-card' key={product._id}>
            <h3>{product.title}</h3>
            <img src={product.image} alt={product.title} />
            <p>Price: <strong>${product.price}</strong></p>

            {(product.stock === false || product.quantity === 0) ? (
              <p className='no-stock'>Without Stock!</p>
            ) : (
              <p></p>
            )}
            <NavLink to={`/product/${product._id}`}>View Product</NavLink>
          </div>
        ))}

        <ArrowUp />
      </article>
    </section>
  );
};



export { Products };
