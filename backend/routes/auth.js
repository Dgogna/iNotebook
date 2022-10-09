const express=require("express");
const User=require("../models/User");
var bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const router=express.Router();

var jwt = require('jsonwebtoken');
const fetchuser=require("../middleware/fetchuser");

const JWT_SECRET="Dhruvgogna@#hello";

// ROUTE:1  create a user using the post method , endpoint :: "/createuser"
// here we dont need to authorize. only aythorized users will come here

router.post("/createuser"
    // ,
    // [
    //     body('name',"Enter a valid name").isLength({ min: 3 }),
    //     body('email',"Enter a valid email").isEmail(),
    //     body('password',"password must be atleast 5 characters").isLength({ min: 5 })]
    ,
    async(req,res)=>{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        try {
            // check weather the user exists in the table or not
            let user=await User.findOne({email:req.body.email});
            if(user){
                res.json("user already exists in the database")
                return;
            }

            //create a user
            let salt = await bcrypt.genSaltSync(10);
            const secPass=await bcrypt.hash(req.body.password,salt);
            user= await User.create({
                name:req.body.name,
                email:req.body.email,
                password:secPass
            });

            const data={
                user:{
                    id:user.id
                }
            }
            const authToken=jwt.sign(data,JWT_SECRET);
            return res.json({authToken});
           
        } catch (error) {
            return res.status(500).send("Some error occured");
        }
})


//ROUTE:2   authenticate an user using port "/login"
router.post("/login",async(req,res) =>{
    const {email,password}=req.body;

    try {

        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json("Plaease try to login with correct credentials");
        }
        const passwordCompare=await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json("Plaease try to login with correct credentials");
        }

        const data={
            user:{
                id:user.id
            }
        }
        const authToken=jwt.sign(data,JWT_SECRET);
        return res.json({authToken});

        
    } catch (error) {
        return res.status(500).send("Some error occured");
    }
})


// ROUTE:3 getting logged in user details "/api/auth/getuser"  Login required

router.post("/getuser",fetchuser,async(req,res)=>{

    try {
        const userId=req.user.id;
        const user=await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }

});

module.exports=router;