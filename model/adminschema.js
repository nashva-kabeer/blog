var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1/blogdb");

var AdminSchema = mongoose.Schema({
    userid:String,
    password:String
})

module.exports = mongoose.model('Admin',AdminSchema);