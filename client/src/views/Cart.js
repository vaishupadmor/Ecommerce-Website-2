import React, { useEffect, useState } from 'react'
import toast,{Toaster} from 'react-hot-toast';
import Input from "../components/Input.js"
import Button from '../components/Button';
import { getJwtToken ,api} from '../utils/common.js';

function Cart() {

const [cart,setCart] = useState([]);
const [total,setTotal] = useState(0);
const [isCheckoutOpen ,setIsCheckoutOpen] = useState(false);
const [name,setName] =useState(" ");
const [address,setAddress] = useState(" ");
const [phone,setPhone] =useState("");
const [paymentMode,setPaymentMode] =useState("COD");
const [isPaymentOpen,setIsPaymentOpen]=useState(false);


    

    const loadCart = () =>{
        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(storedCart)
    }
    const removeItemFromCart =(productId) =>{
        const indexOfProduct =cart.findIndex((product)=>product.productId === productId)
    if(indexOfProduct > -1 ){
        cart.splice(indexOfProduct ,1);
        localStorage.setItem("cart" ,JSON.stringify(cart));
        loadCart();
    }
    toast.success("Product Removed Successfully")
    
    }

    useEffect(()=>{
let totalValue =0;
cart.forEach((product)=>{
    totalValue +=product.price * product.quantity;
})
setTotal(totalValue);
    },[cart])

    useEffect(()=>{
        loadCart();
    },[])
const CheckoutDialog = ({isOpen,onClose})=>{
if(!isOpen) return null;

return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center' onClick={onClose}>
        <div className='bg-slate-200 p-10 rounded-lg w-[400px]' onClick={(e)=>{e.stopPropagation()}}>
<h1> Checkout view </h1>
<Input 
label="Name"
placeholder='Enter your name ' 
val={name}
onChange={(val)=>{ setName(val)}}
/>
<Input 
label="Address"
placeholder='Enter your address ' 
val={address}
onChange={(val)=>{ setAddress(val)}}
/>

<Input 
label="Phone"
placeholder='Enter your Phone Number ' 
val={phone}
onChange={(val)=>{ setPhone(val)}}
/>

<select
value={paymentMode}
onChange={(e)=>{setPaymentMode(e.target.value)}}
className='px-2 py-1 border border-gray-300 rounded-md w-full focus:outline-none mb-4 text-lg'
>
<option value="COD" > Cash on delivery</option>
<option value="UPI" > UPI</option>
</select>

<div className='mt-10 flex justify-center'>
    <Button label="Complete Order" 
    onClick={()=>{
        setIsCheckoutOpen(false);
        setIsPaymentOpen(true);
        }} variant="primary"/>
</div>
        </div>
    </div>
)
}


const placeOrder=async ()=>{
    const orderBody={
        "products":cart.map((product)=>({
            
            "productId":product.productId,
            "quantity":product.quantity,
            "price":product.price,
        })),
        "deliveryAddress":address,
        "paymentMode":paymentMode,
        "phone":phone,
    }
const response =await api.post(`/orders`,orderBody);

toast.success("Order Placed successfully");
localStorage.removeItem("cart");

setTimeout(()=>{
    window.location.href="/user/orders";
}, 2000)
}

const PaymentDialog =({isPaymentOpen,onClose})=>{
if(!isPaymentOpen) return null ;

return (
    <div className='fixed top-0 left-0 w-full h-full bg-white  flex justify-center  z-60' >

<div className='bg-white p-10 rounded-lg w-[400px]' >
<h1 className='text-2xl'> Complete Your Payment </h1>


<Button 
label="Complete Payment "
onClick={()=>{
    toast.success("Payment successfull");
    placeOrder();
  
}}

variant="primary"
/>
</div>

    </div>
)
}




  return (
    <div>
        <div>
<h1 className='text-4xl text-center py-10'> My Cart</h1>
    </div>
    <div className='flex flex-wrap flex-col justify-center items-center'>
{cart.map((product)=>{
const {image,name ,price,productId,quantity} =product;
const totalValue =price *quantity;

return (
    <div className='bg-white shadow-lg rounded-lg overflow-hidden  m-5 px-10 py-5 w-full md-w-2/3 relative flex' key={productId}>
        <img src={image} alt={name} className=' h-40 object-contain  object-center'  />
        

        <div>
            <h1 className='text-2xl font-bold'> {name}</h1>
         <p className='text-lg'>  ₹ {price}/-</p>
         <p className='text-lg'> Quantity : {quantity}</p>
         <p className='text-lg'> Total : ₹  {totalValue}/-</p>
        </div>
        <button className='absolute top-5 right-5 bg-red-500 text-sm px-5 py-1 text-white rounded-lg' onClick={()=>{removeItemFromCart(productId)}}>Remove from Cart</button>
        </div>
)
})}
    </div>
    <div className='flex justify-center items-center'>
        <span className='text-2xl mr-10'> ₹ {total} /-</span>
    
    <button className='bg-blue-500 text-white px-5 py-2 rounded-lg ' onClick={()=>{ setIsCheckoutOpen(true)}}> Checkout</button>
    </div>
    <CheckoutDialog 
     isOpen={isCheckoutOpen}
     onClose={()=>{setIsCheckoutOpen(false)}}
        />

         <PaymentDialog 
     isPaymentOpen={isPaymentOpen}
     onClose={()=>{setIsPaymentOpen(false)}}
        />
    <Toaster/>
    </div>
  )
}

export default Cart