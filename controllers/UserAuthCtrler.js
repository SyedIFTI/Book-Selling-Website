const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken')
const usermodel = require('../models/user-model')
const { generatetoken } = require('../utils/generateToken')
module.exports.register=async(req,res)=>{
    let {fullname,email,password} = req.body
      let findUser = await usermodel.findOne({email})
      if(findUser){
         res.send("this account is exists")
      }
      else{
          bcrypt.genSalt(10, function(err, salt) {
              bcrypt.hash(password, salt,async function(err, hash) {
               if(err) return res.send(err)
                  else{
                      let CreateUser = await usermodel.create({
                          email,
                          fullname,
                          password: hash
                      })
                     
          let token =  generatetoken(CreateUser)
                    res.cookie("token",token)
                    res.redirect('/login')
          
                  }
              });
          });
       
          
      }
      
  
  }
module.exports.login = async(req,res)=>{
   let{email,password} = req.body
    try{
let user = await usermodel.findOne({email})
if(!user){
res.send("Incorrect email")
}
else{
    bcrypt.compare(password, user.password, function(err, result) {
        if(result==true){
            let token = generatetoken(user)
            res.cookie("token",token)
            res.redirect("/")
        }
        else{
            res.send("Incorrect Password")
        }
    });
}

    }catch(err){
        console.log(err.message)
    }
}
