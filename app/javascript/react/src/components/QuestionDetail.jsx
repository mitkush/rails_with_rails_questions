import * as React from "react";
import { useState } from "react";
import * as ReactDom from "react-dom";
import LikeDislikeButton from './LikeDislikeButton';
import { useNavigate } from "react-router-dom";

const QuestionDetail = (props) => {
  const navigate = useNavigate();

  return (
    <div className="card rounded-0 mt-3">
      <div className="card-body">
        <h3 className="card-title" onClick={() => navigate(`/questions/${props.question.id}`)}>{props.question.title}</h3>
        <p className="lead">
          <span className="badge bg-primary">{props.question.tag}</span>
        </p>

        <div className='d-flex justify-content-between flex-wrap' style={{rowGap: "1rem"}}>
          <LikeDislikeButton question={props.question} />
        </div>
      </div>
    </div>
    );
  };

export default QuestionDetail;
