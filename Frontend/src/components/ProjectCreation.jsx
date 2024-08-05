import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

function ProjectCreation() {
  const [projectName, setProjectName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'projects'), {
        name: projectName,
        createdAt: new Date(),
      });
      console.log("Project created with ID: ", docRef.id);
      setProjectName('');
    } catch (error) {
      console.error("Error adding project: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        placeholder="Enter project name"
        required
        className="w-full px-4 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 text-purple-800 placeholder-purple-300"
      />
      <button 
        type="submit"
        className="w-full px-4 py-2 text-white bg-purple-500 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300 transition duration-300"
      >
        Create Project
      </button>
    </form>
  );
}

export default ProjectCreation;



