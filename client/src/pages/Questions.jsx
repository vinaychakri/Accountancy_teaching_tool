import React, { useEffect, useState, useCallback } from "react";
import {
  getQuestionsByUserNameAPI,
  getUser,
  deleteQuestionAPI,
} from "../router/apis";
import store from "../zustandStore/store";

const Questions = () => {
  const { getQuestionData, setQuestionsData } = store();
  const [selectedGroup, setSelectedGroup] = useState(null);
  const current = getUser("user");
  const username = current.email;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getQuestionsByUserNameAPI(username);
        const questionData = res.data?.questionsByUser || [];
        setQuestionsData(questionData);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchData();
  }, [setQuestionsData, username]);

  const toggleVisibility = (groupId) => {
    setSelectedGroup((prevGroup) => (prevGroup === groupId ? null : groupId));
  };

  const fetchDataDelete = useCallback(async () => {
    try {
      const res = await getQuestionsByUserNameAPI(username);
      setQuestionsData(res.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }, [username, setQuestionsData]);

  useEffect(() => {
    fetchDataDelete();
  }, [fetchDataDelete]);

  const deleteQuestion = async (questionGroupId) => {
    try {
      await deleteQuestionAPI(questionGroupId);
      fetchDataDelete();
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };
  return (
    <div className='questions-container '>
      <h2 className='text-center'>All Questions</h2>

      {getQuestionData?.questionsByUser?.map((questionGroup) => (
        <div
          key={questionGroup._id}
          className={`question-container ${
            selectedGroup === questionGroup._id ? "active" : ""
          }`}
          onClick={() => toggleVisibility(questionGroup._id)}
        >
          <div className='question-header'>
            <div className='question-button '>
              <strong>Topic Name: {questionGroup.topicName}</strong>
            </div>
            <strong>
              Question Created at : {questionGroup.createdAt.split("T")[0]}
            </strong>

            <button
              className='btn btn-danger m-0'
              onClick={() => deleteQuestion(questionGroup._id)}
            >
              Delete
            </button>
          </div>
          {selectedGroup === questionGroup._id && (
            <ul className='options-list'>
              {questionGroup.questions.map((question) => (
                <li key={question.id} className='option-item fade-in'>
                  <p>
                    <strong>Question Number:</strong> {question.id}
                  </p>
                  <p>
                    <strong>Question:</strong> {question.question}
                  </p>
                  <div>
                    <strong>Options:</strong>
                    <ul className='option-list'>
                      {question.options.map((option, index) => (
                        <li key={index}>{option}</li>
                      ))}
                    </ul>
                  </div>
                  <p className='answer-text'>
                    <strong>Answer:</strong> {question.correctAnswer}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default Questions;
