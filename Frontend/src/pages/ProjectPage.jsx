import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import FeedbackAnalysis from '../components/FeedbackAnalysis';
import FeedbackList from '../components/FeedbackList';
import axios from 'axios';

function ProjectPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [analyses, setAnalyses] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchProjectAndAnalyses = async () => {
      const docRef = doc(db, 'projects', projectId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProject({ id: docSnap.id, ...docSnap.data() });
       
        try {
          const response = await axios.get('/api/analyses');
          console.log('Analyses response:', response.data);
          setAnalyses(response.data);
        } catch (error) {
          console.error('Error fetching analyses:', error);
        }

        // Fetch feedbacks
        const feedbacksRef = collection(db, 'projects', projectId, 'feedbacks');
        const feedbacksSnap = await getDocs(feedbacksRef);
        const feedbacksList = feedbacksSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('Fetched feedbacks:', feedbacksList);
        setFeedbacks(feedbacksList);
      }
    };
    fetchProjectAndAnalyses();
  }, [projectId]);

  const copyLink = () => {
    const link = `${window.location.origin}/feedback/${projectId}`;
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard!');
  };

  if (!project) return <div>Loading...</div>;

  console.log('Feedbacks in render:', feedbacks);

  return (
    <div className="min-h-screen py-4 px-2 sm:py-6 sm:px-4 md:py-8 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-semibold font-opensans mb-6 sm:mb-8 text-center text-purple-800">{project.name}</h1>
        <div className="rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold font-opensans mb-4 text-purple-700">Feedback Link</h2>
          <div className="flex items-center">
            <input
              type="text"
              value={`${window.location.origin}/feedback/${projectId}`}
              readOnly
              className="flex-grow px-2 sm:px-3 py-2 bg-white border border-purple-200 rounded-l-md text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm sm:text-base"
            />
            <button
              onClick={copyLink}
              className="px-3 sm:px-4 py-2 text-white bg-purple-600 rounded-r-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300 transition duration-300 text-sm sm:text-base"
            >
              Copy
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 mb-6 md:mb-0 md:mr-6">
            {feedbacks.length > 0 ? (
              <FeedbackList feedbacks={feedbacks} projectId={projectId} />
            ) : (
              <p>No feedbacks available</p>
            )}
          </div>
          <div className="md:w-3/4">
            {Array.isArray(analyses) && analyses.length > 0 ? (
              analyses.map((analysis, index) => (
                <div key={analysis.id} className="px-0 sm:px-2 md:px-4 mb-8">
                  <h3 className="text-2xl font-semibold mb-4">Analysis #{index + 1}</h3>
                  <FeedbackAnalysis analysisData={analysis.results} projectId={projectId} />
                </div>
              ))
            ) : (
              <div className="text-center text-gray-600">No analysis data available yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;