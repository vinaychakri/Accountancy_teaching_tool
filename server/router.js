const express = require("express");
const endpoint = express.Router();
const ImageController = require("./ImageController");
const registrationHandler = require("./Handlers/registrationHandler");
const topicHandler = require("./Handlers/topicHandler");
const surveyHandler = require("./Handlers/surveyHandler");
const reportHandler = require("./Handlers/reportHandler");
const commentHandler = require("./Handlers/commentHandler");
const questionController = require("./Handlers/questionHandler");
const requestController = require("./Handlers/requestChangesHandler");
// Registration routes
endpoint.post("/register", registrationHandler.userRegistration);
endpoint.get("/verify/:token", registrationHandler.tokenVerificationController);
endpoint.post("/login", registrationHandler.userLogin);
endpoint.post("/forgotPassword", registrationHandler.resetPassword);
endpoint.get("/reset/:id", registrationHandler.resetController);
endpoint.post("/resetPassword", registrationHandler.updatePasswordController);

// Topic routes
endpoint.post(
  "/addTopic",
  ImageController.single("image"),
  topicHandler.addTopicController
);
endpoint.get("/getTopics", topicHandler.getTopicController);
endpoint.delete("/deleteTopic/:id", topicHandler.deleteTopicController);
endpoint.put(
  "/updateTopic",
  ImageController.single("image"),
  topicHandler.updateTopicController
);

// Survey routes
endpoint.post("/addSurvey", surveyHandler.addSurveyController);
endpoint.get("/getSurvey", surveyHandler.getSurveyController);
endpoint.delete("/deleteSurvey/:id", surveyHandler.deleteSurveyController);

// Report routes
endpoint.post("/report", reportHandler.addReportController);
endpoint.get("/getReports", reportHandler.getReportController);
endpoint.delete("/deleteReport/:id", reportHandler.deleteReportController);

// Comment routes
endpoint.post("/comment", commentHandler.addCommentController);
endpoint.put("/updateComment", commentHandler.updateCommentController);
endpoint.delete("/deleteComment/:id", commentHandler.deleteCommentController);
endpoint.get(
  "/getCommentByTitle/:id",
  commentHandler.getCommentByTitleController
);
endpoint.get("/allComments", commentHandler.getCommentController);
//Question routes
endpoint.post("/question", questionController.addQuestionController);
endpoint.get("/getQuestions/:id", questionController.getAllQuestionsController);
endpoint.delete(
  "/deleteQuestions/:id",
  questionController.deleteAllQuestionsController
);
endpoint.get(
  "/getQuestionByUser/:username",
  questionController.getAllQuestionsByUsernameController
);
//Request Changes
endpoint.post("/requestChanges", requestController.RequestChangesController);
module.exports = endpoint;
