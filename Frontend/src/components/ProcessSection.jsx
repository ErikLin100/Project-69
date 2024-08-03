import React from 'react';
import { FaMagic, FaChartLine, FaLightbulb, FaRocket } from 'react-icons/fa';

const steps = [
  { 
    title: 'Collect', 
    description: 'Gather feedback effortlessly through customizable forms and integrations', 
    icon: FaMagic 
  },
  { 
    title: 'Analyze', 
    description: 'AI-powered sentiment analysis and trend detection', 
    icon: FaChartLine 
  },
  { 
    title: 'Insights', 
    description: 'Receive actionable insights and recommendations', 
    icon: FaLightbulb 
  },
  { 
    title: 'Grow', 
    description: 'Implement changes and watch your business soar', 
    icon: FaRocket 
  }
];

function ProcessSection() {
  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4">
        <h2 className="text-purple-600 font-semibold font-opensans text-4xl text-center mb-12  leading-relaxed">
          The FeedbackWizard Magic
        </h2>
        <div className="flex flex-wrap justify-center">
          {steps.map((step, index) => (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/4 p-4">
              <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col items-center">
                <step.icon className="text-5xl text-purple-600 mb-4" />
                <h3 className="text-xl font-opensans font-bold mb-3 text-purple-600">{step.title}</h3>
                <p className="font-semibold font-opensans text-gray-700 text-center">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProcessSection;