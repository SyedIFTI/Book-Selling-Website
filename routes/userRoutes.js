const express = require("express")
const router =  express.Router()
const {register ,login} = require('../controllers/UserAuthCtrler')
router.get("/",(req,res)=>{
    res.send("hiuser")
})
router.post("/register",register)
router.post('/login',login)
router.get('/logout',(req,res)=>{
    res.cookie("token","")
    res.redirect("/")
})
module.exports = router