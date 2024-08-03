import React, { useState } from 'react';

const ProjectCreationForm = ({ onSubmit }) => {
  const [projectName, setProjectName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(projectName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={projectName} 
        onChange={(e) => setProjectName(e.target.value)} 
        placeholder="Enter project name" 
      />
      <button type="submit">Create Project</button>
    </form>
  );
};

export default ProjectCreationForm;