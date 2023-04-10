var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1/blogdb");

var userSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    password: String,
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model("User",userSchema);