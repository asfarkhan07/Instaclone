const mongoose=require('mongoose');

const PostSchema=new mongoose.Schema({
    userId:{
        type:String
    },
    name:{
        type:String
    },
    postimage:{
        type:String
    },
    caption:{
        type:String
    }
})

const postmodel=mongoose.model("post",PostSchema)
module.exports=postmodel;