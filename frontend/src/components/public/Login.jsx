import React from 'react'

const Login = () => {
  return (
    <section className='section-form'>
      <form>
        <label htmlFor="title">Email:</label>
        <input
          type="email"
          placeholder="Email"
        />


        <label htmlFor="title">Password:</label>
        <input
          type="password"
          placeholder="Password"
        />

        {/* {msgError && <p className='msg-error'>{msgError} </p>}
        {msgSuccess && <p className='msg-success'>{msgSuccess}</p>} */}

        <button type="submit">
          Login
        </button>


      </form>
    </section>
  )
}

export { Login }