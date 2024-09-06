import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import ExpandableThemeBox from './ExpandableThemeBox';
import DissatisfactionBox from './DissatisfactionBox';
import CompMentions from './CompMentions';
import BugReport from './BugReport';

function AnimatedSentimentMeter({ sentimentBreakdown, totalFeedback }) {
  const [animatedValues, setAnimatedValues] = useState({ positive: 0, negative: 0, neutral: 0 });

  useEffect(() => {
    const animationDuration = 1000;
    const steps = 60;
    const stepDuration = animationDuration / steps;

    const timer = setInterval(() => {
      setAnimatedValues(prev => ({
        positive: Math.min(prev.positive + sentimentBreakdown.positive / steps, sentimentBreakdown.positive),
        negative: Math.min(prev.negative + sentimentBreakdown.negative / steps, sentimentBreakdown.negative),
        neutral: Math.min(prev.neutral + sentimentBreakdown.neutral / steps, sentimentBreakdown.neutral),
      }));
    }, stepDuration);

    return () => clearInterval(timer);
  }, [sentimentBreakdown]);

  const getWidth = (value) => `${(value / totalFeedback) * 100}%`;

  return (
    <div className="mt-2">
      <div className="flex flex-col space-y-4">
        {['positive', 'neutral', 'negative'].map((sentiment) => (
          <div key={sentiment} className="flex items-center">
            <div className="w-12 text-center">
              {sentiment === 'positive' && <span className="text-3xl">😃</span>}
              {sentiment === 'neutral' && <span className="text-3xl">😐</span>}
              {sentiment === 'negative' && <span className="text-3xl">😞</span>}
            </div>
            <div className="flex-grow h-3 bg-gray-200 rounded-full overflow-hidden ml-2">
              <div
                className={`h-full transition-all duration-1000 ease-out ${
                  sentiment === 'positive' ? 'bg-[#1bb41b]' :
                  sentiment === 'neutral' ? 'bg-[#ffe700]' : 'bg-[#c70039]'
                }`}
                style={{ width: getWidth(animatedValues[sentiment]) }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeedbackAnalysis({ analysisData, projectId, onDelete }) {
  if (!analysisData || !analysisData.results) {
    return (
      <div className="feedback-analysis p-2 sm:p-4 md:p-6 rounded-lg shadow-lg w-full max-w-screen-xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-indigo-800">No Analysis Available</h2>
        <p className="mt-4 text-gray-600">There is currently no feedback analysis to display. Please submit some feedback to generate an analysis.</p>
      </div>
    );
  }

  const { totalFeedback, sentimentBreakdown, keyThemes, negativeThemes, competitorMentions, bugReports } = analysisData.results;

  return (
    <div className="feedback-analysis p-2 sm:p-4 md:p-6 rounded-lg shadow-lg bg-white w-full max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-indigo-800">Feedback Analysis</h2>
        <div className="flex items-center">
          <h3 className="text-xl font-semibold text-indigo-700 mr-2">Total Feedback:</h3>
          <span className="text-xl font-semibold font-opensans">{totalFeedback}</span>
          <button onClick={onDelete} className="ml-4 text-red-600 hover:text-red-800">
            <FaTrash />
          </button>
        </div>
      </div>
     
      {sentimentBreakdown && <AnimatedSentimentMeter sentimentBreakdown={sentimentBreakdown} totalFeedback={totalFeedback} />}

      {keyThemes && keyThemes.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-indigo-700">Key Themes</h3>
          <div className="space-y-4">
            {keyThemes.map((theme, index) => (
              <ExpandableThemeBox key={index} theme={theme} totalFeedback={totalFeedback} />
            ))}
          </div>
        </div>
      )}

      {negativeThemes && negativeThemes.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4 text-red-700">Main Points of Dissatisfaction</h3>
          <div className="space-y-4">
            {negativeThemes.map((theme, index) => (
              <DissatisfactionBox key={index} theme={theme} totalFeedback={totalFeedback} />
            ))}
          </div>
        </div>
      )}
      
      {competitorMentions && competitorMentions.length > 0 && (
        <div className='mt-6'>
          <CompMentions mentions={competitorMentions} />
        </div>
      )}
      
      {bugReports && bugReports.length > 0 && (
        <div className='mt-6'>
          <BugReport bugs={bugReports} />
        </div>
      )}
    </div>
  );
}

export default FeedbackAnalysis;