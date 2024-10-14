import axios from "axios";

const BASE_URL = "http://localhost:9887";

const apiRequest = async (method, endpoint, data) => {
  const url = `${BASE_URL}/${endpoint}`;
  const response = await axios[method](url, data);
  return response;
};

// User related functions
export const addUser = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));
export const getUser = (key) => JSON.parse(localStorage.getItem(key));
export const removeUser = (key) => localStorage.removeItem(key);
export const allowUser = (user) => addUser("user", user);
export const verifyUser = () => getUser("user");
export const declineUser = (next) => {
  removeUser("user");
  next();
};

// Auth functions
export const register = async (data) => apiRequest("post", "register", data);
export const login = async (data) => apiRequest("post", "login", data);
export const forgotPasswordAPI = async (data) =>
  apiRequest("post", "forgotPassword", data);
export const resetPasswordAPI = async (data) =>
  apiRequest("post", "resetPassword", data);

// Topic functions
export const addAccountancyTopicAPI = async (data) =>
  apiRequest("post", "addTopic", data);
export const getTopicsAPI = async () => apiRequest("get", "getTopics");
export const deleteTopicAPI = async (id) =>
  apiRequest("delete", `deleteTopic/${id}`);
export const updateTopicAPI = async (data) =>
  apiRequest("put", "updateTopic", data);

// Survey functions
export const addSurvey = async (data) => apiRequest("post", "addSurvey", data);
export const getSurveyAPI = async () => apiRequest("get", "getSurvey");
export const deleteSurveyAPI = async (id) =>
  apiRequest("delete", `deleteSurvey/${id}`);

// Report functions
export const ReportTopicAPI = async (data) =>
  apiRequest("post", "report", data);
export const getReportAPI = async () => apiRequest("get", "getReports");
export const deleteReportAPI = async (id) =>
  apiRequest("delete", `deleteReport/${id}`);

// Comment functions
export const CommentTopicAPI = async (data) =>
  apiRequest("post", "comment", data);
export const deleteCommentAPI = async (id) =>
  apiRequest("delete", `deleteComment/${id}`);
export const updateCommentAPI = async (data) =>
  apiRequest("put", "updateComment", data);
export const getCommentBYtitleAPI = async (id) =>
  apiRequest("get", `getCommentByTitle/${id}`);
export const getAllComments = async () => apiRequest("get", "allComments");

//Question function
export const addQuestionAPI = async (data) =>
  apiRequest("post", "question", data);
export const getQuestionAPI = async (id) =>
  apiRequest("get", `getQuestions/${id}`);
export const deleteQuestionAPI = async (id) =>
  apiRequest("delete", `deleteQuestions/${id}`);
export const getQuestionsByUserNameAPI = async (username) =>
  apiRequest("get", `getQuestionByUser/${username}`);

//Request Changes
export const RequestChangesAPI = async (data) =>
  apiRequest("post", "requestChanges", data);
