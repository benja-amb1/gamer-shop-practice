import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from '../App'
import { CreateProduct } from '../components/private/CreateProduct'
import { Products } from '../components/public/Products'
import { Header } from '../assets/layout/Header'
import { Footer } from '../assets/layout/Footer'
import { Product } from '../components/public/Product'
import { UpdateProduct } from '../components/private/UpdateProduct'
import { AdminPanel } from '../components/private/admin/AdminPanel'
import { Login } from '../components/public/Login'
import { RegisterUser } from '../components/public/RegisterUser'
import { Profile } from '../components/public/Profile'
import { UpdateUser } from '../components/public/UpdateUser'
import { PrivateRoutes } from './PrivateRoutes'
import { RegisterAdmin } from '../components/private/admin/RegisterAdmin'
import { RegisterSemiAdmin } from '../components/private/admin/RegisterSemiAdmin'
import { Contact } from '../components/public/Contact'


const Routing = () => {
  return (

    <BrowserRouter>

      <Header />
      <Routes>

        <Route path='/' element={<App />} />


        <Route path='/create-product' element={<CreateProduct />} />
        <Route path='/products' element={<Products />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/update-product/:id' element={<UpdateProduct />} />
        <Route path='/contact' element={<Contact />} />

        <Route path='/login' element={<Login />} />
        <Route path='/sign-up' element={<RegisterUser />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/update-user/:id' element={<UpdateUser />} />



        {/* Routes for admin */}
        <Route element={<PrivateRoutes roles={['admin']} />}>
          <Route path='/admin' element={<AdminPanel />} />
          <Route path='/register-admin' element={<RegisterAdmin />} />
          <Route path='/register-semiadmin' element={<RegisterSemiAdmin />} />
        </Route>

      </Routes>

      <Footer />
    </BrowserRouter>

  )
}

export { Routing }