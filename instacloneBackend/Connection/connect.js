const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/Instagram')
.then(res=>{
    console.log("Connected");
})
.catch(res=>{
    console.log("Error:"+res);
})