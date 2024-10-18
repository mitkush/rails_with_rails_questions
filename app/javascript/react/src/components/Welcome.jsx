import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuestionList from './QuestionList';
import ShowQuestion from './ShowQuestion'; // Import your detail component

const Welcome = () => {
  return (
    <Router>
      <Routes>
        <Route path="/questions" element={<QuestionList />} />
        <Route path="/questions/:id" element={<ShowQuestion />} />
      </Routes>
    </Router>
  );
};

export default Welcome;
