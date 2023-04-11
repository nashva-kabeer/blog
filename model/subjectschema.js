var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1/blogdb");

var subjectSchema = mongoose.Schema({
    subject : String
});

module.exports = mongoose.model("Subject",subjectSchema)