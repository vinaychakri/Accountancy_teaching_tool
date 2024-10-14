import React from "react";
import GetTopics from "../Helpers/GetTopics";
import GetSurvey from "../Helpers/GetSurvey";
import GetReports from "../Helpers/GetReports";
import Analytics from "../Helpers/Analytics";

const Dashboard = () => {
  return (
    <>
      <Analytics />
      <GetTopics />;
      <GetReports />
      <GetSurvey />
    </>
  );
};

export default Dashboard;
