import React from "react";

const PricingCard = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 bg-gradient-to-r  min-h-screen">
      <div className="max-w-6xl grid md:grid-cols-3 gap-8">

        {/* Basic Plan */}
        <div className="bg-white shadow-lg rounded-lg p-8 border border-purple-300 relative transform hover:scale-105 transition-transform duration-300">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-300 to-transparent rounded-lg opacity-60"></div>
          <h3 className="text-2xl font-semibold text-purple-600 mb-4 relative">Basic Use</h3>
          <p className="text-5xl font-bold text-purple-800 mb-4 relative">$3.99<span className="text-lg text-gray-500">/month</span></p>
          <ul className="mb-6 relative">
            <li className="mb-2 text-gray-700">✔ Feature 1</li>
            <li className="mb-2 text-gray-700">✔ Feature 2</li>
            <li className="mb-2 text-gray-700">✔ Feature 3</li>
          </ul>
          <button className="relative w-full bg-purple-600 text-white py-3 rounded-lg shadow-lg hover:bg-purple-700 transition-all">Choose Plan</button>
        </div>

        {/* Full Access Plan */}
        <div className="bg-white shadow-lg rounded-lg p-8 border border-purple-300 relative transform hover:scale-105 transition-transform duration-300">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-300 to-transparent rounded-lg opacity-60"></div>
          <h3 className="text-2xl font-semibold text-purple-600 mb-4 relative">Full Access</h3>
          <p className="text-5xl font-bold text-purple-800 mb-4 relative">$7.99<span className="text-lg text-gray-500">/month</span></p>
          <ul className="mb-6 relative">
            <li className="mb-2 text-gray-700">✔ Feature 1</li>
            <li className="mb-2 text-gray-700">✔ Feature 2</li>
            <li className="mb-2 text-gray-700">✔ Feature 3</li>
            <li className="mb-2 text-gray-700">✔ Extra Feature 4</li>
          </ul>
          <button className="relative w-full bg-purple-600 text-white py-3 rounded-lg shadow-lg hover:bg-purple-700 transition-all">Choose Plan</button>
        </div>

        {/* Premium Plan */}
        <div className="bg-white shadow-lg rounded-lg p-8 border border-purple-300 relative transform hover:scale-105 transition-transform duration-300">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-300 to-transparent rounded-lg opacity-60"></div>
          <h3 className="text-2xl font-semibold text-purple-600 mb-4 relative">Premium</h3>
          <p className="text-5xl font-bold text-purple-800 mb-4 relative">$12.99<span className="text-lg text-gray-500">/month</span></p>
          <ul className="mb-6 relative">
            <li className="mb-2 text-gray-700">✔ Feature 1</li>
            <li className="mb-2 text-gray-700">✔ Feature 2</li>
            <li className="mb-2 text-gray-700">✔ Premium Support</li>
            <li className="mb-2 text-gray-700">✔ Advanced Analytics</li>
          </ul>
          <button className="relative w-full bg-purple-600 text-white py-3 rounded-lg shadow-lg hover:bg-purple-700 transition-all">Choose Plan</button>
        </div>

      </div>
    </div>
  );
};

export default PricingCard;