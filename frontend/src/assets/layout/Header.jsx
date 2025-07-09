import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import LoginIcon from '../images/loginicon.svg'

const Header = () => {

  const [modal, setModal] = useState(false);

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
                <NavLink to={`/login`}>Login</NavLink>
                <NavLink to={`/register`}>Register</NavLink>
              </div>
            )}
          </li>

        </ul>
      </nav>

    </header>
  )
}

export { Header }