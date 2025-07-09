
import { useEffect } from 'react';
import { useProduct } from '../../hooks/useProduct';

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
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <select value={stock} onChange={(e) => setStock(e.target.value)}>
          <option value="">-- Stock --</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <input
          type="text"
          placeholder="Categories (comma separated)"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
        />

        <button type="submit">
          Create Product
        </button>



        {msgError && <p>{msgError}</p>}
        {msgSuccess && <p>{msgSuccess}</p>}
      </form>
    </section>
  );
};

export { CreateProduct };
