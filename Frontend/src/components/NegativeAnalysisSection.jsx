import React from 'react';
import bigneg1 from '../assets/images/bigneg1.png';

const NegativeAnalysisSection = () => {
  return (
    <section className="py-20 ">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row-reverse items-center">
        <div className="lg:w-1/2 lg:pl-12 mb-10 lg:mb-0">
          <h1 className="text-4xl lg:text-5xl font-bold font-roboto text-[#313030] mb-6">
            Identify Points of Dissatisfaction
          </h1>
          <p className="text-xl font-normal font-opensans text-[#313030]">
            Our advanced analysis pinpoints areas of customer dissatisfaction, enabling you to address issues proactively and improve overall satisfaction.
          </p>
        </div>
        <div className="lg:w-1/2">
          <img src={bigneg1} alt="Negative Analysis" className="rounded-lg shadow-xl" />
        </div>
      </div>
    </section>
  );
};

export default NegativeAnalysisSection;