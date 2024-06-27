import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Product from './pages/Product';
import Dummy from './pages/Dummy';
import Navbar from './pages/Navbar';
import ProductDetails from './pages/ProductDetails';
const App: React.FC = () => {
  return (
    <>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/products' element={<Product />} />
          <Route path='/productdetails/:productid' element={<ProductDetails />} />

        </Routes>
        <ToastContainer />
      
    </>
  );
}

export default App
