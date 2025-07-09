// En Products.jsx
import React, { useEffect } from 'react';
import { useProduct } from '../../hooks/useProduct';
import { NavLink } from 'react-router-dom';

const Products = () => {

  const { products, getAllProducts, loading } = useProduct();

  useEffect(() => { getAllProducts() }, [])

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <h2>Products:</h2>
      <section className='product-section'>
        {products.map(product => (
          <div className='product-card' key={product._id}>
            <h3>{product.title}</h3>
            <img src={product.image} alt={product.title} />
            <p>Price: <strong>{product.price}</strong></p>
            <NavLink to={`/product/${product._id}`}>Ver Producto</NavLink>
          </div>
        ))}
      </section>
    </>
  );
};

export { Products };
