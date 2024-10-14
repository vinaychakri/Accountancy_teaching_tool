import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { addQuestionAPI, getUser } from "../router/apis";
import { FormField } from "./pageHelpers";
import toast from "react-hot-toast";

export const QuestionForm = ({ topicName, topicId }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [numberOfQuestions, setNumberOfQuestions] = useState("");
  const [questions, setQuestions] = useState([]);
  const current = getUser("user");
  const username = current.email;

  const handleInputChange = (event) => {
    const value = Math.min(15, Math.max(0, event.target.value));
    setNumberOfQuestions(value);

    const newQuestions = Array.from({ length: value }, (_, index) => ({
      id: index + 1,
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    }));

    setQuestions(newQuestions);
  };

  const handleQuestionChange = (index, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (index, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].correctAnswer = event.target.value;
    setQuestions(updatedQuestions);
  };

  const submitUserComment = (event) => {
    event.preventDefault();

    const isValid = questions.every(
      (question) =>
        question.question.trim() !== "" &&
        question.options.every((option) => option.trim() !== "") &&
        question.correctAnswer.trim() !== ""
    );

    if (!isValid) {
      toast.error(
        "Please fill in all questions, options, and correct answers."
      );
      return;
    }
    const resetForm = () => {
      setNumberOfQuestions("");
      setQuestions([]);
    };

    const requestData = { questions, topicName, topicId, username };
    addQuestionAPI(requestData)
      .then((res) => {
        toast.success(res.data.message);
        resetForm();
        setPopupOpen(false);
      })
      .catch((error) => {
        console.error(error.response); // Log the error response object
        toast.error(error.response.data.errorMessage);
      });
  };

  return (
    <>
      <button
        className='btn btn-success mr-2 fadeIn'
        onClick={() => setPopupOpen(true)}
      >
        Add Question Paper
      </button>
      <Modal
        isOpen={isPopupOpen}
        toggle={() => setPopupOpen(!isPopupOpen)}
        size='lg'
      >
        <ModalHeader toggle={() => setPopupOpen(!isPopupOpen)}>
          Add Question Paper <span className='loader-time'></span>
        </ModalHeader>

        <ModalBody className='all-form container-fluid'>
          <form onSubmit={submitUserComment}>
            <FormField
              label='Number of Questions (max: 15)'
              type='number'
              name='numberOfQuestions'
              value={numberOfQuestions}
              onChange={handleInputChange}
            />

            {questions.map((question, index) => (
              <div key={question.id}>
                <FormField
                  label={
                    <span style={{ color: "red" }}>
                      {`Question ${index + 1}`}
                    </span>
                  }
                  type='text'
                  name='numberOfQuestions'
                  value={question.question}
                  onChange={(event) => handleQuestionChange(index, event)}
                />
                <label>Options:</label>
                {question.options.map((option, optionIndex) => (
                  <div className='row' key={optionIndex}>
                    <div className='col-1'>
                      <h5 className='text-center'>{optionIndex + 1}.</h5>
                    </div>
                    <div className='col-11'>
                      <input
                        key={optionIndex}
                        type='text'
                        value={option}
                        className='form-control'
                        onChange={(event) =>
                          handleOptionChange(index, optionIndex, event)
                        }
                      />
                    </div>
                  </div>
                ))}
                <label>
                  <span style={{ color: "green" }}>{`Correct Answer`}</span>
                </label>
                <select
                  value={question.correctAnswer}
                  className='form-control'
                  onChange={(event) => handleCorrectAnswerChange(index, event)}
                >
                  <option value='' disabled>
                    Please select correct answer
                  </option>
                  {question.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            {questions.some((question) => question.question.trim() !== "") && (
              <button className='btn btn-outline-success mt-3' type='submit'>
                Add Question
              </button>
            )}
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};
