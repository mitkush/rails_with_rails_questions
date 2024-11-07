import * as React from 'react'
import { useState, useEffect } from 'react'
import * as ReactDOM from 'react-dom'
import QuestionDetail from "./QuestionDetail"
import EmptyQuestionMessage from './EmptyQuestionMessage'
import Loader from './Loader'
import NewQuestion from './NewQuestion'
import SideBar from './SideBar';
import NavBar from './NavBar';
import { useNavigate } from "react-router-dom";

const QuestionList = () => {

  const questionsTags = [
    { label: 'All', value: 0 },
    { label: 'Ruby', value: 1 },
    { label: 'Rails', value: 2 },
    { label: 'React', value: 3 },
    { label: 'Bootstrap', value: 4 },
    { label: 'Javascript', value: 5 }
  ]

  const [questionsList, setQuestionsList] = useState([])
  const [selectedOption, setSelectedOption] = useState(questionsTags[0].value)
  const [isShowAlert, setIsShowAlert] = useState(false)
  const [isShowLoader, setIsShowLoader] = useState(true)
  const [isLogedIn, setIsLogedIn] = useState(false)
  const [storedAccount, setStoredAccount] = useState({})
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const questionsUrl = '/api/v1/questions'

  const fetchQuestionList = () => {
    setIsShowLoader(false)
    fetch(questionsUrl)
      .then((response) => response.json())
      .then((data) => {
        setQuestionsList(data)
        if(data.length == 0) {
          setIsShowAlert(true)
        } else {
          setIsShowAlert(false)
        }
      })
  }

  useEffect(() => {
    fetchQuestionList()
    updateLogInStatus()
  }, [])

  const updateSelectedItem = (event) => {
    setIsShowLoader(false)
    setIsShowAlert(false)
    setQuestionsList([])
    setSelectedOption(event.target.value)
    fetch(questionsUrl + `?tags=${questionsTags[event.target.value].label}`)
    .then((response) => response.json())
    .then((data) => {
      setQuestionsList(data)
      if(data.length == 0) {
        setIsShowAlert(true)
        setIsShowLoader(true)
      }
    })
  }

  const updateLogInStatus = () => {
    const isLogedIn = localStorage.getItem('isLogedIn');
    const account = localStorage.getItem('account');

    if (isLogedIn) {
      setIsLogedIn(true);
      setStoredAccount(JSON.parse(account))
    }
  }

  return(
    <div className="container-fluid" style={{ overflowX: 'hidden' }}>
      <div className="row flex-nowrap" style={{ minWidth: '0' }}>
        <div
          className={`col-auto bg-dark position-sticky ${isCollapsed ? "collapsed-sidebar" : ""}`}
          style={{
            top: "0",
            height: "100vh",
            transition: "width 0.3s ease-in-out",
            width: isCollapsed ? "60px" : "250px",
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          <SideBar toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />
        </div>

        <div className="col" style={{ padding: '0' }}>
          <div className="position-sticky" style={{ top: '0', zIndex: 1000 }}>
            <NavBar />
          </div>

          <div className="col-lg-10 mx-auto" style={{ paddingTop: "20px" }}>
            <p className="lead fw-bold">Filter Questions by Tags</p>
            <button
              type="button"
              className="btn btn-primary mt-3 mb-3"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Contribute your Question
            </button>
            <select
              className="form-select form-select-lg rounded-0"
              value={selectedOption}
              onChange={(event) => updateSelectedItem(event)}
            >
              {questionsTags.map((tag) => (
                <option key={tag.value} value={tag.value}>
                  {tag.label}
                </option>
              ))}
            </select>
            {questionsList.length > 0
              ? questionsList.map((question) => (
                  <div key={question.id}>
                    <QuestionDetail question={question} />
                  </div>
                ))
              : <Loader isShowLoader={isShowLoader} />}
            {isShowAlert && <EmptyQuestionMessage tagname={questionsTags[selectedOption].label} />}
          </div>
          <NewQuestion isLogedIn={isLogedIn} />
        </div>
      </div>
    </div>
  )
}

export default QuestionList;
