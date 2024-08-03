import React from 'react';
import { HiLightningBolt, HiChartBar, HiChatAlt2, HiTrendingUp, HiMail } from 'react-icons/hi';

const features = [
  { icon: HiLightningBolt, title: 'AI-Powered Analysis', description: 'Instantly analyze feedback with advanced machine learning algorithms' },
  { icon: HiChartBar, title: 'Sentiment Tracking', description: 'Monitor customer sentiment trends over time' },
  { icon: HiChatAlt2, title: 'Multi-Channel Integration', description: 'Collect feedback from various platforms in one place' },
  { icon: HiTrendingUp, title: 'Actionable Insights', description: 'Get data-driven recommendations to improve your business' },
  { icon: HiMail, title: 'Automated Reporting', description: 'Receive regular summary reports straight to your inbox' }
];

function FeatureSection() {
  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-opensans text-center mb-12 bg-main-gradient from-main-start to-main-end text-transparent bg-clip-text">
          Magical Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-105 transition-transform">
              <feature.icon className="w-12 h-12 mb-4 text-purple-600" />
              <h3 className="text-xl font-semibold mb-2 text-purple-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;