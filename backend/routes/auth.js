const express=require("express");
const User=require("../models/User");
var bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const router=express.Router();

var jwt = require('jsonwebtoken');

const JWT_SECRET="Dhruvgogna@#hello";

// create a user using the post method , endpoint :: "/createuser"
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



module.exports=router;