import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { addSurvey, getUser } from "../router/apis";
import toast from "react-hot-toast";

const Survey = ({ topics }) => {
  const questions = [
    {
      id: "question1",
      text: "Which is your favorite topic?",
      type: "select",
      options: topics.map((topic) => (
        <option key={topic._id} value={topic.title}>
          {topic.title}
        </option>
      )),
    },
    {
      id: "question2",
      text: "How satisfied are you with our service?",
      type: "select",
      options: [
        "Very Satisfied",
        "Satisfied",
        "Neutral",
        "Dissatisfied",
        "Very Dissatisfied",
      ],
    },
    {
      id: "question3",
      text: "Rate our product:",
      type: "starRating",
      maxStars: 5,
    },
    {
      id: "question4",
      text: "Any suggestions or improvements ?",
      type: "text",
      options: ["Product A", "Product B"],
    },
  ];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [isAnswered, setIsAnswered] = useState(false);
  const [popupSurvey, setPopupSurvey] = useState(false); // camelCase for consistency

  const handleResponseChange = (answer) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questions[currentQuestionIndex].id]: answer === "" ? null : answer,
    }));
    setIsAnswered(answer !== "" && answer !== null);
  };
  const userEmail = getUser("user").email;
  const submitAnswer = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setIsAnswered(false);
    } else {
      const { question1, question2, question3, question4 } = responses;
      const data = { userEmail, question1, question2, question3, question4 };
      addSurvey(data)
        .then((res) => {
          resetSurvey();
          setPopupSurvey(false);
          toast.success(res.data.message);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setPopupSurvey(false);
        });
    }
  };

  const goBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      setIsAnswered(false);
    }
  };

  const resetSurvey = () => {
    setCurrentQuestionIndex(0);
    setResponses({});
    setIsAnswered(false);
  };

  const renderStarRating = () => {
    const rating =
      parseInt(responses[questions[currentQuestionIndex].id], 10) || 0;

    const stars = Array.from(
      { length: questions[currentQuestionIndex].maxStars },
      (_, index) => (
        <span
          key={index}
          onClick={() => handleResponseChange((index + 1).toString())}
          className={`star ${index < rating ? "filled" : ""}`}
        >
          &#9733;
        </span>
      )
    );

    return <div className='star-rating'>{stars}</div>;
  };

  return (
    <div>
      <button
        className='btn btn-outline-dark m-0'
        onClick={() => setPopupSurvey(true)}
      >
        Survey
      </button>
      <Modal
        isOpen={popupSurvey}
        toggle={() => setPopupSurvey(!popupSurvey)}
        size='md'
        centered
      >
        <ModalHeader toggle={() => setPopupSurvey(!popupSurvey)}>
          Survey Please <span className='loader-time'></span>
        </ModalHeader>

        <ModalBody className='survey-model'>
          <h4>Survey Questions</h4>
          <div>
            {questions[currentQuestionIndex].id === "question1" && (
              <div>
                <p>{questions[currentQuestionIndex].text}</p>

                <select
                  className='form-control'
                  value={responses[questions[currentQuestionIndex].id] || ""}
                  onChange={(e) => handleResponseChange(e.target.value)}
                >
                  <option value=''>Select an option</option>
                  {questions[currentQuestionIndex].options}
                </select>
              </div>
            )}
            {questions[currentQuestionIndex].id === "question2" && (
              <div>
                <p>{questions[currentQuestionIndex].text}</p>
                <select
                  className='form-control'
                  value={responses[questions[currentQuestionIndex].id] || ""}
                  onChange={(e) => handleResponseChange(e.target.value)}
                >
                  <option className='form-control' value=''>
                    Select an option
                  </option>
                  {questions[currentQuestionIndex].options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {questions[currentQuestionIndex].type === "starRating" && (
              <div>
                <p>{questions[currentQuestionIndex].text}</p>
                {renderStarRating()}
              </div>
            )}

            {questions[currentQuestionIndex].type === "text" && (
              <div>
                <p>{questions[currentQuestionIndex].text}</p>

                {questions[currentQuestionIndex].type === "text" && (
                  <textarea
                    className='form-control border-1'
                    value={responses[questions[currentQuestionIndex].id] || ""}
                    onChange={(e) => handleResponseChange(e.target.value)}
                  />
                )}
              </div>
            )}
          </div>

          <div className='row'>
            <div className='col-6'>
              {currentQuestionIndex > 0 && (
                <button className='btn btn-outline-danger ' onClick={goBack}>
                  Back
                </button>
              )}
            </div>
            <div className='col-6'>
              <button
                className='btn btn-outline-light'
                onClick={submitAnswer}
                disabled={!isAnswered}
              >
                {currentQuestionIndex < questions.length - 1
                  ? "Next"
                  : "Submit"}
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Survey;
