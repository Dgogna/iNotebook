var jwt = require('jsonwebtoken');

const JWT_SECRET="Dhruvgogna@#hello";

const fetchuser=(req,res,next)=>{
    // get the user from the jwt token and set in the req headers
    const token=req.header("auth-token");
    if(!token){
        return res.status(401).send("please authenticate using a valid token")
    }

    try {
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;

        next();
    } catch (error) {
        return res.status(401).send("please authenticate using a valid token")
    }

    
};


module.exports = fetchuser;