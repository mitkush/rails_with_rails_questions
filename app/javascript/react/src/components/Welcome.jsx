import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuestionList from './QuestionList';
import ShowQuestion from './ShowQuestion';
import SignUp from './SignUp';

const Welcome = () => {
  return (
    <Router>
      <Routes>
        <Route path="/questions" element={<QuestionList />} />
        <Route path="/questions/:id" element={<ShowQuestion />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default Welcome;
