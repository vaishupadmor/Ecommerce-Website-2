import React, { useEffect, useState } from 'react';
import { getCurrentUser, logout } from '../utils/common';
import {
  Mail as MailIcon,
  Truck as TruckIcon,
  IdCard as NameIcon,
  KeySquare as RoleIcon,
  LogOut as LogOutIcon,
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UserDetailRow = ({ icon, value }) => {
  return (
    <p className="flex items-center mb-4 text-xl text-gray-700">
      {icon}
      <span className="ml-4">{value}</span>
    </p>
  );
};

function Dashboard() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUser(user);
    } else {
      toast.error("You're not logged in");
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    toast.success('Logout successful');
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto bg-white p-8 shadow-lg rounded-lg mt-16 mb-10">
        <h1 className="text-center text-3xl font-semibold mb-6 text-gray-800">User Dashboard</h1>

        <div className="grid grid-cols-2 gap-4 mb-8 text-center">
          <Link
            to="/user/orders"
            className="bg-blue-100 hover:bg-blue-200 transition-all p-4 rounded-lg text-blue-800 font-medium shadow-sm"
          >
            <TruckIcon className="mx-auto mb-2" size={28} />
            My Orders
          </Link>
          <Link
            to="/user/cart"
            className="bg-blue-100 hover:bg-blue-200 transition-all p-4 rounded-lg text-blue-800 font-medium shadow-sm"
          >
            🛒
            <div className="mt-2">My Cart</div>
          </Link>
        </div>

        <div className="mb-6 border-t border-gray-300 pt-4">
          <UserDetailRow icon={<NameIcon className="text-blue-500" />} value={user?.name} />
          <UserDetailRow icon={<MailIcon className="text-blue-500" />} value={user?.email} />
          <UserDetailRow icon={<RoleIcon className="text-blue-500" />} value={user?.role} />
        </div>

        <button
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2"
          onClick={handleLogout}
        >
          Logout <LogOutIcon size={20} />
        </button>
      </div>
      <Footer />
      <Toaster />
    </div>
  );
}

export default Dashboard;
