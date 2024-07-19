const jwt = require('jsonwebtoken')
let generatetoken = (user)=>{
   return jwt.sign({email:user.email,id:user._id},process.env.SECRET_KEY)
}
module.exports.generatetoken = generatetoken