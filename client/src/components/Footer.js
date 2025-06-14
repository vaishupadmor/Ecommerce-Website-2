// components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-10">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="mb-2 text-lg">© {new Date().getFullYear()} MyShop. All rights reserved.</p>
        <div className="space-x-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Support</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
