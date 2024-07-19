const express= require('express')
const upload = require('../config/multer-config')
const productmodel = require('../models/product-model')
const router = express.Router()
router.get("/",(req,res)=>{
    res.send("products")
})
router.post('/create',upload.single('image'),async(req,res)=>{
let{name,price,slogan , discount}= req.body
let product = await productmodel.create({
    images: req.file.buffer,
    name,
    price,
    discount,
    slogan
})
res.redirect("/admin/adminpanel")

})
module.exports= router