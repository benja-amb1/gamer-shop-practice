import { NavLink } from 'react-router-dom';

const CardProduct = (props) => {

  const { product, filteredProducts } = props;

  return (
    <div className='product-card' key={product._id}>
      <h3>{product.title}</h3>
      <img src={product.image} alt={product.title} />
      <p>Price: <strong>${product.price}</strong></p>

      {(product.stock === false || product.quantity === 0) ? (
        <p className='no-stock'>Without Stock!</p>
      ) : (
        <p className='stock'>¡Stock!</p>
      )}
      <NavLink to={`/product/${product._id}`}>View Product</NavLink>
    </div>
  )
}

export { CardProduct }