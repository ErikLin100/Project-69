import React from 'react';
import bigtheme2 from '../assets/images/newbigtheme1.png';

const ThemeAnalysisSection = () => {
  return (
    <section className="py-20 ">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
          <h1 className="text-4xl lg:text-5xl font-bold font-roboto text-[#313030] mb-6">
            Uncover Key Themes in Customer Feedback
          </h1>
          <p className="text-xl font-normal font-opensans text-[#313030]">
            Our AI-powered analysis identifies and categorizes recurring themes in your feedback, providing valuable insights into customer sentiments and preferences.
          </p>
        </div>
        <div className="lg:w-1/2">
          <img src={bigtheme2} alt="Theme Analysis" className="rounded-lg shadow-xl" />
        </div>
      </div>
    </section>
  );
};

export default ThemeAnalysisSection;