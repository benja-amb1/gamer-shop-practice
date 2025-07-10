import React from 'react'

const Footer = () => {

  const date = new Date().getFullYear();

  return (
    <div className='footer-container'>
      <footer>
        <p>Web Devloped by <strong>benja-amb1</strong>. All rights reserved &copy; {date}. </p>
      </footer>
    </div>

  )
}

export { Footer }