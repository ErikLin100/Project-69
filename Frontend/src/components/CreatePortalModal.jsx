import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

function CreatePortalModal({ isOpen, onClose, onProjectCreated }) {
  const [projectName, setProjectName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'projects'), {
        name: projectName,
        createdAt: new Date()
      });
      onProjectCreated(docRef.id);
      onClose();
    } catch (error) {
      console.error("Error adding project: ", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold font-opensans mb-4 text-purple-700">Create New Portal</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Enter portal name"
            className="w-full px-3 py-2 mb-4 bg-white border border-purple-200 rounded-md text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-300"
            required
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 mr-2 text-purple-600 bg-white border border-purple-200 rounded-md hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-300 transition duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-purple-500 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300 transition duration-300"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePortalModal;