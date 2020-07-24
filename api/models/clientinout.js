var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var clientinout = new Schema({
    timestamps: String,
    eventtype: String,
    sessionname: String,
    sessionid: String,
    clientidentity: String,
    security: String,
})

var clientinoutSchema = mongoose.model('clientinouthistory', clientinout);

module.exports = clientinoutSchema






