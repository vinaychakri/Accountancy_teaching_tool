import React, { useEffect } from "react";
import store from "../zustandStore/store";
import { getUser, ReportTopicAPI, getTopicsAPI } from "../router/apis";
import { FormField } from "../Helpers/pageHelpers";
import toast from "react-hot-toast";

export const Report = () => {
  const { topicsData, setTopicsData, reportTopicFrom, setReportTopicFromData } =
    store();
  const { topicName, reason, suggestions } = reportTopicFrom;
  const reportedBy = getUser("user").email;
  useEffect(() => {
    getTopicsAPI()
      .then((res) => {
        setTopicsData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setTopicsData]);

  const handleInputChange = ({ target: { name, value } }) => {
    setReportTopicFromData({ ...reportTopicFrom, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!topicName || !reason || !suggestions) {
      toast.error("Please enter all required fields");
      return;
    }

    const filteredTopic = topicsData.find((topic) => topic.title === topicName);

    if (filteredTopic) {
      console.log("Selected Topic's UserInfo:");
    } else {
      console.error("Selected topic not found in topicsData");
    }

    const createdBy = filteredTopic.userInfo;
    const data = { topicName, reason, reportedBy, suggestions, createdBy };

    ReportTopicAPI(data)
      .then((res) => {
        toast.success(res.data.message);
        if (res.data.message === "Topic Reported") {
          setReportTopicFromData({
            topicName: "",
            reason: "",
            reportedBy: "",
            suggestions: "",
          });
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <>
      <h2 className='card-title text-center mb-3'>Report Any topic</h2>
      <div className='container login-form-container report-container'>
        <form onSubmit={handleSubmit} className='all-form login-form'>
          <div className='row'>
            <div className='col-12'>
              <label>Select a Topic:</label>
              <select
                className='form-control'
                name='topicName'
                value={topicName}
                z
                onChange={handleInputChange}
              >
                <option value=''>Please select a topic</option>
                {topicsData.map((topic) => (
                  <option key={topic._id} value={topic.title}>
                    {topic.title}
                  </option>
                ))}
              </select>
            </div>
            <div className='col-12'>
              <FormField
                label='Reason:'
                type='textarea'
                name='reason'
                value={reason}
                onChange={handleInputChange}
                placeholder='Enter the reason'
              />
            </div>
            <div className='col-12'>
              <FormField
                label='Any Suggestions to improve it..?:'
                type='textarea'
                name='suggestions'
                value={suggestions}
                onChange={handleInputChange}
                placeholder='Enter your suggestions'
              />
            </div>

            <button type='submit' className='btn btn-secondary'>
              Report
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
