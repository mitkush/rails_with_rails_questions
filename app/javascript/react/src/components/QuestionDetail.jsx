import * as React from "react";
import { useState } from "react";
import * as ReactDom from "react-dom";

const QuestionDetail = (props) => {
  const [likeCount, setLikeCount] = React.useState(props.question.likes_count || 0);
  const [dislikeCount, setDislikeCount] = React.useState(props.question.dislikes_count || 0);


  const updateLikeCounter = () => {
    setLikeCount((prevCount) => prevCount + 1);
    updateQuestionCounter({ count_for: 'like' });
   };

   const updateDislikeCounter = () => {
    setDislikeCount((prevCount) => prevCount + 1); // Corrected to update dislikeCount
    updateQuestionCounter({ count_for: 'dislike' });
   };

  const updateQuestionCounter = (data) => {
    fetch(`/api/v1/questions/${props.question.id}/update_counter`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
      <div className="card rounded-0 mt-3">
        <div className="card-body">
          <h3 className="card-title">{props.question.title}</h3>
          <p className="lead">
            <span className="badge bg-primary">{props.question.tag}</span>
          </p>

          <div className='d-flex justify-content-between flex-wrap' style={{rowGap: "1rem"}}>
            <div>
              <button type="button" className="btn btn-primary position-relative" onClick={updateLikeCounter} style={{marginRight: 1 + 'em'}}>
                Like
                { likeCount > 0 ?
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">{likeCount}</span> : ''
                }
              </button>
              <button type="button" className="btn btn-warning position-relative" onClick={updateDislikeCounter}>
                Dislike
                { dislikeCount > 0 ?
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{dislikeCount}</span> : ''
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default QuestionDetail;
