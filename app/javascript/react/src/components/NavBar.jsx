import * as React from "react";
import * as ReactDom from "react-dom";
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [isLogedIn, setIsLogedIn] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    updateLogInStatus()
  }, [])

  const updateLogInStatus = () => {
    const isLogedIn = localStorage.getItem('isLogedIn');
    const token = localStorage.getItem('token');

    console.log(isLogedIn)
    if (isLogedIn) {
      setIsLogedIn(true);
    }
  }

  const logOut = () => {
    setIsLogedIn(false);
    localStorage.clear();
    navigate('/questions');
    window.location.reload();
  };

  return(
    <>
      <nav className="navbar navbar-light bg-primary">
        <div className="container-fluid bg-primary d-flex justify-content-end">
          <button type="button" className="btn btn-info mt-3 mb-3" style={{ marginLeft: '1em' }} onClick={() => navigate(`/SignUp`)} hidden={isLogedIn}>
            Sign Up
          </button>
          <button type="button" className="btn btn-success mt-3 mb-3" style={{ marginLeft: '1em' }} onClick={() => navigate(`/LogIn`)} hidden={isLogedIn}>
            Log In
          </button>
          <button type="button" className="btn btn-success mt-3 mb-3" onClick={logOut} hidden={!isLogedIn}>
            Log Out
          </button>
        </div>
      </nav>
    </>
  )
}

export default NavBar;
