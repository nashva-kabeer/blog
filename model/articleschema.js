var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1/blogdb");

var articleSchema = mongoose.Schema({
    email: String,
    title:String,
    subject:String,
    description:String,
    article: String,
    createdAt: {type: Date, default: Date.now},
    approved:Number
});

module.exports = mongoose.model("Article",articleSchema);