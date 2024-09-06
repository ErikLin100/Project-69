import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectList from '../components/ProjectList';
import CreatePortalModal from '../components/CreatePortalModal';
import withSubscriptionCheck from '../components/withSubscriptionCheck';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

function ActionPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const user = auth.currentUser;
        console.log('Fetching projects for user:', user ? user.uid : 'No user');

        const projectsRef = collection(db, 'projects');
        const q = query(projectsRef, where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        console.log('Projects query snapshot size:', querySnapshot.size);

        const fetchedProjects = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log('Fetched projects:', fetchedProjects);
        setProjects(fetchedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectCreated = (projectId) => {
    console.log("Navigating to project:", projectId);
    navigate(`/project/${projectId}`);
  };

  return (
    <div className="min-h-screen py-8 px-8 sm:px-16 md:px-24 lg:px-32">
      <h1 className="text-3xl font-bold mb-8 text-purple-700">Dashboard</h1>
      <button
        className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-300 mb-8"
        onClick={() => setIsModalOpen(true)}
      >
        Create New Project
      </button>
      <ProjectList projects={projects} />
      <CreatePortalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProjectCreated={handleProjectCreated}
      />
    </div>
  );
}

export default withSubscriptionCheck(ActionPage);