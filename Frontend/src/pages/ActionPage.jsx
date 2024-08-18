import React, { useState } from 'react';
import ProjectList from '../components/ProjectList';
import CreatePortalModal from '../components/CreatePortalModal';
import { useNavigate } from 'react-router-dom';

function ActionPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleProjectCreated = (projectId) => {
    console.log("Navigating to project:", projectId);
    setIsModalOpen(false);
    navigate(`/project/${projectId}`);
  };

  return (
    <div className="min-h-screen py-8 px-8 sm:px-16 md:px-24 lg:px-32">
  <div className="container mx-auto">
    <h1 className="text-4xl font-semibold font-opensans mb-8 text-center text-purple-800">Your Feedback Dashboard</h1>
    <div className="mb-8">
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300 transition duration-300"
      >
        Create New Project
      </button>
    </div>
    <div className="bg-white rounded-lg shadow-md p-6 border border-purple-200">
      <ProjectList />
    </div>
  </div>
  <CreatePortalModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    onProjectCreated={handleProjectCreated}
  />
</div>
  );
}

export default ActionPage;