import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function ProjectPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      const docRef = doc(db, 'projects', projectId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProject({ id: docSnap.id, ...docSnap.data() });
      }
    };
    fetchProject();
  }, [projectId]);

  const copyLink = () => {
    const link = `${window.location.origin}/feedback/${projectId}`;
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard!');
  };

  if (!project) return <div>Loading...</div>;

  return (
    <div className="from-purple-50 to-purple-100 min-h-screen py-8 px-8 sm:px-16 md:px-24 lg:px-32">
      <div className="container mx-auto">
        <h1 className="text-4xl font-semibold font-opensans mb-8 text-center text-purple-800">{project.name}</h1>
        <div className="bg-white rounded-lg shadow-md p-6 border border-purple-200">
          <h2 className="text-2xl font-semibold font-opensans mb-4 text-purple-700">Feedback Link</h2>
          <div className="flex items-center">
            <input 
              type="text" 
              value={`${window.location.origin}/feedback/${projectId}`}
              readOnly
              className="flex-grow px-3 py-2 bg-white border border-purple-200 rounded-l-md text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <button 
              onClick={copyLink}
              className="px-4 py-2 text-white bg-purple-500 rounded-r-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300 transition duration-300"
            >
              Copy
            </button>
          </div>
        </div>
        {/* Analytics section will be added here later */}
      </div>
    </div>
  );
}

export default ProjectPage;