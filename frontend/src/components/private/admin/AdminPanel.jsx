import React, { useEffect, useState } from 'react';
import { useProduct } from '../../../hooks/useProduct';
import { NavLink } from 'react-router-dom';
import { ArrowUp } from '../../../assets/layout/ArrowUp';


const AdminPanel = () => {
  const { products, getAllProducts, loading, deleteProduct } = useProduct();
  const [term, setTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [modalProductId, setModalProductId] = useState(null);

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

  const handleDelete = async (id) => {
    await deleteProduct(id);
    await getAllProducts();
    setModalProductId(null);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  if (loading) return <p>Loading...</p>;

  return (
    <section className='products-jsx'>
      <h2>Products:</h2>

      <input
        className='search-input'
        type="text"
        onChange={searchTerm}
        value={term}
        placeholder="Search product..."
      />

      <div className='navlinks-admin'>
        <NavLink to={`/create-product`}>Create Product</NavLink>
        <NavLink to={`/register-admin`}>Register Admin</NavLink>
        <NavLink to={`/register-semiadmin`}>Register Semi-Admin</NavLink>
      </div>


      <article className='product-section'>
        {filteredProducts.map(product => (
          <div className='product-card' key={product._id}>
            <h3>{product.title}</h3>
            <img src={product.image} alt={product.title} loading='lazy' />
            <p>Price: <strong>${product.price}</strong></p>

            {(product.stock === false || product.quantity === 0) ? (
              <p className='no-stock'>Without Stock!</p>
            ) : (
              <p className='stock'>¡Stock!</p>
            )}

            <div className='admin-products-btns'>
              <NavLink to={`/product/${product._id}`}>View Product</NavLink>
              <NavLink to={`/update-product/${product._id}`}>Update Product</NavLink>
              <button onClick={() => setModalProductId(product._id)}>Delete Product</button>
            </div>

            {modalProductId === product._id && (
              <div className="modal">
                <p>Delete this product?</p>
                <button className='btn-confirm' onClick={() => handleDelete(product._id)}>Confirm</button>
                <button className='btn-cancel' onClick={() => setModalProductId(null)}>Cancel</button>
              </div>
            )}
          </div>
        ))}


        <ArrowUp />

      </article>
    </section>
  );
};

export { AdminPanel };
