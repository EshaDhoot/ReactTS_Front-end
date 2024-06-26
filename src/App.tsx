import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Product from './pages/Product';
import Navbar from './pages/Navbar';
import Dummy from './pages/Dummy';
const App: React.FC = () => {
  return (
    <>
    <Navbar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/products' element={<Product />} />
          <Route path='/protected' element={<Dummy />} />
        </Routes>
        <ToastContainer />
      
    </>
  );
}

export default App
