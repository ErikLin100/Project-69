import React from 'react';
import '../App.css';
import { HiMail, HiClipboardList, HiLightningBolt, HiChartBar, HiArrowCircleRight } from 'react-icons/hi';

const steps = [
  { icon: HiMail, title: 'Digital Mailbox', description: 'Create your unique feedback link' },
  { icon: HiClipboardList, title: 'Collect Feedback', description: 'Customers submit their thoughts' },
  { icon: HiLightningBolt, title: 'AI Analysis', description: 'Our AI processes the feedback' },
  { icon: HiChartBar, title: 'Generate Insights', description: 'Actionable reports are created' },
  { icon: HiArrowCircleRight, title: 'Deliver Reports', description: 'Receive weekly/monthly updates' }
];

function FeedbackFlowSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-opensans text-center mb-12 text-indigo-800">The Feedback Flow</h2>
        <div className="relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-indigo-200 transform -translate-y-1/2"></div>
          <div className="relative flex justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="bg-white rounded-full p-4 shadow-lg z-10">
                  <step.icon className="text-3xl text-indigo-800" />
                </div>
                <h3 className="mt-4 text-lg font-opensans font-bold text-indigo-800">{step.title}</h3>
                <p className="mt-2 text-sm font-opensans text-indigo-900 text-center max-w-xs">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeedbackFlowSection;