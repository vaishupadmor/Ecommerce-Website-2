// src/pages/CheckoutPage.jsx
import React, { useState } from 'react';
import PayPalCheckoutButton from '../components/PaymentCheckout';

const CheckoutPage = () => {
  // Simulated cart total; replace with your real cart logic
  const [cartTotal] = useState(99.99);

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Checkout</h2>

      {/* Customer Information Section */}
      <div className="bg-white rounded shadow p-5 mb-6">
        <h3 className="text-xl font-semibold mb-3">Customer Information</h3>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Shipping Address"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded shadow p-5 mb-6">
        <h3 className="text-xl font-semibold mb-3">Order Summary</h3>
        <div className="flex justify-between text-gray-700 text-lg font-medium">
          <span>Cart Total:</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* PayPal Payment Button */}
      <PayPalCheckoutButton amount={cartTotal} />
    </div>
  );
};

export default CheckoutPage;
