const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const questionSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
});

const quizSchema = new mongoose.Schema({
  questions: [questionSchema],
  topicId: { type: String, required: true },
  topicName: { type: String, required: true },
  username: { type: String, required: true },
});

quizSchema.plugin(timestamp);

const QuizModel = mongoose.model("Question Paper", quizSchema);

module.exports = QuizModel;
