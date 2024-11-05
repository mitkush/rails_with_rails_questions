import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuestionDetail from "./QuestionDetail"
import SideBar from "./SideBar"
import NavBar from "./NavBar"

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
    <div>
      <div>
        <div className="container-fluid">
          <div className="row flex-nowrap">
            <div className="col-auto col-md-3 col-xl-2 bg-dark position-sticky">
              <SideBar />
            </div>

            <div className="col-md-9 col-xl-10" style={{ padding: '0', overflow: 'hidden' }}>
              <div>
                <NavBar />
              </div>
              <div className="col-lg-10 mx-auto">
              <QuestionDetail question={questionDetails} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowQuestion;
