import React, { useEffect, useState } from 'react';
import { FaSmile, FaMeh, FaFrown } from 'react-icons/fa';
import ExpandableThemeBox from './ExpandableThemeBox';
import DissatisfactionBox from './DissatisfactionBox';

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
            <span className="ml-2 text-xl font-semibold font-opensans w-16 text-right">
              {Math.round(animatedValues[sentiment])}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeedbackAnalysis({ analysisData }) {
  const { totalFeedback, sentimentBreakdown, keyThemes } = analysisData;

  const themesWithMessages = [...keyThemes,
    {
      name: "Customer Service",
      count: 25,
      messages: [
        "The support team was incredibly helpful and resolved my issue promptly. I'm very satisfied with the service.",
        "Quick response to my inquiries, but the solution provided didn't fully address my problem.",
        "Could improve the waiting time for support. I had to wait for 30 minutes before getting a response.",
        "Excellent customer service experience. The representative went above and beyond to ensure my satisfaction."
      ]
    },
    {
      name: "User Interface",
      count: 20,
      messages: [
        "The new UI is intuitive and easy to navigate. I especially love the streamlined menu structure.",
        "Love the clean design of the dashboard. It makes monitoring my projects a breeze.",
        "Some buttons are hard to find. It took me a while to locate the export feature.",
        "The color scheme is pleasing to the eye and helps reduce eye strain during long work sessions."
      ]
    }
  ].map(theme => ({
    ...theme,
    messages: theme.messages || [
      "This feature is amazing and has significantly improved my workflow!",
      "I love how easy it is to use. The learning curve is minimal.",
      "Could use some improvements in the UI, particularly in the settings menu.",
      "Great job on the latest update! The new features are exactly what I needed."
    ]
  }));

  const negativeThemesWithMessages = [
    {
      name: "Long Wait Times",
      count: 15,
      messages: [
        "I had to wait 30 minutes for customer support. This is unacceptable.",
        "The queue for technical assistance was too long. Please improve your response time.",
        "Waiting for over an hour for a simple query resolution is frustrating."
      ]
    },
    {
      name: "Confusing Interface",
      count: 12,
      messages: [
        "The new UI is not intuitive at all. I can't find basic features anymore.",
        "Too many clicks required to perform simple tasks. The interface needs simplification.",
        "The layout is cluttered and overwhelming. Please consider a cleaner design."
      ]
    },
    {
      name: "Billing Issues",
      count: 8,
      messages: [
        "I was charged incorrectly for my subscription. This needs to be addressed immediately.",
        "The pricing structure is not transparent. Hidden fees are disappointing.",
        "Automatic renewal without clear notification is not customer-friendly."
      ]
    }
  ];

  return (
    <div className="feedback-analysis p-2 sm:p-4 md:p-6 rounded-lg shadow-lg w-full max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-indigo-800">Feedback Analysis</h2>
        <div className="flex items-center">
          <h3 className="text-xl font-semibold text-indigo-700 mr-2">Total Feedback:</h3>
          <span className="text-xl font-semibold font-opensans">{totalFeedback}</span>
        </div>
      </div>
     
      <AnimatedSentimentMeter sentimentBreakdown={sentimentBreakdown} totalFeedback={totalFeedback} />

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-indigo-700">Key Themes</h3>
        <div className="space-y-4">
          {themesWithMessages.map((theme, index) => (
            <ExpandableThemeBox key={index} theme={theme} totalFeedback={totalFeedback} />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4 text-red-700">Main Points of Dissatisfaction</h3>
        <div className="space-y-4">
          {negativeThemesWithMessages.map((theme, index) => (
            <DissatisfactionBox key={index} theme={theme} totalFeedback={totalFeedback} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeedbackAnalysis;



