import * as React from 'react';
import { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import ServerSideError from './ServerSideError';
import { useNavigate } from "react-router-dom";
import LogIn from './LogIn'

const NewQuestion = (props) => {
  const isLogedIn = props.isLogedIn
  const questionsTags = [
    { label: 'Ruby', value: 'Ruby' },
    { label: 'Rails', value: 'Rails' },
    { label: 'React', value: 'React' },
    { label: 'Bootstrap', value: 'Bootstrap' },
    { label: 'Javascript', value: 'Javascript' },
    { label: 'Data Structure', value: 'Data Structure' }
  ]

  const [isServerSideError, setIsServerSideError] = useState(false)
  const [serverErrors, setServerErrors] = useState([])
  const navigate = useNavigate()

  const [formField, setFormField] = useState({
    title: '',
    tag: questionsTags[0].value
  })

  const handleQuestionSubmit = () => {
    event.preventDefault();
    createQuestion()
  }

  const handleFormFields = () => {
    let field = event.target
    setFormField({ ...formField, [field.name]: field.value})
  }

  const createQuestion = () => {
    fetch(`/api/v1/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formField)
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data)
      if(data['status'] === "failure") {
        setIsServerSideError(true)
        setServerErrors(data['data'])
      } else {
        setIsServerSideError(false)
        setServerErrors([])
      }
    })
    .catch((error) => {
      console.log('Error:', error)
    })
  }

  return(
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Write your question and help the world to grow</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          {isLogedIn ? (
            <form onSubmit={handleQuestionSubmit}>
              <div className="modal-body">
                {isServerSideError && <ServerSideError errors={serverErrors} />}
                <div className="form-group">
                  <label className="form-label mt-3 mb-3">Title</label>
                  <input type="text" className="form-control form-control-lg rounded-0" value={formField.title} onChange={event => handleFormFields(event)} name="title" />
                </div>
                <div className="form-group">
                  <label className="form-label mt-3 mb-3">Select the question tag</label>
                  <select className="form-select form-select-lg rounded-0" value={formField.tag} onChange={event => handleFormFields(event)} name="tag">
                    {questionsTags.map(tag => (
                      <option key={tag.value} value={tag.value}>{tag.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Submit Question</button>
              </div>
            </form>
          ) : (
            <div className="modal-body">
              <h5 className="text-danger">Only logged-in users can contribute. Please log in first.</h5>
              <div className="modal-footer text-left text-muted">
                <p className="fw-bold" data-bs-dismiss="modal" onClick={() => navigate(`/LogIn`)}>{'>>'} Login here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NewQuestion;
