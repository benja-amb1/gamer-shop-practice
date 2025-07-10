import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import LoginIcon from '../images/loginicon.svg'
import { useUser } from '../../hooks/useUser';

const Header = () => {

  const [modal, setModal] = useState(false);

  const { getSession, user } = useUser();

  useEffect(() => { getSession() }, [])


  const toggleModal = () => {
    setModal(prevValue => !prevValue)
  }

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/')
  }


  return (
    <header>
      <img onClick={handleClick} className='logo' src="https://www.pngmart.com/files/23/Free-Logos-PNG.png" alt="Logo Image" />

      <nav>
        <ul>
          <li>
            <NavLink to={`/`}>Home</NavLink>
          </li>
          <li>
            <NavLink to={`/products`}>Products</NavLink>
          </li>
          <li>
            <NavLink to={`/about-us`}>About Us</NavLink>
          </li>
          <li>
            <NavLink to={`/contact`}>Contact</NavLink>
          </li>

          <li className="login-icon-wrapper">
            <img src={LoginIcon} alt="Login Icon" onClick={toggleModal} />

            {modal && (
              <div className="header-modal">
                {!user ? (
                  <>
                    <NavLink to={`/login`}>Login</NavLink>
                    <NavLink to={`/sign-up`}>Register</NavLink>
                  </>
                ) : (
                  <>
                    <NavLink to={`/profile/${user._id}`}>{user.name} {user.surname}</NavLink>
                    <NavLink to={`/logout`}>Logout</NavLink>
                  </>
                )}

              </div>
            )}
          </li>

        </ul>
      </nav>

    </header>
  )
}

export { Header }