import React from 'react';

function FeedbackAnalysis({ analysisData }) {
  const {
    totalFeedback,
    sentimentBreakdown,
    keyThemes,
    negativeThemes,
    feedbackDetails
  } = analysisData;

  return (
    <div className="feedback-analysis">
      <h2>Feedback Analysis</h2>
      
      <div className="total-feedback">
        <h3>Total Feedback Received: {totalFeedback}</h3>
      </div>
      
      <div className="sentiment-breakdown">
        <h3>Sentiment Breakdown</h3>
        <p>Positive: {sentimentBreakdown.positive}%</p>
        <p>Negative: {sentimentBreakdown.negative}%</p>
        <p>Neutral: {sentimentBreakdown.neutral}%</p>
      </div>
      
      <div className="key-themes">
        <h3>Key Themes</h3>
        {keyThemes.map((theme, index) => (
          <div key={index}>
            <p>{theme.name}</p>
            <button onClick={() => showRelatedFeedback(theme.feedbackIds)}>
              View Related Feedback
            </button>
          </div>
        ))}
      </div>
      
      <div className="negative-themes">
        <h3>Main Points of Dissatisfaction</h3>
        {negativeThemes.map((theme, index) => (
          <div key={index}>
            <p>{theme.name}</p>
            <button onClick={() => showRelatedFeedback(theme.feedbackIds)}>
              View Related Feedback
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeedbackAnalysis;