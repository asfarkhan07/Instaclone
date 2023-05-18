const mongoose=require('mongoose');

const RegistrationSchema=new mongoose.Schema({
    image:{
        type:String,
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    }
})

const RegisterModel=mongoose.model("user-reg-data",RegistrationSchema)
module.exports=RegisterModel;