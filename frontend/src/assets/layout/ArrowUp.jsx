import React from 'react'
import ArrowUpScroll from '../images/arrow-up.svg'

const ArrowUp = () => {

  const toTop = () => {
    window.scrollTo(0, 0)
  }

  return (
    <img className='arrow-scroll' src={ArrowUpScroll} alt="Arrow Up Scroll" onClick={toTop} />
  )
}

export { ArrowUp }