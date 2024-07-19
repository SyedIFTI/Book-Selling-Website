const express = require('express')
const router =  express.Router()
const adminmodel =  require('../models/admin-model')
const IsLoggedIn = require('../middleware/IsLoggedIn')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const IsAdmin = require('../middleware/IsAdmin')
router.post('/create',async(req,res)=>{
    if(process.env.CREATE_ADMIN == "development"){
        let checkadmin = await adminmodel.find()
        if(checkadmin.length>0){
          res.send("just one admin is allowed")
        }
        else{
          try{
            let {fullname, email, password} = req.body
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, async function(err, hash) {
                    const admin =   await adminmodel.create({
                  fullname,
                  email,
                  password : hash
                    })
                    res.send("admin is crated")
                });
            });
                   
          }
          catch(err){
              res.send("error")
          }
        }
        

    }
    else{
        res.send("no such route is available")
    }
    
})

router.get("/adminpanel",IsAdmin,(req,res)=>{
    res.render("createproducts")
})
router.get('/',(req,res)=>{
    res.render("LoginAdmin")
})

router.post('/adminlogin',async(req,res)=>{
    let {email, password} = req.body

    let checkisAdminemail = await adminmodel.findOne({email})

    if(!checkisAdminemail){
     res.send("weong email")
    }
    else{
        bcrypt.compare(password, checkisAdminemail.password, function(err, result) {
           if(result==true){
              let token = jwt.sign({id:checkisAdminemail._id},process.env.SECRET_KEY)
              res.cookie("token", token)

              res.redirect("/admin/adminpanel") 
            }
           else{
            res.send("your is incorrect")
           }
        });
    }
})

router.get("/adminlogout",(req,res)=>{
    res.cookie("token","")
    res.redirect("/admin")
})

module.exports = router