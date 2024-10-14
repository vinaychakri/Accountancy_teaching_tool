import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { getQuestionAPI } from "../router/apis";

export const TopicExam = ({ title, id }) => {
  const [showResults, setShowResults] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [allQuestionsData, setAllQuestionsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getQuestionAPI(id);
        const questionData = res.data?.allQuestions || [];
        setAllQuestionsData(questionData);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchData();
  }, [id]);

  const numberOfQuestions = allQuestionsData[0]?.questions?.length;
  const questionIteration = allQuestionsData[0]?.questions[questionIndex];

  const optionClicked = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    setQuestionIndex(
      questionIndex + 1 < numberOfQuestions ? questionIndex + 1 : questionIndex
    );
    setShowResults(questionIndex + 1 === numberOfQuestions);
  };

  const restartGame = () => {
    setScore(0);
    setQuestionIndex(0);
    setShowResults(false);
  };

  return (
    <div className='exam'>
      <button
        className='btn btn-outline-success m-0'
        onClick={() => setModalOpen(true)}
      >
        Take Exam
      </button>
      <Modal
        isOpen={isModalOpen}
        toggle={() => setModalOpen(!isModalOpen)}
        centered
        fade={true}
      >
        <ModalHeader toggle={() => setModalOpen(!isModalOpen)}>
          {title} <span className='loader-time'></span>
        </ModalHeader>
        <ModalBody className='survey-model take-exam'>
          {allQuestionsData.length === 0 || numberOfQuestions === 0 ? (
            <div>No Question paper released for this topic</div>
          ) : (
            <>
              <h3>
                <b>Test On: {title} </b>
              </h3>
              <h5>
                <b>
                  Current score: <b> {score} </b>
                </b>
              </h5>
              {showResults ? (
                <div className='final-results'>
                  <h5>
                    <i>
                      Total Results: {score} out of {numberOfQuestions} correct
                      - {((score / numberOfQuestions) * 100).toFixed(2)}%
                    </i>
                  </h5>
                  <button
                    className='btn btn-outline-danger'
                    onClick={restartGame}
                  >
                    Retake Test
                  </button>
                </div>
              ) : (
                <div className='question-card'>
                  <h3 className='question-text'>
                    Question: {questionIndex + 1} out of {numberOfQuestions}
                  </h3>
                  <div className='question-container'>
                    <h3 className='question-text'>
                      {questionIteration.question}
                    </h3>
                  </div>
                  <ul className='options-list'>
                    {questionIteration.options.map((option, index) => (
                      <li
                        key={index}
                        onClick={() =>
                          optionClicked(
                            option === questionIteration.correctAnswer
                          )
                        }
                      >
                        {`${index + 1}. ${option}`}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};
