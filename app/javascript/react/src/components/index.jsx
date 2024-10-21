import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuestionDetail from './QuestionDetail'; // Ensure this path is correct

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/questions/:id" element={<QuestionDetail />} />
    </Routes>
  </Router>
);
