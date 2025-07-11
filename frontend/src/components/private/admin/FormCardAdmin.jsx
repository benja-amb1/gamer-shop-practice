import React from 'react'

const FormCardAdmin = ({ title, description, image, price, quantity, stock, categoryInput, msgError, msgSuccess, setTitle, setDescription, setImage, setPrice, setQuantity, setStock, setCategoryInput }) => {
  return (
    <>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="title">Description:</label>
      <input

        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label htmlFor="title">Image URL:</label>
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <label htmlFor="title">Price:</label>
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      <label htmlFor="title">Quantity:</label>
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />

      <label htmlFor="title">Stock:</label>
      <select value={stock} onChange={(e) => setStock(e.target.value)}>
        <option value="">-- Stock --</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>

      <label htmlFor="title">Categories:</label>
      <input
        type="text"
        placeholder="Categories (comma separated)"
        value={categoryInput}
        onChange={(e) => setCategoryInput(e.target.value)}
      />

      {msgError && <p className='msg-error'>{msgError} </p>}
      {msgSuccess && <p className='msg-success'>{msgSuccess}</p>}

    </>
  )
}

export { FormCardAdmin }