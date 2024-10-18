import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ShowQuestion = () => {
  const { id } = useParams()
  const [questionDetails, setQuestionDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/v1/questions/${id}`, {
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
  }, [id]);

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
    <div className="card rounded-0 mt-3">
      <div className="card-body">
        <h3 className="card-title">{questionDetails.title}</h3>
        <p className="lead">
          <span className="badge bg-primary">{questionDetails.tag}</span>
        </p>
      </div>
    </div>
  );
};

export default ShowQuestion;
