import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, getDocs, query, where, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import FeedbackAnalysis from '../components/FeedbackAnalysis';
import FeedbackList from '../components/FeedbackList';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function ProjectPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [analyses, setAnalyses] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const { user } = useAuth();
  const [currentAnalysisIndex, setCurrentAnalysisIndex] = useState(0);
  const [direction, setDirection] = useState('');

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        if (!user) {
          setError('User not authenticated');
          setLoading(false);
          return;
        }

        const projectRef = doc(db, 'projects', projectId);
        const projectSnap = await getDoc(projectRef);

        if (projectSnap.exists()) {
          const projectData = { id: projectSnap.id, ...projectSnap.data() };
          setProject(projectData);

          if (projectData.userId !== user.uid) {
            setError('You do not have permission to view this project');
            setLoading(false);
            return;
          }

          // Fetch analyses
          const analysesRef = collection(projectRef, 'analysis');
          const analysesSnapshot = await getDocs(analysesRef);
          const analysesData = analysesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setAnalyses(analysesData);

          // Fetch feedbacks
          const feedbacksRef = collection(projectRef, 'feedback');
          const feedbacksSnap = await getDocs(feedbacksRef);
          const feedbacksList = feedbacksSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setFeedbacks(feedbacksList);

        } else {
          setError('Project not found');
        }
      } catch (err) {
        console.error('Error fetching project data:', err);
        setError('Failed to load project data: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [projectId, user]);

  const handleDeleteAnalysis = async (analysisId) => {
    try {
      await deleteDoc(doc(db, 'projects', projectId, 'analysis', analysisId));
      setAnalyses(analyses.filter(analysis => analysis.id !== analysisId));
    } catch (error) {
      console.error('Error deleting analysis:', error);
      setError('Failed to delete analysis');
    }
  };

  const handleTriggerAnalysis = async () => {
    try {
      const response = await axios.post(`/api/trigger-analysis/${projectId}`);
      const newAnalysis = response.data;
      setAnalyses([...analyses, newAnalysis]);
    } catch (error) {
      console.error('Error triggering analysis:', error);
      setError('Failed to trigger analysis');
    }
  };

  const getFeedbackLink = () => {
    return `${window.location.origin}/feedback/${projectId}`;
  };

  const copyFeedbackLink = () => {
    navigator.clipboard.writeText(getFeedbackLink())
      .then(() => alert('Feedback link copied to clipboard!'))
      .catch(err => console.error('Failed to copy feedback link:', err));
  };

  const goToPreviousAnalysis = () => {
    setDirection('right');
    setCurrentAnalysisIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : analyses.length - 1
    );
  };

  const goToNextAnalysis = () => {
    setDirection('left');
    setCurrentAnalysisIndex((prevIndex) => 
      prevIndex < analyses.length - 1 ? prevIndex + 1 : 0
    );
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">Error: {error}</div>;
  if (!project) return <div className="text-center py-10">Project not found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{project.name}</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Feedback Link</h2>
        <div className="flex items-center">
          <input 
            type="text" 
            value={getFeedbackLink()} 
            readOnly 
            className="flex-grow p-2 border rounded-l"
          />
          <button 
            onClick={copyFeedbackLink}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
          >
            Copy Link
          </button>
        </div>
      </div>

      <button 
        onClick={handleTriggerAnalysis}
        className="mb-6 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Trigger New Analysis
      </button>

      <div className="analyses-section">
        <h2 className="text-2xl font-semibold mb-4">Analyses</h2>
        {analyses.length === 0 ? (
          <div className="text-center py-10 text-gray-600">No analyses available</div>
        ) : (
          <div>
            <div className="flex justify-between mb-4">
              <button onClick={goToPreviousAnalysis} className="text-2xl text-indigo-600 hover:text-indigo-800">
                <FaChevronLeft />
              </button>
              <button onClick={goToNextAnalysis} className="text-2xl text-indigo-600 hover:text-indigo-800">
                <FaChevronRight />
              </button>
            </div>
            <div className="relative overflow-hidden">
              <div 
                key={currentAnalysisIndex}
                className={`transition-transform duration-300 ease-in-out ${
                  direction === 'left' ? 'slide-in-left' : direction === 'right' ? 'slide-in-right' : ''
                }`}
              >
                <FeedbackAnalysis 
                  analysisData={analyses[currentAnalysisIndex]} 
                  projectId={projectId}
                  onDelete={() => handleDeleteAnalysis(analyses[currentAnalysisIndex].id)}
                  onViewFeedback={() => setSelectedAnalysis(analyses[currentAnalysisIndex])}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedAnalysis && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Feedback for Analysis</h2>
          <FeedbackList 
            feedbacks={feedbacks.filter(f => selectedAnalysis.feedbackIds.includes(f.id))}
            projectId={projectId}
          />
        </div>
      )}
    </div>
  );
}

export default ProjectPage;