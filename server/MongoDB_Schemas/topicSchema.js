const mongoose = require("mongoose");

const Topic = new mongoose.Schema(
  {
    title: { type: String, required: true },
    level: { type: String, required: true },
    purpose: { type: String, required: true },
    type: { type: String, required: true },
    details: { type: String, required: true },
    reference: { type: String, required: true },
    description: { type: String, required: true },
    imageInfo: { type: String, required: true },
    img: {
      data: Buffer,
      contentType: String,
    },
    userInfo: { type: String, required: true },
  },
  { timestamps: true }
);
const TopicModel = mongoose.model("Topics", Topic);
module.exports = TopicModel;
