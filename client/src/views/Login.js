import React,{useState,useEffect} from 'react'
import Input from '../components/Input.js'
import Button from '../components/Button.js'

import toast ,{Toaster}from "react-hot-toast";
import {Link} from 'react-router-dom';
import { api, getCurrentUser } from "../utils/common";
function Login() {
  
  const [loginData ,setLoginData] =useState({
   
    email:"",
    password:"",
     })

  const [error,setError] =useState("");

  const processLogin =async () => {
   toast.loading("Please wait...");
   try{
      const response = await api.post(`/login`,loginData);
      localStorage.setItem("e-commerce-user-token",response.data.token);
      localStorage.setItem("e-commerce-user-details", JSON.stringify(response.data.data));
      toast.dismiss();
    
      toast.success(response.data.message);
     setLoginData({
   
    email:"",
    password:"",
    
      })
      setTimeout(()=>{
        window.location.href="/dash";
      },2000)
      
   } catch(err){
      toast.dismiss();
      setError(err?.response?.data?.message)
      toast.error(err?.response?.data?.message);
   }
}


 useEffect(() => {
    
    const currentUser = getCurrentUser();

    if (currentUser) {
      toast.success("You are already logged in. Redirecting to dashboard...");
      setTimeout(() => {
        window.location.href = "/dash";
      }, 3000);
    }
  
  }, []);
  return (
  <div className=' min-h-scrren flex flex-col items-center justify-center px-5'> 
    
    <h1 className='text-3xl mb-4 text-gray-600'> Login</h1>
     <div className='md:w-[450px] bg-white rounded-2xl shadow-lg hover:shadow-xl px-10 py-6'>

     
  
  <Input
   label={"Email"}
   val={loginData.email}
   onChange={(val)=>{
      setLoginData({...loginData,email: val}); setError("")
   }}
/>



<Input
   label={"Password"}
   val={loginData.password}
   type='password'
   onChange={(val)=>{
      setLoginData({...loginData,password: val}); setError("")
   }}/>


     
     
     <p className='text-red-500 text-xs mt-2'>{error}</p>
     <p> Don't have an account? {" "} <Link to="/signup" className='text-blue-500'> Login</Link></p>
    

     <div className='flex justify-around mt-6'>
      <Button
      label="cancel" 
      onClick={()=> {
         window.location.href="/";
      }}
      variant={"danger"}
      />
      <Button
      label="Login" 
      onClick={()=> processLogin()}
      variant={"primary"}
      />
     </div>
     
  </div>
  <Toaster/>
  </div>
  
  )
}


export default Login