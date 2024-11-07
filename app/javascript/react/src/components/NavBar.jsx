import * as React from "react";
import * as ReactDom from "react-dom";
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const NavBar = ({ logOut }) => {
  const [isLogedIn, setIsLogedIn] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    updateLogInStatus()
  }, [])

  const updateLogInStatus = () => {
    const isLogedIn = localStorage.getItem('isLogedIn');
    if (isLogedIn) {
      setIsLogedIn(true);
    }
  }

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
