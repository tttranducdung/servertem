var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var User_opc_Schema = new Schema({
    user_name:String,
    user: String,
    password: String
})
var User_opc_Schema = mongoose.model('user_opc_ua', User_opc_Schema)
module.exports = User_opc_Schema



