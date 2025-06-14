import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast, { Toaster } from "react-hot-toast";

function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thanks! We'll be in touch.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-grow py-16 px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-10">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Get in touch</h2>
            <p className="text-gray-600 mb-6">
              Have a question or feedback? We’d love to hear from you! Fill out the form or reach us via email or phone.
            </p>
            <ul className="text-gray-700 space-y-3">
              <li><strong>Email:</strong> support@shopease.com</li>
              <li><strong>Phone:</strong> +91 98765 43210</li>
              <li><strong>Address:</strong> 123, E-commerce Street, Tech City, India</li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="5"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        <Toaster />
      </main>

      <Footer />
    </div>
  );
}

export default ContactUs;
