import React from 'react'
import { FormCard } from './FormCard'
import { useUser } from '../../hooks/useUser'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const UpdateUser = () => {

  const { name, setName, surname, setSurname, email, setEmail, password, setPassword, msgError, msgSuccess, user, getUser, updateUser, getSession } = useUser();

  const { id } = useParams();

  useEffect(() => {
    getUser(id)
  }, [])


  useEffect(() => {
    if (user) {
      setEmail(user.email) || '';
      setName(user.name) || '';
      setSurname(user.surname) || '';
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await getSession();
    await updateUser(id);
    await getUser(id)
  }

  return (
    <section className='section-form'>
      {user ? (
        <form onSubmit={handleSubmit}>

          <FormCard name={name} setName={setName} email={email} surname={surname} password={password} setEmail={setEmail} setPassword={setPassword} setSurname={setSurname} msgError={msgError} msgSuccess={msgSuccess} />

          <button type="submit">
            Update User
          </button>


        </form>
      ) : (
        <p>Not user found.</p>
      )}

    </section>
  )
}

export { UpdateUser }