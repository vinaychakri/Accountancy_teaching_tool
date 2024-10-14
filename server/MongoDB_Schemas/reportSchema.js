const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

//MongoDB schema for reports

const report = new mongoose.Schema({
  topicName: { type: String, required: true },
  suggestions: { type: String, required: true },
  reportedBy: { type: String, required: true },
  createdBy: { type: String, required: true },
  reason: { type: String, require: true },
});
report.plugin(timestamp);
const reportSchema = mongoose.model("Reports", report);
module.exports = reportSchema;
