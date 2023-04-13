var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1/blogdb");

var topicmanagerSchema = mongoose.Schema({
    name: String,
    userid: String,
    password: String,
    subject: String,
    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model("Topicmanager",topicmanagerSchema);