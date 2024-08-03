import React from 'react';
import FeedbackForm from './FeedbackForm';
import CustomQuestionAdder from './CustomQuestionAdder';
import LinkGenerator from './LinkGenerator';

const Dashboard = ({ projectName }) => {
  return (
    <div>
      <h2>{projectName} Dashboard</h2>
      <FeedbackForm/>
      <CustomQuestionAdder />
      <LinkGenerator />
    </div>
  );
};

export default Dashboard;