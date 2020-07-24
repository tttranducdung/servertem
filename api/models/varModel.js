var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var opcSchema = new Schema({
    index: String,
    namedev: String,
    name: String,
    datatype: String,
    writable: String,
    value: String
})
var bienopcmodel = mongoose.model('bienopc', opcSchema)

module.exports = bienopcmodel









