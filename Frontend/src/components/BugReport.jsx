import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import MessageDisplay from './MessageDisplay';

function BugReport({ bugs }) {
  const [expandedBugs, setExpandedBugs] = useState({});

  const toggleBug = (index) => {
    setExpandedBugs(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="rounded-lg p-4 border-2 border-red-500 transition-colors duration-300 bg-red-100">
      <h4 className="text-lg font-semibold text-red-800 mb-4">Potential Bug Reports</h4>
      <ul className="space-y-4">
        {bugs.map((bug, index) => (
          <li key={index} className="border-b border-red-300 pb-2">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleBug(index)}
            >
              <span className="text-red-700">{bug.description}</span>
              <div className="flex items-center">
                <span className="font-semibold mr-2 text-red-700">{bug.count} reports</span>
                {expandedBugs[index] ? <FaChevronUp className="text-red-700" /> : <FaChevronDown className="text-red-700" />}
              </div>
            </div>
            {expandedBugs[index] && (
              <MessageDisplay messages={bug.messages} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BugReport;