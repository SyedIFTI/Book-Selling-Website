const jwt = require("jsonwebtoken")
const adminmodel = require("../models/admin-model")
module.exports = async(req,res,next)=>{
    try{
        if(!req.cookies.token){
            res.send("UnAuthrized")
        }
           let decodeduser = jwt.verify(req.cookies.token,process.env.SECRET_KEY)
            let admin  = await adminmodel.findById(decodeduser.id)
            if(!admin){
                return res.send("You are not the owner🏴‍☠️" )
            }
        req.admin = admin
        next()
    }
    catch(err){
        console.log("Error in  finding admin"+err.message);
    }
}