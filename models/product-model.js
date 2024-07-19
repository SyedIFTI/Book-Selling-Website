const mongoose = require('mongoose')
let ProductShema = mongoose.Schema({

name : String,
price : String,
images : Buffer,
slogan : String,
discount : {
    type : Number,
    default :0
},
})
module.exports = mongoose.model('product',ProductShema)