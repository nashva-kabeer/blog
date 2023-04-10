var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1/blogdb");

var userSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    password: String,
    createdAt: Date,
    approved: Number
});

module.exports = mongoose.model("User",userSchema);