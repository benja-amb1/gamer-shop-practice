import React from 'react'
import { useUser } from '../../hooks/useUser'
import { useNavigate } from 'react-router-dom';
import { FormCard } from './FormCard';

const RegisterUser = () => {

  const { name, email, surname, password, setName, setEmail, setSurname, setPassword, msgError, msgSuccess, registerUser } = useUser();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser();

    if (msgSuccess) {
      setTimeout(() => {
        navigate('/login')
      }, 3000);
    }


  }

  return (
    <section className='section-form'>
      <form onSubmit={handleSubmit}>

        <FormCard name={name} setName={setName} email={email} surname={surname} password={password} setEmail={setEmail} setPassword={setPassword} setSurname={setSurname} msgError={msgError} msgSuccess={msgSuccess} />

        <button type="submit">
          Sign Up
        </button>


      </form>
    </section>
  )
}

export { RegisterUser }