import React from 'react';

const LinkGenerator = () => {
  const generatedLink = 'https://feedbackwizard.ai/form/123456';

  const copyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    alert('Link copied to clipboard!');
  };

  return (
    <div>
      <h3>Your Unique Feedback Link</h3>
      <p>{generatedLink}</p>
      <button onClick={copyLink}>Copy Link</button>
    </div>
  );
};

export default LinkGenerator;