import React, { useState } from 'react';
import NegativeMessageDisplay from './NegativeMessageDisplay';

function DissatisfactionBox({ theme, totalFeedback }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-lg p-4 border-2 border-red-300 hover:border-red-500 transition-colors duration-300 bg-red-50">
      <div className="flex justify-between items-center">
        <span className="font-medium text-red-700">{theme.name}</span>
        <div className="flex items-center">
          <span className="text-sm text-red-600 mr-2">{theme.count} mentions</span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-red-500 hover:text-red-700"
          >
            {isExpanded ? '▲' : '▼'}
          </button>
        </div>
      </div>
      {isExpanded && <NegativeMessageDisplay messages={theme.messages} />}
    </div>
  );
}

export default DissatisfactionBox;




