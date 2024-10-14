const mongoose = require("mongoose");

const Survey = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    question1: { type: String, required: true },
    question2: { type: String, required: true },
    question3: { type: String, required: true },
    question4: { type: String, required: true },
  },
  { timestamps: true }
);
const SurveyModel = mongoose.model("Surveys", Survey);
module.exports = SurveyModel;
