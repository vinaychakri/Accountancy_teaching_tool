import React, { useEffect, useCallback } from "react";
import { getSurveyAPI, deleteSurveyAPI } from "../router/apis";
import store from "../zustandStore/store";

const GetSurvey = () => {
  const { surveysData, setSurveysData } = store();

  useEffect(() => {
    getSurveyAPI()
      .then((res) => {
        setSurveysData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setSurveysData]);

  const deleteSurvey = useCallback(
    (id) => {
      deleteSurveyAPI(id)
        .then((response) => {
          setSurveysData(surveysData.filter((comment) => comment._id !== id));
        })
        .catch((error) => {
          console.error(error);
        });
    },
    [surveysData, setSurveysData]
  );

  return (
    <div className='container mt-3 mb-3'>
      <div className='row'>
        <h2 className='card-title text-center mb-3'>
          General Survey's on the Applications
        </h2>
        {surveysData.length === 0 ? (
          <p>No Surveys yet</p>
        ) : (
          surveysData.map((survey) => {
            const {
              _id,
              question1,
              question2,
              question3,
              question4,
              userEmail,
            } = survey;
            return (
              <div key={_id} className='col-md-6 col-12 col-lg-6'>
                <div className='card'>
                  <div className='card-body'>
                    <ul className='styled-list'>
                      <li className='styled-list-item'>
                        <h5>Favorite Topic?</h5>
                      </li>
                      <li className='styled-list-item'>
                        <p className='answer'>{question1}</p>
                      </li>
                    </ul>
                    <div className='row'>
                      <div className='col-md-6 mb-3'>
                        <ul className='styled-list'>
                          <li className='styled-list-item'>
                            <h5>Satisfaction Level</h5>
                          </li>
                          <li className='styled-list-item'>
                            <p className='answer'>{question2}</p>
                          </li>
                        </ul>
                      </div>
                      <div className='col-md-6 mb-3'>
                        <ul className='styled-list'>
                          <li className='styled-list-item'>
                            <h5>Rate 0-5</h5>
                          </li>
                          <li className='styled-list-item'>
                            <p className='answer'>{question3}</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <ul className='styled-list-answer'>
                      <li className='styled-list-item'>
                        <h5>Suggestions or Improvements?</h5>
                      </li>
                      <li className='styled-list-item'>
                        <p className='answer-suggestion'>{question4}</p>
                      </li>
                    </ul>
                    <div className='survey-footer'>
                      <p className='survey-source'>from {userEmail}</p>
                      <button
                        className='btn btn-danger m-0'
                        onClick={() => deleteSurvey(_id)}
                      >
                        Delete
                        <span className='loader-time'></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default GetSurvey;
