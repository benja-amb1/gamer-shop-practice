import React, { useState } from 'react'

const useProduct = () => {

  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(parseFloat());
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
      setMsgError('');
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
        setMsgError(data.message);
        clearMessage();
        return;
      }

      if (!data.data.quantity === 0 && !data.data.price) {
        setMsgError('You cant put quantity if you dont have stock');
        returnn;
      }

      setProduct(data.data);
      setMsgSuccess(data.message);
      clearMessage();

    } catch (error) {
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
        return;
      }
      setProducts(data.data);

    } catch (error) {
      console.log(error);
      setMsgError('Server error.')
    } finally {
      setLoading(false);
    }
  }

  const getProduct = async (id) => {
    try {
      const res = await fetch(`${baseUrl}/${id}`, {
        method: 'GET'
      });

      const data = await res.json();

      if (!res.ok) {
        setMsgError(data.message)
      }
      setProduct(data.data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const updateProduct = async (id) => {
    try {
      const res = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, image, price, quantity, stock: stock === 'true', category: categoryInput.split(',').map(cat => cat.trim()).filter(cat => cat.length > 0) })
      });

      const data = await res.json();

      if (!res.ok) {
        setMsgError(data.message);
        clearMessage();
        return;
      }

      setProduct(data.data);
      setMsgSuccess(data.message);
      clearMessage();

    } catch (error) {
      console.log(error);
    }
  }

  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE'
      });

      const data = await res.json();

      if (!res.ok) {
        setMsgError(data.message)
        clearMessage();
        return;
      }

      setProduct(null);
      setMsgSuccess(data.message)
      clearMessage();

    } catch (error) {
      console.log(error);
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
    addProduct, getAllProducts, categoryInput, setCategoryInput, getProduct, updateProduct, deleteProduct
  };
};

export { useProduct };