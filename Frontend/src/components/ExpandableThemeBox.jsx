import React, { useState } from 'react';
import MessageDisplay from './MessageDisplay';

function ExpandableThemeBox({ theme, totalFeedback }) {
  const [isExpanded, setIsExpanded] = useState(false);

  console.log('Theme data:', theme); // Debugging line

  return (
    <div className="rounded-lg p-4 hover:shadow-md transition-shadow overflow-hidden relative">
      <div className="bg-main-gradient from-main-start to-main-end absolute inset-0 animated-gradient"></div>
      <div className="relative z-10">
        <div className="flex justify-between items-center">
          <span className="font-medium text-white">{theme.name}</span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-white hover:text-gray-200"
          >
            {isExpanded ? '▲' : '▼'}
          </button>
        </div>
        <div className="mt-2 bg-white bg-opacity-30 rounded-full h-2">
          <div
            className="bg-[#1bb41b] h-2 rounded-full"
            style={{width: `${(theme.count / totalFeedback) * 100}%`}}
          ></div>
        </div>
        {isExpanded && <MessageDisplay messages={theme.messages} />}
      </div>
    </div>
  );
}

export default ExpandableThemeBox;