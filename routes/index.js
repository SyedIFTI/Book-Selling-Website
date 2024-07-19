const express = require('express')
const IsLoggedIn = require('../middleware/IsLoggedIn')
const productmodel = require('../models/product-model')
const userModel = require('../models/user-model')
const router = express.Router()

router.get('/', async(req,res)=>{
    let product = await productmodel.find()
    res.render("Ebook",{loggedin:req.cookies.token,product})

})
router.get('/signup',(req,res)=>{
    let error = req.flash("error")
    res.render("Signup",{error})
})
router.get('/login',(req,res)=>{
    res.render('Login')
})
// router.get("/profile",IsLoggedIn,(req,res)=>{
//     res.send("wjj")
// })
router.get("/books",async(req,res)=>{
    let product = await productmodel.find() 
    res.render("Books",{product,loggedin:req.cookies.token})
})

router.get('/addtothecart/:product_id',IsLoggedIn,async (req,res)=>{
    try{
        let user = await userModel.findOne({email:req.user.email})
        user.cart.push(req.params.product_id)
        await user.save()
        res.redirect('/Books')
    }
    catch(err){
        console.log("Error 404"+err.message)
    }
})

router.get('/cart', IsLoggedIn, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email }).populate("cart");
        let createproduct = user.cart.map(async(items)=>{
        let product = await productmodel.findById(items._id)
        let totalship  =product.price;
let totaldisc = product.discount/100
      let result  = totalship*totaldisc
      let final = (product.price - result)+100
        return{
            product_id: product._id,
         images: product.images,   
        name : product.name,
        slogan : product.slogan,
        price : product.price,
        discount : product.discount,
totalAmmount : final,

}
        })
createproduct = await  Promise.all(createproduct)
let subtotal = createproduct.reduce((acc,product)=>acc+product.totalAmmount,0)
res.render('cart', {createproduct,subtotal});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching cart data');
    }
});
router.get("/deleteproduct/:product_id",IsLoggedIn,async(req,res)=>{
  let user  = await userModel.findOne({email:req.user.email}).populate("cart")
  user.cart  = user.cart.filter(product=>product._id.toString()!==req.params.product_id)
 await user.save()
 res.redirect("/cart")
})
module.exports = router
module.exports= router