import React from 'react'
import { FormCard } from '../../public/FormCard';
import { useUser } from '../../../hooks/useUser';

const RegisterSemiAdmin = () => {

  const { name, email, surname, password, setName, setEmail, setSurname, setPassword, msgError, msgSuccess, registerSemiAdmin } = useUser();


  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerSemiAdmin();
  }

  return (
    <section className='section-form'>
      <form onSubmit={handleSubmit}>

        <FormCard name={name} setName={setName} email={email} surname={surname} password={password} setEmail={setEmail} setPassword={setPassword} setSurname={setSurname} msgError={msgError} msgSuccess={msgSuccess} />

        <button type="submit">
          Sign Semi-Admin
        </button>


      </form>
    </section>
  )
}

export { RegisterSemiAdmin }