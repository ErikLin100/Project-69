import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function ProjectDetails({ projectId }) {
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (projectId) {
        const docRef = doc(db, 'projects', projectId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProject({ id: docSnap.id, ...docSnap.data() });
        }
      }
    };

    fetchProject();
  }, [projectId]);

  if (!project) {
    return <div className="text-purple-600">Select a project to view details</div>;
  }

  return (
    <div className="project-details">
      <h3 className="text-2xl font-semibold font-opensans mb-4 text-purple-700">{project.name}</h3>
      <div className="bg-purple-50 p-4 rounded-md shadow-sm border border-purple-100">
        <p className="text-purple-800 mb-2">Created: {project.createdAt.toDate().toLocaleString()}</p>
        <div className="mt-4">
          <h4 className="text-lg font-semibold text-purple-700 mb-2">Feedback Link:</h4>
          <input 
            type="text" 
            value={`https://yourapp.com/feedback/${project.id}`} 
            readOnly 
            className="w-full px-3 py-2 bg-white border border-purple-200 rounded-md text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;