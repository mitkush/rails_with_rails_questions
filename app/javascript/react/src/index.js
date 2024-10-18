import React from 'react';
import ReactDom from 'react-dom/client';
import Welcome from './components/Welcome';

const root = ReactDom.createRoot(document.getElementById('welcome'));
root.render(<Welcome />);
