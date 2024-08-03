import React, { useState } from 'react';

const CustomQuestionAdder = () => {
  const [customQuestion, setCustomQuestion] = useState('');

  const handleAddQuestion = () => {
    // Logic to add the custom question
    console.log('Adding custom question:', customQuestion);
    setCustomQuestion('');
  };

  return (
    <div>
      <h3>Add Custom Question</h3>
      <input 
        type="text" 
        value={customQuestion} 
        onChange={(e) => setCustomQuestion(e.target.value)} 
        placeholder="Enter custom question" 
      />
      <button onClick={handleAddQuestion}>Add Question</button>
    </div>
  );
};

export default CustomQuestionAdder;