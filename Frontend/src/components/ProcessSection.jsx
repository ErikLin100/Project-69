import React from 'react';
import '../App.css';
import { FaMagic, FaChartLine, FaLightbulb, FaRocket } from 'react-icons/fa';

const steps = [
  {
    title: 'Collect',
    description: 'Create a custom feedback link in seconds. Share it with your customers to gather valuable insights effortlessly.',
    icon: FaMagic
  },
  {
    title: 'Analyze',
    description: 'Our AI-powered engine processes feedback in real-time, identifying sentiment trends and key themes automatically.',
    icon: FaChartLine
  },
  {
    title: 'Insights',
    description: 'Receive clear, actionable insights distilled from customer feedback. Understand what your customers truly want.',
    icon: FaLightbulb
  },
  {
    title: 'Grow',
    description: 'Use data-driven decisions to improve your product or service. Watch customer satisfaction and your business grow.',
    icon: FaRocket
  }
];

function ProcessSection() {
  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center">
          {steps.map((step, index) => (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/4 p-4">
              <div className="bg-[#F8F8FF] rounded-lg shadow-lg p-6 h-full flex flex-col items-center transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                <step.icon className="text-5xl  text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold font-roboto mb-3 text-[#313030]">{step.title}</h3>
                <p className="font-semibold font-opensans text-[#313030] text-center">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProcessSection;