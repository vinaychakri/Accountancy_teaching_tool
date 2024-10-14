const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

//MongoDB schema for comment

const comment = new mongoose.Schema({
  title: { type: String, required: true },
  username: { type: String, required: true },
  rating: { type: String, required: true },
  review: { type: String, required: true },
  userInfo: { type: String, require: true },
  id: { type: String, require: true },
});
comment.plugin(timestamp);
const commentSchema = mongoose.model("Comments", comment);
module.exports = commentSchema;
