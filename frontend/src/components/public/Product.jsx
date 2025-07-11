import React, { useEffect } from 'react'
import { useProduct } from '../../hooks/useProduct'
import { useParams } from 'react-router-dom'

export const Product = () => {

  const { product, getProduct } = useProduct();
  const { id } = useParams();

  console.log(product);

  useEffect(() => {
    getProduct(id);
  }, [])

  return (
    <section className='productId'>
      <article className='productId-card' key={product._id}>
        <h2>{product.title}</h2>
        <img src={product.image} alt={product.title} loading='lazy' />
        <p>Description: {product.description}</p>
        <p>Price: <strong>${product.price}</strong></p>
        <p>Quantity: <strong>{product.quantity}</strong></p>
        {product.stock === false && (
          <p >Stock: <span className='no-stock'>Without Stock!</span></p>
        )}

        <button className='btn-orange'>Add to cart</button>
      </article>
    </section>
  )
}
