const mongoose = require('mongoose')
let UserShema = mongoose.Schema({
fullname : String,
email : String,
password : String,
cart : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "product"
}],
order : {
    type: Array,
    default : []
}
})
module.exports = mongoose.model('user',UserShema)