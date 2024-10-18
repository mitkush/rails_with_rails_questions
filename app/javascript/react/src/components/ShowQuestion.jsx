import * as React from "react";
import { useEffect, useState } from "react";

const ShowQuestion = ({ questionId }) => {
  const [questionDetails, setQuestionDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (questionId) {
      fetch(`/api/v1/questions/${questionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setQuestionDetails(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setError(error);
          setIsLoading(false);
        });
    }
  }, [questionId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!questionDetails) {
    return <div>No question details available.</div>;
  }

  return (
    <div>
      <h3>{questionDetails.title}</h3>
      <p>{questionDetails.tag}</p>
      <p>{questionDetails.content}</p>
    </div>
  );
};

export default ShowQuestion;
