import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, 'projects'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const projectList = [];
      querySnapshot.forEach((doc) => {
        projectList.push({ id: doc.id, ...doc.data() });
      });
      setProjects(projectList);
    });

    return () => unsubscribe();
  }, []);

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <div className="project-list">
      <h2 className="text-xl font-bold mb-4 text-purple-700">Your Projects</h2>
      <ul className="space-y-2">
        {projects.map((project) => (
          <li 
            key={project.id} 
            className="bg-purple-50 p-4 rounded-md shadow-sm border border-purple-100 hover:bg-purple-100 transition duration-300 cursor-pointer"
            onClick={() => handleProjectClick(project.id)}
          >
            <span className="text-purple-800">{project.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectList;