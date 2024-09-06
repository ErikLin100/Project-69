import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import MessageDisplay from './MessageDisplay';

function CompMentions({ mentions }) {
  const [expandedMentions, setExpandedMentions] = useState({});

  const toggleMention = (index) => {
    setExpandedMentions(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="rounded-lg p-4 border-2 border-blue-500 transition-colors duration-300 bg-blue-100">
      <h4 className="text-lg font-semibold text-blue-800 mb-4">Competitor Mentions</h4>
      <ul className="space-y-4">
        {mentions.map((mention, index) => (
          <li key={index} className="border-b border-blue-300 pb-2">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleMention(index)}
            >
              <span className="text-blue-700">{mention.competitor}</span>
              <div className="flex items-center">
                <span className="font-semibold mr-2 text-blue-700">{mention.count} mentions</span>
                {expandedMentions[index] ? <FaChevronUp className="text-blue-700" /> : <FaChevronDown className="text-blue-700" />}
              </div>
            </div>
            {expandedMentions[index] && (
              <MessageDisplay messages={mention.messages} textColor="text-gray-800" accentColor="text-gray-500" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompMentions;