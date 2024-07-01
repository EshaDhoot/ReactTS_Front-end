import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Product from './pages/Product';
import ProductDetails from './pages/ProductDetails';
import Portfolio from './pages/Portfolio';
const App: React.FC = () => {
  return (
    <>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/products' element={<Product />} />
          <Route path='/productdetails/:productid' element={<ProductDetails/>} />
          <Route path='/portfolio/:userid' element={<Portfolio />} />

        </Routes>
        <ToastContainer />
      
    </>
  );
}

export default App
