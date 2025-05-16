
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";


import { getCurrentUser,getReadableTimestamp ,api} from "../utils/common";
import OrderCard from "../components/OrderCard";
import HomeIcon from "../assets/Home.png"
import { Link } from "react-router-dom";




function UserOrders() {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);

  const loadUserOrders = async () => {
    if (!user?._id) {
      return;
    }

    try {
    
      const response = await api.get(`/orders/user/${user._id}`);

       console.log(response); // For debugging: see what the actual response is like

    setOrders(response?.data?.data || response?.data || []); // Handle potential structure issues
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to load orders.");
  }
  };

  useEffect(() => {
    const user = getCurrentUser();

    if (user) {
      setUser(user);
    } else {
      toast.error("Please login to access this page");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    }
  }, []);

  useEffect(()=>{
    if(user){
      loadUserOrders()
    }
  },[user])

   
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  const OrderViewDialog = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const {
      _id,
      products,
      totalBill,
      deliveryAddress,
      phone,
      paymentMode,
      status,
      createdAt,
    } = selectedOrder;

     return (
    
      
       <div
        className="min-h-screen bg-gray-400 fixed top-0 left-0 w-full bg-opacity-75 z-50 flex justify-center items-center"
        onClick={onClose}
      >
        <div
          className="bg-white w-1/2 min-h-96 rounded-lg px-10 py-5 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="text-red-500 absolute top-2 right-4"
            onClick={onClose}
          >
            Close
          </button>

          <h1 className="text-2xl font-bold mb-10">Order Details</h1>

          <p>Order ID: {_id}</p>
          <p>Ordered On: {getReadableTimestamp(createdAt)}</p>
          <p>Payment Mode: {paymentMode}</p>
          <p>Delivery Address: {deliveryAddress}</p>
          <p>Phone: {phone}</p>
          <p>Status: {status}</p>

          {products.map((product) => {
            const { productId, quantity, price } = product;
            const { name, images } = productId;

             return (
              <div className="flex items-center space-x-4 mb-4 shadow-md border border-gray-200 rounded-md">
                <img src={images[0]} alt={name} className="w-20 h-20" />
                <div>
                  <p>{name}</p>
                  <p>
                    ₹{price} x {quantity}
                  </p>
                </div>
              </div>
            );
          })}

          <p className="text-lg font-bold mt-3 border-t-2 pt-4">
            Bill Amount: ₹{totalBill}
          </p>
        </div>
      </div>
   
    );
  };

  return (
    <div >
      <Link to="/">
      <img src={HomeIcon} alt="Home" className="absolute top-2 right-10 w-16 h-16 cursor-pointer bg-white rounded-full shadow-lg" />
      </Link>
      <h1>My Orders</h1>
      <p>
        Current user: {user.name} - {user.email}
      </p>
      <div  className=" flex flex-col mt-24">
  {orders.length === 0 ? (
    <p>No orders found.</p>
  ) : (
    orders.map((order) => (
      <OrderCard key={order._id} order={order}  onClick={() => {
                setSelectedOrder(order);
                setIsDialogOpen(true)}}/>
    ))
  )}
</div>

 <OrderViewDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedOrder({});
        }}
      />
     
    </div>
  );
}

export default UserOrders;