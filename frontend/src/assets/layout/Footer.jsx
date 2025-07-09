import React from 'react'

const Footer = () => {

  const date = new Date().getFullYear();

  return (
    <footer>
      <p>Web Devloped by <strong>benja-amb1</strong>. All rights reserved &copy; {date}. </p>
    </footer>
  )
}

export { Footer }