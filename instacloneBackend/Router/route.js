const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken')
const bodyparser = require("body-parser");
const express = require("express");
const router = express.Router();
const RegisterModel = require("../Schema/Registrationschema");
const PostModel=require('../Schema/Postschema');
const bodyParser = require("body-parser");
router.use(express.json());
router.use(express.urlencoded({extended:true}));


router.post("/register", async (req, res) => {
    console.log(req.body);
  let {image, name, email, password, confirmpassword } = req.body;

  try {
    const oldUser = await RegisterModel.findOne({ email });
    if (oldUser) {
      return res.send({ status: "error", error: "User exists" });
    } else {
      let securepassword = await bcrypt.hash(password, 10);
      console.log(securepassword);
      await RegisterModel.create({
        image:image,
        name: name,
        email: email,
        password: securepassword,
        confirmpassword: confirmpassword,
      });
      res.send({ status: "ok" });
    }
  } catch (error) {
    res.send({ status: "error" });
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await RegisterModel.findOne({ email });
    if (!user) {
      return res.json({ status: "error", error: "User not found!" });
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = await jwt.sign({ name: user.name }, "secret_key");

      if (res.status(200)) {
        res.json({ status: "ok", data: token, user:user });
      } else {
        res.json({status:"error", error: "error" });
      }
    } else {
      res.json({ status: "error", error: "Password Incorrect" });
    }
  } catch (err) {
    res.send(err);
  }
});

router.post('/getuser',async (req,res)=>{
  const {id}=req.body;
  console.log(id);

  const data=await RegisterModel.findById(id);
  return res.json({data:data})
});

router.post('/createpost',async (req,res)=>{
  let {userId,name,postimage,caption}=req.body;

  try{
    const user=await RegisterModel.findById(userId);
    const useremail=user.email;
    console.log(useremail)
    let postdata=await new PostModel({
      userId,name,postimage,caption
    });
    const data=await postdata.save();
    res.send({status:"ok"});
  }
  catch(err){
    res.send({status:"Error"});
  }
});

router.get('/getposts',async (req,res)=>{
  try{
    const posts=await PostModel.find();
    res.send(posts);
  }
  catch(err){
    res.send(err)
  }
})




module.exports=router;