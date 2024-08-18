import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import FeedbackAnalysis from '../components/FeedbackAnalysis';

function ProjectPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);

  useEffect(() => {
    const fetchProjectAndAnalysis = async () => {
      const docRef = doc(db, 'projects', projectId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProject({ id: docSnap.id, ...docSnap.data() });
        setAnalysisData({
          totalFeedback: 100,
          sentimentBreakdown: { positive: 70, negative: 20, neutral: 10 },
          keyThemes: [{ name: 'Product Quality', feedbackIds: [1, 2, 3] }],
          negativeThemes: [{ name: 'Delivery Time', feedbackIds: [4, 5] }],
        });
      }
    };
    fetchProjectAndAnalysis();
  }, [projectId]);

  const copyLink = () => {
    const link = `${window.location.origin}/feedback/${projectId}`;
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard!');
  };

  if (!project) return <div>Loading...</div>;

  return (
    <div className="min-h-screen py-4 px-2 sm:py-6 sm:px-4 md:py-8 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-semibold font-opensans mb-6 sm:mb-8 text-center text-purple-800">{project.name}</h1>
        <div className="rounded-lg  p-4 sm:p-6  mb-6 sm:mb-8">
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
        {analysisData && (
          <div className="px-0 sm:px-2 md:px-4">
            <FeedbackAnalysis analysisData={analysisData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectPage;