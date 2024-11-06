import React from 'react';
import ReactDom from 'react-dom/client';
import Welcome from './components/Welcome';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const root = ReactDom.createRoot(document.getElementById('welcome'));
root.render(<Welcome />);
