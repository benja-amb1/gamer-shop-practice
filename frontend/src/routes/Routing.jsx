import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from '../App'
import { CreateProduct } from '../components/private/CreateProduct'
import { Products } from '../components/public/Products'
import { Header } from '../assets/layout/Header'
import { Footer } from '../assets/layout/Footer'
import { Product } from '../components/public/Product'

const Routing = () => {
  return (

    <BrowserRouter>

      <Header />
      <Routes>

        <Route path='/' element={<App />} />


        <Route path='/create-product' element={<CreateProduct />} />
        <Route path='/products' element={<Products />} />
        <Route path='/product/:id' element={<Product />} />


      </Routes>

      <Footer />
    </BrowserRouter>

  )
}

export { Routing }