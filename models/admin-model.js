const mongoose = require('mongoose')
const AdminModel = mongoose.Schema({
    fullname:String,
    email:String,
    password : String
})
module.exports =  mongoose.model('admin',AdminModel)