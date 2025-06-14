import React from 'react';
import {RouterProvider,createBrowserRouter} from "react-router-dom"
import ReactDOM from 'react-dom/client';
import './index.css';
import Signup from "./views/Signup.js"
import Login from "./views/Login.js"
import Home from "./views/Home.js"
import NotFound from './views/NotFound.js';
import Dashboard from './views/Dashboard.js';
import UserOrders from './views/UserOrders.js'
import Cart from "./views/Cart.js"
import About from "./views/AboutUs.js"
import ContactUs from './views/ContactUs.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router=createBrowserRouter([
{
  path:"/",
  element:<Home/>
},
{
  path:"/login",
  element:<Login/>
},
{
  path:"/dashboards",
  element:<Dashboard/>
},
{
  path:"/user/orders",
  element:<UserOrders/>
},
{
  path:"/user/cart",
  element:<Cart/>
},
{
  path:"/signup",
  element:<Signup/>
},
{
  path:"/about",
  element:<About/>
},
{
  path:"/contactus",
  element:<ContactUs/>
},
{
  path:"/*",
  element:<NotFound/>
}
])
root.render(
  <div className='bg-zinc-100 min-h-screen'>
    <RouterProvider router={router}/>
  </div>
);


