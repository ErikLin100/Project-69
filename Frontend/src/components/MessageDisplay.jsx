import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const MessageDisplay = ({ messages, textColor = "text-gray-800", accentColor = "text-gray-500" }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  console.log('Received messages in MessageDisplay:', messages);

  if (!messages || messages.length === 0) {
    return <p className="text-white text-sm">No messages available for this theme.</p>;
  }

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const renderStars = (rating) => {
    if (typeof rating !== 'number') return null;
    
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-400 opacity-50" />);
      } else {
        stars.push(<FaStar key={i} className="text-gray-300" />);
      }
    }

    return stars;
  };

  const getMessageText = (messageObj) => {
    if (typeof messageObj === 'string') return messageObj;
    if (typeof messageObj.text === 'string') return messageObj.text;
    if (typeof messageObj === 'object' && messageObj !== null) {
      return messageObj.text || JSON.stringify(messageObj);
    }
    return 'Invalid message format';
  };
  
  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {messages.map((messageObj, index) => {
          const messageText = getMessageText(messageObj);
          return (
            <div key={index} className={`bg-white bg-opacity-90 rounded-lg p-3 shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-full`}>
              <p className={`${textColor} text-sm leading-relaxed break-words overflow-wrap-anywhere`}>
                {expandedIndex === index || messageText.length <= 50
                  ? messageText
                  : `${messageText.substring(0, 50)}...`}
              </p>
              {messageText.length > 50 && (
                <button
                  onClick={() => toggleExpand(index)}
                  className={`text-xs ${accentColor} mt-2 hover:underline`}
                >
                  {expandedIndex === index ? 'Show less' : 'Show more'}
                </button>
              )}
              <div className="mt-2 flex justify-between items-center">
                <span className={`text-xs ${accentColor}`}>Feedback #{index + 1}</span>
                <span className={`text-xs ${accentColor} flex`}>
                  {renderStars(typeof messageObj === 'object' ? messageObj.rating : undefined)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MessageDisplay;