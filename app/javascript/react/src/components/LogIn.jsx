import React, { useState } from 'react';
import ServerSideError from './ServerSideError';
import { useNavigate } from "react-router-dom";
import SignUp from './SignUp'


const LogIn = () => {
  const [isServerSideError, setIsServerSideError] = useState(false)
  const [serverErrors, setServerErrors] = useState({})
  const [formField, setFormField] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleInputChange = () => {
    const { name, value, type, checked } = event.target;
    setFormField({...formField, [name]: value });
  };

  const handleLogInSubmit = () => {
    event.preventDefault();
    createLogIn(formField);
  };

  const handlePasswordMatching = (event) => {
    const { name, value } = event.target;

    if (formField.password !== value) {
        setPasswordMatchingError("Passwords do not match");
        setIsPasswordMatched(false)
    } else {
        setPasswordMatchingError("");
        setIsPasswordMatched(true)
    }
  };

  const createLogIn = (data) => {
    fetch(`/api/v1/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({account: data}),
    })
    .then((response) => {
      const status = response.status
      return response.json().then((data) => ({ status, data }))
    })
    .then(({ status, data }) => {
      console.log(status, data)
      if (status != 200) {
        setIsServerSideError(true);
        setServerErrors(data.errors);
      } else {
        setIsServerSideError(false);
        setServerErrors({});
        // navigate(`/questions`)
      }
    })
    .catch((error) => {
    })
  };

  return (
    <>
      <div className="row">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="card">
            <div className="card-body p-5">
              <h2 className="text-uppercase text-center mb-5">Welcome</h2>
              <form onSubmit={handleLogInSubmit}>
                <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formField.email}
                    onChange={handleInputChange}
                    className="form-control form-control-lg"
                  />
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formField.password}
                    onChange={handleInputChange}
                    className="form-control form-control-lg"
                  />
                  <p className="text-danger">{serverErrors.login}</p>
                </div>

                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">
                    Log In
                  </button>
                </div>

                <p className="text-center text-muted mt-5 mb-0">
                  Not have an account? <u className="fw-bold text-body" onClick={() => navigate(`/SignUp`)}>Signup here</u>
                </p>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <img src={`${window.location.origin}/assets/login_image.png `} alt="Description" className="img-fluid" />
        </div>
      </div>
    </>
  );
};

export default LogIn;