import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
// import CSS from './index.css';
import StarRating from './components/StarRating';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App  */}
    <StarRating maxRating={10} />
  </React.StrictMode>
);
