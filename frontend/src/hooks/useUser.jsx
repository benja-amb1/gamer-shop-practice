import React, { useState } from 'react'

export const useUser = () => {

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [msgError, setMsgError] = useState('');
  const [msgSuccess, setMsgSuccess] = useState('');
  const [loading, SetLoading] = useState(true)

  const baseUrl = import.meta.env.VITE_API_URL;

  const clearMessage = () => {
    setTimeout(() => {
      setMsgError('');
      setMsgSuccess('');
    }, 5000);
  }

  const register = async (role) => {
    try {
      const res = await fetch(`${baseUrl}/users/register/${role}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, surname, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setMsgError(data.message);
        clearMessage();
        return;
      }

      setUser(data.data);
      setMsgSuccess(data.message);
      clearMessage();
    } catch (error) {
      console.log(error);
    } finally {
      SetLoading(false)
    }
  }

  const registerUser = () => register('user')
  const registerSemiAdmin = () => register('semiadmin')
  const registerAdmin = () => register('admin')

  const login = async () => {
    try {
      const res = await fetch(`${baseUrl}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      const data = await res.json();

      if (!res.ok) {
        setMsgError(data.message);
        clearMessage();
        return false;
      }

      setUser(data.data);
      setMsgSuccess(data.message);
      clearMessage();
      return true;

    } catch (error) {
      console.log(error);
    }
  }

  const getUser = async (id) => {
    try {
      const res = await fetch(`${baseUrl}/users/get-user/${id}`, {
        method: 'GET', credentials: 'include'
      });

      const data = await res.json();
      if (!res.ok) {
        setMsgError(data.message);
        clearMessage();
        return;
      }
      setUser(data.data);

    } catch (error) {
      console.log(error);
    } finally {
      SetLoading(false)
    }
  }

  const getSession = async () => {
    try {
      const res = await fetch(`${baseUrl}/users/get-session`, {
        method: 'GET',
        credentials: 'include'
      });

      const data = await res.json();
      if (!res.ok) {
        setMsgError(data.message);
        clearMessage();
        return;
      }
      setUser(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      SetLoading(false)
    }
  }

  const logout = async () => {
    try {
      const res = await fetch(`${baseUrl}/users/logout`, {
        method: 'POST',
        credentials: 'include'
      });

      const data = await res.json();

      setUser(null);

    } catch (error) {
      console.log(error);
    } finally {
      SetLoading(false)
    }
  }

  const deleteUser = async (id) => {
    try {
      const res = await fetch(`${baseUrl}/users/delete-user/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      const data = await res.json();

      if (!res.ok) {
        setMsgError(data.message)
        clearMessage();
        return;
      }

      setUser(null);
      setMsgSuccess(data.message);
      clearMessage();

    } catch (error) {
      console.log(error);
    } finally {
      SetLoading(false)
    }
  }

  const updateUser = async (id) => {
    try {
      const res = await fetch(`${baseUrl}/users/update-user/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, surname, email, password })
      });


      const data = await res.json();

      if (!res.ok) {
        setMsgError(data.message);
        clearMessage();
        return;
      }

      setUser(data.data);
      setMsgSuccess(data.message);
      clearMessage();

    } catch (error) {
      console.log(error);
    } finally {
      SetLoading(false)
    }
  }





  return {
    registerUser, msgError, msgSuccess, user, users, name, surname, email, password, setEmail, setName, setPassword, setSurname, registerAdmin, registerSemiAdmin, login, getUser, getSession, logout, deleteUser, updateUser, loading
  }
}
