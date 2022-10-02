const express=require("express");
const router=express.Router();

router.get("/",(req,res)=>{
    let obj={
        name:"Dhruv",
        email:"dhruvgogna01@gmail.com"
    }
    res.send(obj);
})



module.exports=router;