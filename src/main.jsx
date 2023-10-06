import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import CSS from './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    {/* <StarRating
      maxRating={5}
      className="test"
      messages={['Terrible', 'Bad', 'Good', 'Great', 'Amazing']}
      defaultRating={3}
    /> */}
  </React.StrictMode>
);
