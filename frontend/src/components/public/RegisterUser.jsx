import React from 'react'
import { useUser } from '../../hooks/useUser'
import { useNavigate } from 'react-router-dom';

const RegisterUser = () => {

  const { name, email, surname, password, setName, setEmail, setSurname, setPassword, msgError, msgSuccess, registerUser } = useUser();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser();

    setTimeout(() => {
      navigate('/login')
    }, 3000);
  }

  return (
    <section className='section-form'>
      <form onSubmit={handleSubmit}>

        <label htmlFor="title">Name:</label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          type="text"
          placeholder="Name"
        />

        <label htmlFor="title">Surname:</label>
        <input
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={e => setSurname(e.target.value)}
        />


        <label htmlFor="title">Email:</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />


        <label htmlFor="title">Password:</label>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />

        {msgError && <p className='msg-error'>{msgError} </p>}
        {msgSuccess && <p className='msg-success'>{msgSuccess}</p>}

        <button type="submit">
          Sign Up
        </button>


      </form>
    </section>
  )
}

export { RegisterUser }