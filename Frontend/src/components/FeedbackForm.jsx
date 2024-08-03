import React, { useState } from 'react';

const FeedbackForm = ({ projectName, customQuestions = [], onSubmit, isPreview = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    satisfactionLevel: '',
    message: '',
    customResponses: {}
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isPreview) {
      onSubmit(formData);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">{projectName} Feedback</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
          required
          className="w-full p-2 border rounded"
        />
        <select
          name="satisfactionLevel"
          value={formData.satisfactionLevel}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Satisfaction Level</option>
          {[1, 2, 3, 4, 5].map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
          required
          className="w-full p-2 border rounded"
        ></textarea>
        
        {customQuestions.map((question, index) => (
          <input 
            key={index}
            type="text"
            name={`customResponses.${question}`}
            onChange={handleChange}
            placeholder={question}
            className="w-full p-2 border rounded"
          />
        ))}
        
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {isPreview ? 'Preview Submit' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;