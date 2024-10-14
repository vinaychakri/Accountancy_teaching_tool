import React, { useEffect, useCallback } from "react";
import store from "../zustandStore/store";
import { getReportAPI, deleteReportAPI, getUser } from "../router/apis";

const GetReports = () => {
  const { reportData, setReportData } = store();
  const current = getUser("user");
  const username = current.email;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getReportAPI();
        setReportData(res.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchData();
  }, [setReportData]);

  const deleteReport = useCallback(
    async (id) => {
      try {
        await deleteReportAPI(id);
        setReportData(reportData.filter((report) => report._id !== id));
      } catch (error) {
        console.error("Error deleting report:", error);
      }
    },
    [reportData, setReportData]
  );

  return (
    <div className='container mt-2'>
      <div className='row'>
        <h2 className='card-title text-center mb-3'>Reports On Your Topics</h2>
        {reportData.filter((topic) => topic.createdBy === username).length ===
        0 ? (
          <p>No reports on your topics</p>
        ) : (
          reportData
            .filter((topic) => topic.createdBy === username)
            .map((report) => {
              const { _id, topicName, reason, reportedBy, suggestions } =
                report;
              return (
                <div key={_id} className='col-md-6 col-12 col-lg-6'>
                  <div className='card'>
                    <div className='card-body'>
                      <ul className='styled-list'>
                        <li className='styled-list-item'>
                          <h5>Reported Topic Name</h5>
                        </li>
                        <li className='styled-list-item'>
                          <p className='answer'>{topicName}</p>
                        </li>
                      </ul>
                      <ul className='styled-list-answer'>
                        <li className='styled-list-item'>
                          <h5>Reason for report</h5>
                        </li>
                        <li className='styled-list-item'>
                          <p className='answer-suggestion'>{reason}</p>
                        </li>
                      </ul>
                      <ul className='styled-list-answer'>
                        <li className='styled-list-item'>
                          <h5>Any Suggestion To Improve the Issue</h5>
                        </li>
                        <li className='styled-list-item'>
                          <p className='answer-suggestion'>{suggestions}</p>
                        </li>
                      </ul>

                      <div className='survey-footer'>
                        <p className='survey-source'>By {reportedBy}</p>
                        <button
                          className='btn btn-danger m-0'
                          onClick={() => deleteReport(_id)}
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

export default GetReports;
