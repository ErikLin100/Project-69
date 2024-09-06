import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase'; // Make sure this path is correct
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook if you have it

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth(); // Use the useAuth hook to get the current user

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user) return; // Use user instead of auth.currentUser

      const q = query(
        collection(db, 'projects'),
        where('userId', '==', user.uid)
      );
      
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const projectList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProjects(projectList);
        console.log("Fetched projects:", projectList); // Add this line for debugging
      }, (error) => {
        console.error("Error fetching projects:", error);
      });

      return () => unsubscribe();
    };

    fetchProjects();
  }, [user]); // Add user as a dependency

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  const handleDeleteProject = async (projectId, event) => {
    event.stopPropagation();
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteDoc(doc(db, 'projects', projectId));
        setProjects(prevProjects => prevProjects.filter(project => project.id !== projectId));
        console.log('Project deleted successfully');
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

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

export default ProjectList;