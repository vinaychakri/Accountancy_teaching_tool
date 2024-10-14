// Importing necessary libraries and components
import React, { useEffect, useCallback, useState } from "react";
import { deleteTopicAPI, getTopicsAPI, getUser } from "../router/apis";
import store from "../zustandStore/store";
import { UpdateTopic } from "./UpdateTopic";
import More from "./More";
import Survey from "./Survey";
import { QuestionForm } from "./QuestionPaper";
import { Loader } from "./pageHelpers";

// Main component
const GetTopics = () => {
  // Initializing state variables and functions
  const { topicsData, setTopicsData, setUiStatus, uiStatus } = store();
  const [searchList, setSearchList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const current = getUser("user");
  const username = current.email;

  // Fetching topics on component mount
  useEffect(() => {
    setIsLoading(true);

    getTopicsAPI()
      .then((res) => {
        setTopicsData(res.data);
        setSearchList(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setTopicsData, uiStatus]);

  // Function to delete a topic
  const deleteTopic = useCallback(
    (id) => {
      deleteTopicAPI(id)
        .then((response) => {
          setTopicsData(topicsData.filter((comment) => comment._id !== id));
        })
        .catch((error) => {
          console.error(error);
        });
    },
    [topicsData, setTopicsData]
  );

  // Function to filter topics based on search input
  const filter = (e) => {
    const value = e.target.value.toLowerCase();
    const results = searchList.filter((topic) =>
      `${topic.title} `.toLowerCase().includes(value)
    );
    setTopicsData(results);
  };

  // Rendering component
  return (
    <div className='container mt-4'>
      {window.location.pathname === "/student" && (
        <>
          <div className='row'>
            <div className='col-md-2'>
              <h2 className='text-center mb-4'>Search</h2>
            </div>
            <div className='col-md-8'>
              <input
                id='search'
                name='search'
                className='form-control'
                placeholder='Enter title of the topic name.....'
                onInput={filter}
              />
            </div>
            <div className='col-md-2'>
              <Survey topics={topicsData} />
            </div>
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            topicsData.length === 0 && (
              <h1 className='text-center'>
                No Topics with the specified name.
              </h1>
            )
          )}
          <div className='row'>
            {topicsData.map((topic) => {
              const { _id, img, title } = topic;
              return (
                <div key={_id} className='col-12 col-md-6 col-lg-4 mb-5'>
                  <div className='card animated fadeIn'>
                    <img
                      id='previewImage'
                      src={`data:image/png;base64,${img.data}`}
                      alt=''
                      className='card-img-top'
                      height={300}
                      width={200}
                    />
                    <div className='card-body'>
                      <div className='row'>
                        <div className='col-9 col-md-7 col-xl-9 text-center'>
                          <h6>
                            <b>{title}</b>
                          </h6>
                        </div>
                        <div className='col-3 col-md-5 col-xl-3'>
                          <More topic={topic} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {window.location.pathname === "/dashboard" && (
        <div className='row'>
          <h2 className='card-title text-center mb-3'>
            Topics You have created
          </h2>
          {isLoading ? (
            <Loader />
          ) : (
            topicsData.length === 0 && (
              <h1 className='text-center'>No topics are created</h1>
            )
          )}
          {topicsData
            .filter((topic) => topic.userInfo === username)
            .map((topic) => {
              const { _id, level, type, title } = topic;
              return (
                <div key={_id} className='col-12 col-md-6 col-lg-4 mb-5'>
                  <div className='card fadeIn'>
                    <div className='card-body'>
                      <ul className='styled-list'>
                        <li className='styled-list-item'>
                          <h6 className='card-title'> {title}</h6>
                        </li>
                      </ul>
                      <div className='details'>
                        <ul className='styled-list'>
                          <li className='styled-list-item'>
                            <p className='card-text'>
                              Difficulty Level: {level}
                            </p>
                          </li>
                          <li className='styled-list-item'>
                            <p className='card-text'>Type: {type}</p>
                          </li>
                        </ul>
                        <More topic={topic} />
                      </div>
                      <div>
                        <QuestionForm topicName={title} topicId={_id} />
                        <UpdateTopic
                          topic={topic}
                          ui={(e) => {
                            setUiStatus(e);
                          }}
                        />
                        <button
                          className='btn btn-danger mr-2 fadeIn'
                          onClick={() => deleteTopic(_id)}
                        >
                          Delete
                          <span className='loader-time'></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

// Exporting component
export default GetTopics;
