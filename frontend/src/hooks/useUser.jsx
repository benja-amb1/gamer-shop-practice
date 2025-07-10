import React, { useState } from 'react'

export const useUser = () => {

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState([]);
  const [users, setUsers] = useState([]);
  const [msgError, setMsgError] = useState('');
  const [msgSuccess, setMsgSuccess] = useState('');

  const baseUrl = 'http://localhost:3000/users';

  const clearMessage = () => {
    setTimeout(() => {
      setMsgError('');
      setMsgSuccess('');
    }, 5000);
  }

  const register = async (role) => {
    try {
      const res = await fetch(`${baseUrl}/register/${role}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, surname, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setMsgError(data.message);
        clearMessage();
      }

      setUser(data.data);
      setMsgSuccess(data.message);
      clearMessage();
    } catch (error) {
      console.log(error);
    }
  }

  const registerUser = () => register('user')
  const registerSemiAdmin = () => register('semiadmin')
  const registerAdmin = () => register('admin')




  return {
    registerUser, msgError, msgSuccess, user, users, name, surname, email, password, setEmail, setName, setPassword, setSurname, registerAdmin, registerSemiAdmin
  }
}
