import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';

function ProjectCreation() {
  const [projectName, setProjectName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    console.log('Logged-in user:', user); // Debug line

    if (!user) {
      console.error("No user is logged in.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'projects'), {
        name: projectName,
        createdAt: serverTimestamp(),
        userId: user.uid // Ensure this field is being set
      });

      console.log("Project created with ID: ", docRef.id);
      setProjectName(''); // Reset the form after successful creation
    } catch (error) {
      console.error("Error adding project: ", error.message);
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


