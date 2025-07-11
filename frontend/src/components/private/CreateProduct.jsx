
import { useEffect } from 'react';
import { useProduct } from '../../hooks/useProduct';
import { FormCardAdmin } from './admin/FormCardAdmin';

const CreateProduct = () => {
  const {
    title, setTitle,
    description, setDescription,
    image, setImage,
    price, setPrice,
    quantity, setQuantity,
    stock, setStock,
    categoryInput, setCategoryInput,
    msgError, msgSuccess,
    addProduct,
  } = useProduct();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProduct();
  }

  return (
    <section className='section-form'>
      <form onSubmit={handleSubmit}>


        <FormCardAdmin title={title} description={description} image={image} price={price} quantity={quantity} stock={stock} categoryInput={categoryInput} msgError={msgError} msgSuccess={msgSuccess} setTitle={setTitle} setDescription={setDescription} setImage={setImage} setPrice={setPrice} setQuantity={setQuantity} setStock={setStock} setCategoryInput={setCategoryInput} addProduct={addProduct} />

        <button type="submit">
          Create Product
        </button>


      </form>
    </section>
  );
};

export { CreateProduct };
