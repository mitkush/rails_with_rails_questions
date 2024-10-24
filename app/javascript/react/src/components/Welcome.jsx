import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuestionList from './QuestionList';
import ShowQuestion from './ShowQuestion';
import SignUp from './SignUp';
import LogIn from './LogIn'

const Welcome = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuestionList />} />
        <Route path="/questions" element={<QuestionList />} />
        <Route path="/questions/:id" element={<ShowQuestion />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/LogIn" element={<LogIn />} />
      </Routes>
    </Router>
  );
};

export default Welcome;
