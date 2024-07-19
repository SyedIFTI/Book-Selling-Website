const jwt = require('jsonwebtoken')
const userModel = require('../models/user-model')
module.exports=async(req,res,next)=>{
    try{
        if(!req.cookies.token){
        res.send("You need to login first")
        next()
    }
    else{   
    let decode = jwt.verify(req.cookies.token,process.env.SECRET_KEY)
   let user =  await userModel.findOne({email:decode.email})
   .select('-password')
   req.user= user
   next()
}
}catch(err){
    res.send("something went wrong")
}
    }
