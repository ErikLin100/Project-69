import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FeedbackForm from '../components/FeedbackForm';

const ActionPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [projectName, setProjectName] = useState('');
  const [customQuestions, setCustomQuestions] = useState([]);

  const handleCreateProject = () => {
    setStep(1);
  };

  const handleProjectNameSubmit = () => {
    setStep(2);
  };

  const handleAddCustomQuestion = (question) => {
    setCustomQuestions([...customQuestions, question]);
  };

  const handleGenerateLink = () => {
    const projectId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    const link = `${window.location.origin}/feedback/${projectId}`;
    console.log('Link generated for project:', projectName, link);
    navigate('/results', { state: { projectName, link } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {step === 0 && (
        <>
          <h1 className="text-4xl text-[#313030] font-bold mb-8">Create a New Feedback Project</h1>
          <button
            onClick={handleCreateProject}
            className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition duration-300"
          >
            Create New Project
          </button>
        </>
      )}

      {step === 1 && (
        <>
          <h2 className="text-3xl text-[#313030] font-bold mb-6">Name Your Project</h2>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md mb-4 w-64"
            placeholder="Enter project name"
          />
          <button
            onClick={handleProjectNameSubmit}
            className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition duration-300"
          >
            Next
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="text-3xl text-[#313030] font-bold mb-6">Customize Your Feedback Portal</h2>
          <input
            type="text"
            placeholder="Add custom question"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddCustomQuestion(e.target.value);
                e.target.value = '';
              }
            }}
            className="px-4 py-2 border border-gray-300 rounded-md mb-4 w-64"
          />
          <FeedbackForm
            projectName={projectName}
            customQuestions={customQuestions}
            isPreview={true}
          />
          <button
            onClick={handleGenerateLink}
            className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition duration-300 mt-4"
          >
            Generate Feedback Link
          </button>
        </>
      )}
    </div>
  );
};

export default ActionPage;