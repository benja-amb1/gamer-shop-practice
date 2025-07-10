// En Home.jsx
import React, { useEffect } from 'react';
import { useProduct } from '../../hooks/useProduct';
import { Products } from './Products';
import { NavLink } from 'react-router-dom';
import { CardsHome } from '../../assets/layout/CardsHome';
import { ArrowUp } from '../../assets/layout/ArrowUp';

const Home = () => {
  const { products, getAllProducts, loading } = useProduct();

  const limitedProducts = products.slice(0, 6);


  useEffect(() => {
    getAllProducts();
  }, []);

  const allCategories = products.flatMap(product => product.category);
  const uniqueCategories = allCategories.filter((cat, index, self) => self.indexOf(cat) === index);

  console.log(uniqueCategories);




  if (loading) return <p>Loading products...</p>;

  return (
    <main>
      <section>
        <h1>Welcome to AdixGaming!</h1>
        <h2>Here you'll find the best products to the best prices!</h2>
        <h3>Some Products:</h3>
        <div className='product-section'>

          {limitedProducts.map(product => (
            <div className='product-card' key={product._id}>
              <h4>{product.title}</h4>
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



        </div>
        <NavLink className='btn-black' to={`/products/`}>See All Products</NavLink>
      </section>

      <CardsHome />

      <section>
        <h2>Explore for Categories!</h2>
        {uniqueCategories.map((category => (
          <h2>Category: {category}</h2>
        )))}
      </section>
      <ArrowUp />
    </main>
  );
};

export { Home };
