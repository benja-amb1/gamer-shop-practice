// En Home.jsx
import React, { useEffect } from 'react';
import { useProduct } from '../../hooks/useProduct';
import { Products } from './Products';
import { NavLink } from 'react-router-dom';
import { CardsHome } from '../../assets/layout/CardsHome';
import { ArrowUp } from '../../assets/layout/ArrowUp';
import { CardProduct } from './CardProduct';

const Home = () => {
  const { products, getAllProducts, loading } = useProduct();

  const limitedProducts = products.slice(0, 6);


  useEffect(() => {
    getAllProducts();
  }, []);

  const allCategories = products.flatMap(product => product.category);
  const uniqueCategories = allCategories.filter((cat, index, self) => self.indexOf(cat) === index)

  if (loading) return <p>Loading products...</p>;

  return (
    <main>
      <section>
        <h1>Welcome to AdixGaming!</h1>
        <h2>Here you'll find the best products with the best prices!</h2>
        <h3>Some Products:</h3>


        <article className='product-section'>
          {limitedProducts.map(product => <CardProduct key={product._id} product={product} />)}
        </article>

        <NavLink className='btn-black' to={`/products/`}>See All Products</NavLink>
      </section>

      <CardsHome />

      <section>
        <h2>Explore for Categories!</h2>
        {uniqueCategories.map((category => (
          <h2 key={category}>Category: {category}</h2>
        )))}
      </section>

      <ArrowUp />
    </main>
  );
};

export { Home };
