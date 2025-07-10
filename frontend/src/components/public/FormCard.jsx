import React from 'react'

const FormCard = ({ name, setName, surname, setSurname, email, setEmail, password, setPassword, msgError, msgSuccess }) => {
  return (
    <>
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
    </>
  )
}

export { FormCard }