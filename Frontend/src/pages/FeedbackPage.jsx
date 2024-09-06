import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function FeedbackPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [rating, setRating] = useState(5.00);

  useEffect(() => {
    const fetchProject = async () => {
      const docRef = doc(db, 'projects', projectId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProject(docSnap.data());
      }
    };
    fetchProject();
  }, [projectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/submit-feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId,
          feedbackData: {
            message: feedback,
            age: parseInt(age, 10),
            gender,
            rating: parseFloat(rating),
            createdAt: new Date().toISOString(),
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit feedback');
      }

      setFeedback('');
      setAge('');
      setGender('');
      setRating(5.00);
      alert('Feedback submitted successfully!');
    } catch (error) {
      console.error("Error submitting feedback: ", error);
      alert('Error submitting feedback. Please try again.');
    }
  };

  const handleRatingChange = (e) => {
    const value = parseFloat(e.target.value);
    setRating(Math.round(value * 100) / 100); // Round to 2 decimal places
  };

  if (!project) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{project.name}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="feedback" className="block mb-1">Feedback:</label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="age" className="block mb-1">Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="gender" className="block mb-1">Gender:</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="rating" className="block mb-1">Rating:</label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              id="rating"
              min="1"
              max="5"
              step="0.01"
              value={rating}
              onChange={handleRatingChange}
              className="w-full"
            />
            <input
              type="number"
              value={rating}
              onChange={handleRatingChange}
              min="1"
              max="5"
              step="0.01"
              className="w-20 p-2 border rounded"
            />
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Submit Feedback
        </button>
      </form>
    </div>
  );
}

export default FeedbackPage;