import React, { useState } from 'react';
import MessageDisplay from './MessageDisplay';

function DissatisfactionBox({ theme, totalFeedback }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-lg p-4 border-2 border-red-300 hover:border-red-500 transition-colors duration-300 bg-red-500">
      <div className="flex justify-between items-center">
        <span className="font-medium text-white">{theme.name}</span>
        <div className="flex items-center">
          <span className="text-sm text-white mr-2">{theme.count} mentions</span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-white hover:text-red-200"
          >
            {isExpanded ? '▲' : '▼'}
          </button>
        </div>
      </div>
      {isExpanded && <MessageDisplay 
        messages={theme.messages} 
        textColor="text-gray-800" 
        accentColor="text-gray-500" 
      />}
    </div>
  );
}

export default DissatisfactionBox;




