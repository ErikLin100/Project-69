import React, { useState } from 'react';

const MessageDisplay = ({ messages }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {messages.map((message, index) => (
          <div key={index} className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-3 shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-full">
            <p className="text-white text-sm leading-relaxed break-words overflow-wrap-anywhere">
              {expandedIndex === index || message.length <= 50
                ? message
                : `${message.slice(0, 50)}...`}
            </p>
            {message.length > 50 && (
              <button
                onClick={() => toggleExpand(index)}
                className="text-xs text-gray-300 mt-2 hover:text-white"
              >
                {expandedIndex === index ? 'Show less' : 'Show more'}
              </button>
            )}
            <div className="mt-2 flex justify-between items-center">
              <span className="text-xs text-gray-300">Feedback #{index + 1}</span>
              <span className="text-xs text-gray-300">⭐⭐⭐⭐⭐</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageDisplay;