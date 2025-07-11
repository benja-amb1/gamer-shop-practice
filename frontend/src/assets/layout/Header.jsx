import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import LoginIcon from '../images/loginicon.svg'
import { useUser } from '../../hooks/useUser';

const Header = () => {

  const [modal, setModal] = useState(false);

  const { getSession, user, logout, loading } = useUser();


  console.log(user);

  useEffect(() => { getSession() }, [])


  const toggleModal = () => {
    setModal(prevValue => !prevValue)
  }

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/')
  }

  const handleLogout = async () => {
    setModal(false);
    await logout();
    await navigate('/')
    window.location.reload();

  };


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


                {/* if */}
                {user ? (user.role === 'admin' ? (
                  <>
                    <NavLink to={`/profile/${user._id}`}>{user.name} {user.surname}</NavLink>
                    <NavLink to={`/admin`}>Admin Panel</NavLink>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                  </>
                ) : ( //elseif
                  <>
                    <NavLink to={`/profile/${user._id}`}>{user.name} {user.surname}</NavLink>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                  </>
                )
                ) : ( //else
                  <>
                    <NavLink to={`/login`}>Login</NavLink>
                    <NavLink to={`/sign-up`}>Register</NavLink>
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