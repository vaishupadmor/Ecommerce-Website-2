import {model,Schema} from 'mongoose';

const userSchema=new Schema({
    name: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        unique:true,
        sparse:true
    },
    phone: {
        type:String,
        unique:true,
    },
    address: {
        type:String,
        
    },
    role: {
        type:String,
        default:'user',
    },
    password: {
        type:String,
        required:true,
    },
    
})

const User =model("User",userSchema);
export default User;