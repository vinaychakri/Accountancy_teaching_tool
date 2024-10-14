import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const textStore = create(
  devtools((set) => ({
    user: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      userType: "",
    },
    userLogin: {
      email: "",
      password: "",
    },
    forgotPasswordEmail: "",
    resetPassword: {
      newPassword: "",
      confirmPassword: "",
    },
    accountancyTopicFrom: {
      title: "",
      level: "",
      // purpose: "",
      type: "",
      details: "",
      reference: "",
      description: "",
      imageInfo: "",
    },
    reportTopicFrom: {
      topicName: "",
      reason: "",
      reportedBy: "",
    },
    commentData: { rating: "", review: "" },
    RequestChangesData: { whatChanges: "", WhyChanges: "", topicName: "" },
    topicsData: [],
    imageController: null,
    uiStatus: [],
    surveysData: [],
    reportData: [],
    getComments: [],
    getQuestionData: [],
    analyticsData: [],
    setUser: (newUser) => set({ user: newUser }),
    setLogin: (newLogin) => set({ userLogin: newLogin }),
    setForgotPassword: (currentEmail) =>
      set({ forgotPasswordEmail: currentEmail }),
    setResetPassword: (newPasswords) => set({ resetPassword: newPasswords }),
    setAccountancyTopicFrom: (newForm) =>
      set({ accountancyTopicFrom: newForm }),
    setImageController: (newImage) => set({ imageController: newImage }),
    setTopicsData: (topics) => set({ topicsData: topics }),
    setSurveysData: (Surveys) => set({ surveysData: Surveys }),
    setUiStatus: (newUi) => set({ uiStatus: newUi }),
    setReportData: (Reports) => set({ reportData: Reports }),
    setReportTopicFromData: (report) => set({ reportTopicFrom: report }),
    setCommentData: (comment) => set({ commentData: comment }),
    getCommentData: (allComments) => set({ getComments: allComments }),
    setQuestionsData: (questions) => set({ getQuestionData: questions }),
    setAnalyticsData: (analytics) => set({ analyticsData: analytics }),
    setRequestChangesData: (requestChange) =>
      set({ RequestChangesData: requestChange }),
  }))
);

export default textStore;
