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
    <div className="project-list">
      <h2 className="text-xl font-bold mb-4 text-purple-700">Your Projects</h2>
      {projects.length === 0 ? (
        <div className="bg-purple-50 p-4 rounded-md shadow-sm border border-purple-100">
          <p className="text-purple-800 text-center">You don't have any active projects created.</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {projects.map((project) => (
            <li
              key={project.id}
              className="bg-purple-50 p-4 rounded-md shadow-sm border border-purple-100 hover:bg-purple-100 transition duration-300 cursor-pointer flex justify-between items-center"
              onClick={() => handleProjectClick(project.id)}
            >
              <span className="text-purple-800">{project.name}</span>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300"
                onClick={(e) => handleDeleteProject(project.id, e)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProjectDetails;