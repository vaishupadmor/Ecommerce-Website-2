import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-grow py-16 px-6 max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">Who We Are</h1>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          <span className="font-semibold text-blue-600">ShopEase</span> is not just an e-commerce platform — it's your everyday shopping companion.
          We blend convenience, quality, and value to give you an unforgettable online shopping experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 my-10">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">🌍 Our Mission</h3>
            <p className="text-gray-600">
              To make quality products accessible to everyone — affordably and effortlessly.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">💼 Our Vision</h3>
            <p className="text-gray-600">
              Redefining online retail with personalization, trust, and innovation.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">🤝 Our Promise</h3>
            <p className="text-gray-600">
              Fast delivery, responsive support, and secure checkout — always.
            </p>
          </div>
        </div>

        <p className="text-lg text-gray-700 mt-10">
          Join thousands of happy customers shopping smarter every day. Welcome to <span className="font-bold text-blue-600">ShopEase</span>.
        </p>
      </main>

      <Footer />
    </div>
  );
}

export default AboutUs;
