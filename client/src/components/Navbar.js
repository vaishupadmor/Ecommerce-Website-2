// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import cartIcon from '../assets/cart.png';


const Navbar = () => {
  return (
    <nav className='bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50'>
      <Link to="/" className="text-3xl font-bold text-blue-600">MyShop</Link>
      <div className="space-x-6 text-lg">
        <Link to="/" className="hover:text-blue-500">Home</Link>
        <Link to="/user/orders" className="hover:text-blue-500">User Orders</Link>
        <Link to="/about" className="hover:text-blue-500">About</Link>
        <Link to="/contactus" className="hover:text-blue-500">Contact</Link>
        <Link to="/dashboards" className="hover:text-blue-500">Dashboard</Link>
      </div>
      <Link to="/user/cart">
        <img
          src={cartIcon}
          alt="Cart"
          className="w-10 h-10 cursor-pointer"
        />
      </Link>
      <div className="space-x-6 text-lg">
      <Link to="/login" className="hover:text-blue-500">Login</Link>
      <Link to="/signup" className="hover:text-blue-500">Signup</Link>
      </div>
    </nav>
  );
};

export default Navbar;
