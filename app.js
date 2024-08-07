const express = require('express')
const app = express()
const db = require('./config/mongoose-connction')
const path = require('path')
const userRoutes = require('./routes/userRoutes')
const indexRoutes = require('./routes/index')
const adminRoutes = require('./routes/adminRoutes')
const productRoutes = require('./routes/productRoutes')
const cookieParser = require('cookie-parser')
const flash = require('flash')
const expressSession =  require('express-session')
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,'public')))
app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_SECERET,
    resave: false,
    saveUninitialized: false,
  }))
app.use(flash())
app.use("/",indexRoutes)
app.use("/user",userRoutes)
app.use("/admin",adminRoutes)
app.use("/product",productRoutes) 
app.listen(3000)