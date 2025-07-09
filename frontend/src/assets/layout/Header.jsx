import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import LoginIcon from '../images/loginicon.svg'

const Header = () => {

  const navigate = useNavigate();

  const handleClick = () =>
    navigate('/')

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

          <li>
            <NavLink to={`/login`}><img src={LoginIcon} alt="" /></NavLink>
          </li>
        </ul>
      </nav>

    </header>
  )
}

export { Header }