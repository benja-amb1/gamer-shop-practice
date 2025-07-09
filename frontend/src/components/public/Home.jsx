// En Home.jsx
import React, { useEffect } from 'react';
import { useProduct } from '../../hooks/useProduct';
import { Products } from './Products';
import { NavLink } from 'react-router-dom';
import { CardsHome } from '../../assets/layout/CardsHome';
import { ArrowUp } from '../../assets/layout/ArrowUp';

const Home = () => {
  const { products, getAllProducts, loading } = useProduct();

  products.splice(6, 1);

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
        <h1>Home</h1>
        <h2>Some Products:</h2>
        <div className='product-section'>

          {products.map(product => (
            <div className='product-card' key={product._id}>
              <h3>{product.title}</h3>
              <img src={product.image} alt={product.title} />
              <p>Price: <strong>{product.price}</strong></p>
              <NavLink to={`/product/${product._id}`}>View Product</NavLink>
            </div>
          ))}


          <NavLink className='btn-orange' to={`/products/`}>See All Products</NavLink>
        </div>
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
