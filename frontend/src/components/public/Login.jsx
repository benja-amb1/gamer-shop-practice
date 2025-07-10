import React from 'react'
import { useUser } from '../../hooks/useUser'
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const { msgError, msgSuccess, email, setEmail, password, setPassword, user, login } = useUser();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login();
    if (success) {
      setTimeout(() => {
        navigate('/');
        window.location.reload();
      }, 3000);
    }


  };

  return (
    <section className='section-form'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Email:</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />


        <label htmlFor="title">Password:</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {msgError && <p className='msg-error'>{msgError} </p>}
        {msgSuccess && <p className='msg-success'>{msgSuccess}</p>}

        <button type="submit">
          Login
        </button>


      </form>
    </section>
  )
}

export { Login }