import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ProductCard from '../components/ProductCard';
import HomeImg from "./Ecommerce-page-bro.png";
import cartIcon from "../assets/cart.png";
import { Link } from 'react-router-dom';
import { api } from "../utils/common.js";
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);  // Add loading state

  const loadProducts = async () => {
    setLoading(true);  // Start loading
    try {
      const response = await api.get(`/products?limit=100&search=${search}`);

      // Check if response.data and response.data.data are valid
      if (response && response.data && response.data.data) {
        setProducts(response.data.data);
      } else {
        toast.error("No products found");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      // Error handling, check if error.response exists
      const errorMessage = error.response?.data?.message || "Failed to fetch products";
      toast.error(errorMessage);
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  useEffect(() => {
    loadProducts();
  }, [search]);  // Reload products when search changes

  return (

    <div>
     <Navbar />
      <img
        src={HomeImg}
        className='h-24 object-cover object-center block mx-auto'
        alt='header'
      />

      <div className='flex justify-center py-10'>
        <input
          type='text'
          placeholder='Search Products'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className='w-2/3 p-2 border-gray-300 rounded-md text-2xl active:outline-none focus:outline-none'
        />
      </div>

      <div className='flex flex-wrap justify-center'>
        {loading ? (
          <div className="text-center">Loading products...</div>  // Show loading text
        ) : (
          products.map((product) => {
            return <ProductCard key={product._id} {...product} />;
          })
        )}
      </div>

      <Link to="user/cart">
        <img
          src={cartIcon}
          alt='shopping cart'
          className='fixed top-10 right-10 w-16 h-16 cursor-pointer bg-white rounded-full shadow-lg'
        />
      </Link>
<Footer/>
      <Toaster />
    </div>
  );
}

export default Home;
