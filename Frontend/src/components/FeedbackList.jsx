import React from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const FeedbackList = ({ feedbacks, projectId }) => {
  const handleDelete = async (feedbackId) => {
    try {
      await deleteDoc(doc(db, 'projects', projectId, 'feedback', feedbackId));
      // Implement a way to update the feedbacks state in the parent component
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">All Feedbacks</h2>
      <div className="space-y-4 max-h-[600px] overflow-y-auto">
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className="border-b pb-2">
            <p className="text-sm text-gray-600">
              Date: {feedback.createdAt && new Date(feedback.createdAt).toLocaleString()}
            </p>
            <p className="mt-1">{feedback.message}</p>
            <button
              onClick={() => handleDelete(feedback.id)}
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackList;