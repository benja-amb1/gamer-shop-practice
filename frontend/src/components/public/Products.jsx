// En Products.jsx
import React, { useEffect, useState } from 'react';
import { useProduct } from '../../hooks/useProduct';

import { ArrowUp } from '../../assets/layout/ArrowUp';
import { CardProduct } from './CardProduct.jsx'

const Products = () => {

  const { products, getAllProducts, loading, stock } = useProduct();
  const [term, setTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);


  const searchTerm = (e) => {
    const value = e.target.value.toLowerCase();
    setTerm(value);

    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(value) ||
      (Array.isArray(product.category)
        ? product.category.some(cat => cat.toLowerCase().includes(value))
        : product.category?.toLowerCase().includes(value))
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
          <CardProduct key={product._id} product={product} />
        ))}
      </article>


      <article className='product-section'>
        <ArrowUp />
      </article>
    </section>
  );
};



export { Products };
