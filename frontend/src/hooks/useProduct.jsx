import React, { useState } from 'react'

const useProduct = () => {

  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true)
  const [msgError, setMsgError] = useState('');
  const [msgSuccess, setMsgSuccess] = useState('');
  const [categoryInput, setCategoryInput] = useState('');


  const baseUrl = 'http://localhost:3000/products';

  const clearMessage = () => {
    setTimeout(() => {
      setMsgSuccess('');
    }, 5000);
  }

  const addProduct = async () => {
    try {
      const res = await fetch(`${baseUrl}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, image, price, quantity, stock: stock === 'true', category: categoryInput.split(',').map(cat => cat.trim()).filter(cat => cat.length > 0) })

      });

      const data = await res.json();

      if (!res.ok) {
        setMsgError(data.message)
      }

      setProduct(data.data);
      setMsgSuccess(data.message);
      clearMessage();

    } catch (error) {
      setMsgError(data.message || 'Error to create post.');
      console.log(error);
    }
  }

  const getAllProducts = async () => {
    try {
      const res = await fetch(`${baseUrl}/all-products`, {
        method: 'GET'
      });

      const data = await res.json();

      if (!res.ok) {
        setMsgError(data.message)
      }
      setProducts(data.data);

    } catch (error) {
      console.log(error);
      setMsgError(data.message || 'Server error.')
    } finally {
      setLoading(false);
    }
  }

  return {
    product,
    title, setTitle,
    description, setDescription,
    image, setImage,
    price, setPrice,
    quantity, setQuantity,
    stock, setStock,
    category, setCategory,
    loading,
    msgError,
    msgSuccess, products, setProducts,
    addProduct, getAllProducts, categoryInput, setCategoryInput
  };
};

export { useProduct };