import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from '../App'
import { CreateProduct } from '../components/private/CreateProduct'
import { Products } from '../components/public/Products'
import { Header } from '../assets/layout/Header'
import { Footer } from '../assets/layout/Footer'

const Routing = () => {
  return (

    <BrowserRouter>

      <Header />
      <Routes>

        <Route path='/' element={<App />} />


        <Route path='/create-product' element={<CreateProduct />} />
        <Route path='/products' element={<Products />} />


      </Routes>

      <Footer />
    </BrowserRouter>

  )
}

export { Routing }