
import { useEffect } from 'react';
import { useProduct } from '../../hooks/useProduct';
import { useParams } from 'react-router-dom';
import { FormCardAdmin } from './admin/FormCardAdmin';

const UpdateProduct = () => {
  const {
    title, setTitle,
    description, setDescription,
    image, setImage,
    price, setPrice,
    quantity, setQuantity,
    stock, setStock,
    categoryInput, setCategoryInput,
    msgError, msgSuccess,
    getProduct, updateProduct, product
  } = useProduct();

  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProduct(id);
  }


  useEffect(() => {
    if (product) {
      setTitle(product.title || '');
      setDescription(product.description || '');
      setImage(product.image || '');
      setPrice(product.price || 0);
      setQuantity(product.quantity || 0);
      setStock(String(product.stock));
      setCategoryInput(Array.isArray(product.category) ? product.category.join(', ') : '');
    }
  }, [product]);

  useEffect(() => {
    getProduct(id);
  }, [id])

  return (
    <section className='section-form'>
      <form onSubmit={handleSubmit}>

        <FormCardAdmin title={title} description={description} image={image} price={price} quantity={quantity} stock={stock} categoryInput={categoryInput} msgError={msgError} msgSuccess={msgSuccess} setTitle={setTitle} setDescription={setDescription} setImage={setImage} setPrice={setPrice} setQuantity={setQuantity} setStock={setStock} setCategoryInput={setCategoryInput} getProduct={getProduct} updateProduct={updateProduct} product={product} />

        <button type="submit">
          Update Product
        </button>


      </form>
    </section>
  );
};

export { UpdateProduct };
