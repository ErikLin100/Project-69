import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, runTransaction, collection } from 'firebase/firestore';
import { db } from '../firebase';

function FeedbackPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

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
      await runTransaction(db, async (transaction) => {
        const counterRef = doc(db, 'counters', 'feedbackCounter');
        const counterDoc = await transaction.get(counterRef);
        
        let newId = 1;
        if (counterDoc.exists()) {
          newId = counterDoc.data().currentId + 1;
        }
        
        transaction.set(counterRef, { currentId: newId }, { merge: true });
        
        const newFeedbackRef = doc(collection(db, 'feedback'));
        transaction.set(newFeedbackRef, {
          feedbackId: newId,
          projectId,
          message: feedback,
          age: parseInt(age),
          gender,
          createdAt: new Date()
        });
      });

      setFeedback('');
      setAge('');
      setGender('');
      alert('Feedback submitted successfully!');
    } catch (error) {
      console.error("Error submitting feedback: ", error);
      alert('Error submitting feedback. Please try again.');
    }
  };

  if (!project) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">{project.name}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Your Feedback</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}

export default FeedbackPage;