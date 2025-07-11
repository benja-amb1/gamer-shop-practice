import React from 'react'
import CreditCardSVG from '../images/credit-card.svg'
import TruckSVG from '../images/truck.svg'
import ShieldSVG from '../images/shield.svg'

const CardsHome = () => {
  return (
    <section>
      <div className='quotes-home'>
        <div className='card-home'>
          <img src={CreditCardSVG} alt="Credit Card Image" loading='lazy' />
          <h4>Hasta 18 cuotas</h4>
          <p>abonando con tarjetas de crédito</p>
        </div>

        <div className='card-home'>
          <img src={TruckSVG} alt="Credit Card Image" loading='lazy' />
          <h4>Envíos a todo el país</h4>
          <p>a través de OCA</p>
        </div>

        <div className='card-home'>
          <img src={ShieldSVG} alt="Credit Card Image" loading='lazy' />
          <h4>Garantía oficial</h4>
          <p>de hasta 36 meses en todos los productos</p>
        </div>
      </div>
    </section>
  )
}

export { CardsHome }