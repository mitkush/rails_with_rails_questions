import * as React from "react";
import { StrictMode } from 'react';
import * as ReactDom from "react-dom/client";
import QuestionList from './QuestionList';

const Welcome = () => {
	return(
		<QuestionList />
		)
}

const root = ReactDom.createRoot(document.getElementById('welcome'))
root.render(
  <StrictMode>
	 <Welcome />
  </StrictMode>
	)

export default Welcome;
